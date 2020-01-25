# @ls-age/commitlint-config

> A [commitlint][commitlint] config extending [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional), but with a sentence-cased subject.

## About

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

## Installation

With a modern (lts) version of node.js installed, use npm to install this package:

```
npm install --save-dev @ls-age/commitlint-config
```

### Setup git hooks

> Follow [commitlint's guide](https://commitlint.js.org/#/guides-local-setup) for more details.

1. Install [commitlint][commitlint], [husky](https://www.npmjs.com/package/husky) and this package:

   ```
   npm install --save-dev husky commitlint @ls-age/commitlint-config
   ```

2. Add the config to your package's _commitlint_ field and register a git hook via husky:

   ```json
   {
     "name": "your-package",
     ...
     "commitlint": {
       "extends": [
         "@ls-age"
       ]
     },
     "husky": {
       "hooks": {
         "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
       }
     },
   }
   ```

   _package.json_

### CI setup (CircleCI)

> Follow [commitlint's guide](https://commitlint.js.org/#/guides-ci-setup) for more details.

This depends on how you've setup CircleCI, but basically all you have to do is run a job that calls commitlint:

```yaml
jobs:
  commitmsg:
    steps:
      # checkout and run npm install
      - run:
          name: Run commitlint
          command: git log --format=%B -n 1 $CIRCLE_SHA1 | npx commitlint
```

_We plan to release a CircleCI orb doing this in the future_

[commitlint]: https://commitlint.js.org/
