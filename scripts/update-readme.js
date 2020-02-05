const { promises: fs } = require('fs');
const { relative } = require('path');
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

  async replaceSection(name, replacement, { append = false } = {}) {
    const content = await this.getContent();

    const markers = [`<!-- BEGIN ${name} -->`, `<!-- END ${name} -->`];
    const pattern = new RegExp(`(${markers[0]})([\\s\\S]*)(${markers[1]})`);

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

  static async replaceSection(path, name, replacement, options) {
    const readme = new Readme(path);

    await readme.replaceSection(name, replacement, options);

    return readme.save();
  }
}

async function run() {
  const cwd = process.cwd();

  const packages = [];

  for (const { dir, manifest } of await findWorkspacePackages(cwd)) {
    if (dir !== cwd) {
      packages.push({
        ...manifest,
        dir: relative(cwd, dir),
      });
    }
  }

  const packageToc = `## Packages

${packages.map(p => `- [\`${p.name}\`](${p.dir}) - ${p.description}`).join('\n')}`;

  await Readme.replaceSection('README.md', 'packages', packageToc, { append: true });
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
