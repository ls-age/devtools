import { promises as fsp } from 'fs';
import { extname } from 'path';
import TemplateFile from '../';
import commentPatterns from '../src/lib/comment-patterns';

const codeBlock = (lang, filename, code) => {
  const [start, end] = commentPatterns.get(extname(filename)).pattern;
  const comment = [start, filename, end].join(' ');

  return `\`\`\`${lang}
${comment}

${code}
\`\`\``;
};

async function updateReadme() {
  const readme = new TemplateFile('./README.md');

  await readme.updateSection(
    'readme-before',
    codeBlock('md', 'README.md', (await fsp.readFile('./test/readme-before.md', 'utf8')).trim())
  );

  await readme.updateSection(
    'sample-source',
    codeBlock(
      'js',
      'scripts/update-readme.js',
      (await fsp.readFile('./test/sample.js', 'utf8'))
        .trim()
        .replace("require('../')", "require('@ls-age/update-section')")
    )
  );

  await readme.updateSection(
    'sample-result',
    codeBlock('md', 'README.md', (await fsp.readFile('./test/README.md', 'utf8')).trim())
  );

  await readme.save();
}

updateReadme().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
