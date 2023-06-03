/* eslint-disable jsdoc/require-param */

import { promises as fsp } from 'fs';
import { extname } from 'path';
import commentPatterns, { CommentPattern } from './comment-patterns';

export interface TemplateFileOptions {
  commentPattern?: CommentPattern;
  /** What comment to insert in generated sections. */
  notice?: string | null;
  /**
   * Create non-existing files.
   * @default true
   */
  create?: boolean;

  // Callbacks
  onCreate?: (file: TemplateFile) => void;
}

export default class TemplateFile {
  public static defaultNotice = 'This section is generated, do not edit it!';

  protected commentBounds: [string, string];
  protected newlinesBetweenMarkers: boolean;

  private content?: string;
  public notice?: string;
  protected isCreated = false;

  constructor(public path: string, protected options: TemplateFileOptions = {}) {
    const pattern = options.commentPattern || commentPatterns.get(extname(this.path));

    if (!pattern) {
      throw new Error(
        `Unknown template extension '${extname(this.path)}' - Please provide a comment pattern`
      );
    }

    this.commentBounds = pattern.pattern;
    this.newlinesBetweenMarkers = pattern.wrap || false;

    // Insert default options
    this.options.create = this.options.create ?? true;
    console.log('Creating', this.options);
  }

  async getContent() {
    if ((this.content ?? null) === null) {
      try {
        console.log('CALLIUNG');
        this.content = await fsp.readFile(this.path, 'utf8');
      } catch (error) {
        console.error('ERR', error);
        if (this.options.create && (error as { code: string }).code === 'ENOENT') {
          this.isCreated = true;
          this.options.onCreate?.(this);
          return (this.content = '');
        }

        throw error;
      }
    }
    return this.content;
  }

  private comment(content: string) {
    const template = this.commentBounds;

    return [template[0], content, template[1]].join(' ');
  }

  private async findSection(name: string) {
    const content = await this.getContent();

    const markers = [this.comment(`BEGIN ${name}`), this.comment(`END ${name}`)];
    const pattern = new RegExp(`(${markers[0]})([\\s\\S]*)(${markers[1]})`);

    const match = content.match(pattern);

    if (!match) {
      throw new Error(`Template section '${name}' not found in file '${this.path}'.
  (Searched for ${markers.join('...')})`);
    }

    return match;
  }

  async getSection(name: string) {
    const match = await this.findSection(name);
    return match[2].trim();
  }

  async updateSection(name: string, replacement: string, notice?: string) {
    await this.getContent();

    const markers = [this.comment(`BEGIN ${name}`), this.comment(`END ${name}`)];
    const pattern = new RegExp(`(${markers[0]})([\\s\\S]*)(${markers[1]})`);

    if (!pattern.test(this.content)) {
      if (this.isCreated) {
        this.content += `${markers.join('...')}\n`;
      } else {
        throw new Error(`Template section '${name}' not found in file '${this.path}'.
  (Searched for ${markers.join('...')})`);
      }
    }

    const between = this.newlinesBetweenMarkers ? [''] : [];
    const sectionContent = [
      markers[0],
      this.comment(notice || this.notice || TemplateFile.defaultNotice),
      ...between,
      replacement,
      ...between,
      markers[1],
    ].join('\n');

    return (this.content = this.content.replace(pattern, sectionContent));
  }

  async save() {
    return fsp.writeFile(this.path, await this.getContent());
  }

  // Convenience API

  /** Reads and returns a section in the given file. */
  static getSection(path: string, name: string) {
    return new TemplateFile(path).getSection(name);
  }

  /** Replaces a section in the given file and saves it. */
  static async updateSection(path: string, name: string, replacement: string) {
    const file = new this(path);

    await file.updateSection(name, replacement);

    return file.save();
  }
}
