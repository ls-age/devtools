# @ls-age/update-section

> Update a section of a file

## Installation

Run `npm install --save-dev @ls-age/update-section` as usual.

<!-- BEGIN overview -->

## Usage

`@ls-age/update-section` provides an easy way to update files that are party generated.

**Example:**

<!-- BEGIN readme-before -->
<!-- This section is generated, do not edit it! -->

```md
<!-- README.md -->

# My monorepo

## Packages

<!-- BEGIN packages -->
<!-- END packages -->
```

<!-- END readme-before -->

<!-- BEGIN sample-source -->
<!-- This section is generated, do not edit it! -->

```js
/* scripts/update-readme.js */

const Template = require('@ls-age/update-section');

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
```

<!-- END sample-source -->

Running `node scripts/update-readme.js` results in:

<!-- BEGIN sample-result -->
<!-- This section is generated, do not edit it! -->

```md
<!-- README.md -->

# My monorepo

## Packages

<!-- BEGIN packages -->
<!-- This section is generated, do not edit it! -->

- **First** - My first package
- **Second** - Another package

<!-- END packages -->
```

<!-- END sample-result -->

<!-- END overview -->

For a more advanced usage example, check out [this script](https://github.com/ls-age/devtools/blob/master/scripts/update-readme.js).

BTW: This readme was also created with _@ls-age/update-section_, [check it out on GitHub](https://github.com/ls-age/devtools/blob/master/packages/update-section/scripts/update-readme.ts).
