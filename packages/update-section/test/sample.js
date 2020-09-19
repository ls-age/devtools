const Template = require('../');

// Update the packages list
const packages = [
  { name: 'First', description: 'My first package' },
  { name: 'Second', description: 'Another package' },
];

async function updateReadme() {
  // Generate a list of packages
  const packageList = packages.map(p => `- **${p.name}** - ${p.description}`).join('\n');

  // ...and write it to the readme file
  await Template.updateSection('./README.md', 'packages', packageList);
}

updateReadme().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
