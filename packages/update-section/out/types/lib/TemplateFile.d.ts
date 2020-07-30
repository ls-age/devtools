import { CommentPattern } from './comment-patterns';
export interface TemplateFileOptions {
    commentPattern?: CommentPattern;
}
export default class TemplateFile {
    protected commentBounds: [string, string];
    protected newlinesBetweenMarkers: boolean;
    private path;
    private content?;
    constructor(path: string, options?: TemplateFileOptions);
    getContent(): Promise<string>;
    private comment;
    private findSection;
    getSection(name: string): Promise<string>;
    updateSection(name: string, replacement: string): Promise<string>;
    save(): Promise<void>;
    /** Reads and returns a section in the given file. */
    static getSection(path: string, name: string): Promise<string>;
    /** Replaces a section in the given file and saves it. */
    static updateSection(path: string, name: string, replacement: string): Promise<void>;
}
