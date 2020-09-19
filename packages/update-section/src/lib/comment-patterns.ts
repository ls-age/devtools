export interface CommentPattern {
  /** The start and stop sequence of a comment */
  pattern: [string, string];
  /** If this language needs newlines between comments and content */
  wrap?: boolean;
}

interface CommentPatternMapping extends CommentPattern {
  extensions: string[];
}

const languages: CommentPatternMapping[] = [
  {
    extensions: ['.html', '.htm'],
    pattern: ['<!--', '-->'],
  },
  {
    extensions: ['.md', '.markdown'],
    pattern: ['<!--', '-->'],
    wrap: true,
  },
  {
    extensions: ['.js', '.ts'],
    pattern: ['/*', '*/'],
  },
];

const commentPatterns: Map<string, CommentPattern> = new Map(
  languages.flatMap(language => language.extensions.map(extension => [extension, language]))
);

export default commentPatterns;
