// Imports
// Code
export function calculateIndent(path) {
    const parentFunction = path.findParent((p) => p.isFunction());
    if (!parentFunction) {
        return "";
    }
    let indentationLevel = 0;
    path.findParent((p) => {
        if (p.isBlockStatement()) {
            indentationLevel++;
        }
        return p.node === parentFunction.node;
    });
    return "    ".repeat(indentationLevel);
}
//# sourceMappingURL=calculateIndent.js.map