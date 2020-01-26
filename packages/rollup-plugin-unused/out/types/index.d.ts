export default function unusedPlugin({ extensions, include: _include, exitCode, exclude, }: {
    extensions?: string[];
    include: any;
    exitCode?: number;
    exclude: any;
}): {
    name: string;
    buildStart(): Promise<void>;
    load(id: any): void;
    buildEnd(): void;
};
