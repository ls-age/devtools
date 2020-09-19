# ls-age devtools

> A collection of devtools

[![CircleCI](https://circleci.com/gh/ls-age/devtools.svg?style=svg)](https://circleci.com/gh/ls-age/devtools)

<!-- BEGIN packages -->
<!-- This section is generated, do not edit it! -->

## Packages

### [@ls-age/commitlint-config](packages/commitlint-config)

> Like @commitlint/config-conventional, but with a sentence-cased subject

Following commit message guidelines makes it easier to follow semantic versioning, both if you manually publish releases or use a tool like [_@ls-age/bump-version_](https://github.com/ls-age/bump-version) to automate this. The commit message contains a _type_, a _subject_ and (optionally) a _scope_:

```
fix(package): This is what happened

              ^ subject
    ^ scope
^ type
```

- The **type** describes what kind of change was made. It should be one of the following: `'build'`, `'ci'`, `'chore'`, `'docs'`, `'feat'`, `'fix'`, `'perf'`, `'refactor'`, `'revert'`, `'style'`, `'test'`.
- The **scope** can _optionally_ be set to the name of the sub-package or service that is affected by this commit.
- The **subject** contains a human-readable description of the changes made. It should start with an uppercase letter.

### [rollup-plugin-unused](packages/rollup-plugin-unused)

> Rollup plugin to check for unused files

![Usage](./packages/rollup-plugin-unused/docs/assets/usage.svg)

This plugin helps you to keep your repository clean: It checks for source files that are not imported during a rollup build and reports them.

### [@ls-age/update-section](packages/update-section)

> Update a section of a file

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

<!-- END packages -->
