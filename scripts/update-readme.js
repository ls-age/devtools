const { relative, join } = require('path');
const { default: findWorkspacePackages } = require('@pnpm/find-workspace-packages');
// eslint-disable-next-line import/no-unresolved
const TemplateFile = require('../packages/update-section');

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
        overview: await TemplateFile.getSection(join(dir, 'README.md'), 'overview'),
      });
    }
  }

  const packageToc = `## Packages

${packages
  .map(
    (p) => `### [${p.name}](${p.dir})

> ${p.description}${overview(p)}`
  )
  .join('\n')}`;

  await TemplateFile.updateSection('README.md', 'packages', packageToc);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
