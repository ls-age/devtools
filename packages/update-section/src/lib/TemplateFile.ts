/* eslint-disable jsdoc/require-param */

import { promises as fsp } from 'fs';
import { extname } from 'path';
import commentPatterns, { CommentPattern } from './comment-patterns';

export interface TemplateFileOptions {
  commentPattern?: CommentPattern;
}

export default class TemplateFile {
  protected commentBounds: [string, string];
  protected newlinesBetweenMarkers: boolean;

  private path: string;
  private content?: string;

  constructor(path: string, options: TemplateFileOptions = {}) {
    this.path = path;

    const pattern = options.commentPattern || commentPatterns.get(extname(this.path));

    this.commentBounds = pattern.pattern;
    this.newlinesBetweenMarkers = pattern.wrap || false;
  }

  async getContent() {
    if (!this.content) {
      this.content = await fsp.readFile(this.path, 'utf8');
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

  async updateSection(name: string, replacement: string) {
    const content = await this.getContent();

    const markers = [this.comment(`BEGIN ${name}`), this.comment(`END ${name}`)];
    const pattern = new RegExp(`(${markers[0]})([\\s\\S]*)(${markers[1]})`);

    if (!pattern.test(content)) {
      throw new Error(`Template section '${name}' not found in file '${this.path}'.
  (Searched for ${markers.join('...')})`);
    }

    const between = this.newlinesBetweenMarkers ? [''] : [];
    const sectionContent = [
      markers[0],
      this.comment('This section is generated, do not edit it!'),
      ...between,
      replacement,
      ...between,
      markers[1],
    ].join('\n');

    this.content = content.replace(pattern, sectionContent);
    return content;
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
