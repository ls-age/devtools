const { promises: fs } = require('fs');
const { join } = require('path');
const rootPackage = require('../package.json');

const readJson = path => fs.readFile(path, 'utf8').then(JSON.parse);
const writeJson = (path, data) => fs.writeFile(path, `${JSON.stringify(data, null, '  ')}\n`);

async function findPackages() {
  const dirs = (await fs.readdir('./packages', { withFileTypes: true })).filter(ent =>
    ent.isDirectory()
  );

  return Promise.all(
    dirs.map(async d => {
      const path = join('./packages', d.name);
      const packagePath = join(path, 'package.json');

      return {
        path,
        packagePath,
        package: await readJson(packagePath),
      };
    })
  );
}

function updateMetadata(pkg) {
  const updated = pkg.package;
  updated.repository = rootPackage.repository;
  updated.bugs = rootPackage.bugs;
  updated.homepage = rootPackage.homepage.replace('#readme', `/tree/master/${pkg.path}#readme`);
  updated.scripts.preinstall = rootPackage.scripts.preinstall.replace('./scripts', '../../scripts');

  writeJson(pkg.packagePath, updated);
}

async function run() {
  const packages = await findPackages();

  await Promise.all(packages.map(pkg => updateMetadata(pkg)));
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
