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

<!-- END packages -->
