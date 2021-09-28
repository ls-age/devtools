import { CommentPattern } from './comment-patterns';
export interface TemplateFileOptions {
    commentPattern?: CommentPattern;
    /** What comment to insert in generated sections.
  
     */
    notice?: string | null;
}
export default class TemplateFile {
    static defaultNotice: string;
    protected commentBounds: [string, string];
    protected newlinesBetweenMarkers: boolean;
    private path;
    private content?;
    notice?: string;
    constructor(path: string, options?: TemplateFileOptions);
    getContent(): Promise<string>;
    private comment;
    private findSection;
    getSection(name: string): Promise<string>;
    updateSection(name: string, replacement: string, notice?: string): Promise<string>;
    save(): Promise<void>;
    /** Reads and returns a section in the given file. */
    static getSection(path: string, name: string): Promise<string>;
    /** Replaces a section in the given file and saves it. */
    static updateSection(path: string, name: string, replacement: string): Promise<void>;
}
