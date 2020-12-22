declare type FilterOption = Array<string | RegExp> | string | RegExp | null;
interface Options {
    extensions?: string[];
    include?: string[];
    exitCode?: number;
    exclude?: FilterOption;
}
export default function unusedPlugin({ extensions, include: _include, exitCode, exclude, }?: Options): {
    name: string;
    buildStart(): Promise<void>;
    load(id: any): void;
    buildEnd(): void;
};
export {};
