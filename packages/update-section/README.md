# @ls-age/update-section

> Update a section of a file

## Installation

Run `npm install --save-dev @ls-age/update-section` as usual.

<!-- BEGIN overview -->

## Usage

`@ls-age/update-section` provides an easy way to update files that are party generated.

**Example:**

```md
<!-- README.md -->

# My monorepo

## Packages

<!-- BEGIN packages -->
<!-- END packages -->
```

```js

// scripts/update-readme.js

const Template = require('@ls-age/update-section');

// Update the packages list
const packages = [
  { name: 'First', description: 'My first package' },
  { name: 'Second', description: 'Another package' },
];

async function updateReadme() {
  // Generate a list of packages
  const packageList = packages.map(p => `- **${p.name}** - ${p.desciption}`).join('\n'))

  // ...and write it to the readme file
  await Template.updateSection('./README.md', 'packages', packageList);
}

updateReadme()
  .catch(console.error);
```

Running `node scripts/update-readme.js` results in:

```md
<!-- README.md -->

# My monorepo

## Packages

<!-- BEGIN packages -->

- **First** - My first package
- **Second** - Another package

<!-- END packages -->
```

<!-- END overview -->

For a more advanced usage example, check out [this script](https://github.com/ls-age/devtools/blob/master/scripts/update-readme.js).
