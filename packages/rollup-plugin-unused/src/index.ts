import { join, normalize, relative } from 'path';
import { EOL } from 'os';
import globby from 'globby';
import { createFilter } from '@rollup/pluginutils';

type FilterOption = Array<string | RegExp> | string | RegExp | null;

interface Options {
  extensions?: string[];
  include?: string[];
  exitCode?: number;
  exclude?: FilterOption;
}

export default function unusedPlugin({
  extensions = ['.js'],
  include: _include,
  exitCode = 1,
  exclude,
}: Options = {}) {
  const cwd = process.cwd();
  const include = _include || extensions.map((ext) => `src/**/*${ext}`);
  const watching = Boolean(process.env.ROLLUP_WATCH);
  const filter = createFilter(include, exclude);

  let files: Set<string>;
  let totalFiles;

  return {
    name: 'unused-files',
    async buildStart() {
      files = new Set((await globby(include)).map((n) => join(cwd, n)).filter(filter));

      totalFiles = files.size;

      if (totalFiles === 0) {
        this.warn(`No matching files`);
      }
    },
    load(id) {
      files.delete(normalize(id));
    },
    buildEnd() {
      if (files.size > 0) {
        this.warn(`${files.size} of ${totalFiles} files are unused`);

        if (!watching) {
          process.exitCode = exitCode;
          console.log(
            ['Unused files:', ...Array.from(files).map((f) => relative(cwd, f))].join(`${EOL}- `)
          );
        }
      }
    },
  };
}
