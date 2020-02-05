# rollup-plugin-unused

> Rollup plugin to check for unused files.

<!-- BEGIN overview -->

![Usage](./docs/assets/usage.svg)

This plugin helps you to keep your repository clean: It checks for source files that are not imported during a rollup build and reports them.

<!-- END overview -->

## Installation

With a modern (lts) version of node.js installed, use npm to install this package:

```
npm install --save-dev rollup-plugin-unused
```

## Usage

Just add it your rollup.config.js, the default options should be sufficient in most use cases:

```javascript
import findUnused from 'rollup-plugin-unused';

export default {
  // input and other options

  plugins: [
    // NOTE: It's important that this plugin is added before any plugins that load files!
    findUnused(),

    // other plugins...
  ],
};
```

By default, the plugin looks for source files with an extension of `.js` in the `./src/` folder. To change this, you can:

- Set the _extensions_ option, for example to include TypeScript files:

  ```javascript
  findUnused({ extensions: ['.js', '.ts'] });
  ```

- Set the _includes_ option to specify a different source file glob:

  ```javascript
  findUnused({ include: ['sources/**/*.mjs'] });
  ```

  _This will treat all `.mjs` files inside the `./sources/` folder as source files._

- Use the _exclude_ option to ignore some files

  ```javascript
  findUnused({ exclude: ['src/legacy/*.js'] });
  ```

  _This will ignore all `.js` files inside the `./src/` folder._

**You can combine _exclude_ with both _extensions_ and _include_, but _include_ always overrides _extensions_.**
