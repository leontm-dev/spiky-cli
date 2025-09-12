export declare function readCodeFromInputFile(inputFile: string): {
    error: false;
    code: string;
} | {
    error: true;
    message: string;
};
