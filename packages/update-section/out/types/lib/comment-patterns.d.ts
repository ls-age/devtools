export interface CommentPattern {
    /** The start and stop sequence of a comment */
    pattern: [string, string];
    /** If this language needs newlines between comments and content */
    wrap?: boolean;
}
declare const commentPatterns: Map<string, CommentPattern>;
export default commentPatterns;
