const { promises: fs } = require('fs');
const { relative, join } = require('path');
const { default: findWorkspacePackages } = require('@pnpm/find-workspace-packages');

class Readme {
  constructor(path) {
    this.path = path;
  }

  async getContent() {
    if (!this.content) {
      this.content = await fs.readFile(this.path, 'utf8');
    }
    return this.content;
  }

  sectionMarkers(name) {
    const markers = [`<!-- BEGIN ${name} -->`, `<!-- END ${name} -->`];

    return {
      markers,
      pattern: new RegExp(`(${markers[0]})([\\s\\S]*)(${markers[1]})`),
    };
  }

  async getSection(name) {
    const content = await this.getContent();
    const { pattern } = this.sectionMarkers(name);

    const match = content.match(pattern);
    return match && match[2].trim();
  }

  async replaceSection(name, replacement, { append = false } = {}) {
    const content = await this.getContent();
    const { markers, pattern } = this.sectionMarkers(name);

    const insert = `${markers[0]}
<!-- This section is generated, do not edit it! -->

${replacement}

${markers[1]}`;

    if (!pattern.test(content)) {
      if (!append) {
        throw new Error(`Template section '${name}' not found in file '${this.path}'`);
      }

      this.content = `${content}\n${insert}`;
    } else {
      this.content = content.replace(pattern, insert);
    }

    return content;
  }

  async save() {
    return fs.writeFile(this.path, await this.getContent());
  }

  // Convenience API

  static getSection(path, name) {
    return new Readme(path).getSection(name);
  }

  static async replaceSection(path, name, replacement, options) {
    const readme = new Readme(path);

    await readme.replaceSection(name, replacement, options);

    return readme.save();
  }
}

function overview(pkg) {
  if (!pkg.overview) return '';

  const updated = pkg.overview.replace('(./', `(./${pkg.dir}/`);

  return `

${updated}
`;
}

async function run() {
  const cwd = process.cwd();

  const packages = [];

  for (const { dir, manifest } of await findWorkspacePackages(cwd)) {
    if (dir !== cwd) {
      packages.push({
        ...manifest,
        dir: relative(cwd, dir),
        overview: await Readme.getSection(join(dir, 'README.md'), 'overview'),
      });
    }
  }

  const packageToc = `## Packages

${packages.map(p => `### [\`${p.name}\`](${p.dir}) - ${p.description}${overview(p)}`).join('\n')}`;

  await Readme.replaceSection('README.md', 'packages', packageToc, { append: true });
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
