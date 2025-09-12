// Imports
// Code
export default function FunctionDeclarationHandler(code, path) {
    const contents = code;
    try {
        contents.push({
            content: `${path.node.async ? "async" : ""} def ${path.node.id?.name}(${path.node.params
                .map((param) => {
                if (param.type === "Identifier") {
                    let paramName = param.name;
                    let paramType = "";
                    // Prüfen, ob eine Typ-Annotation vorhanden ist
                    if (param.typeAnnotation &&
                        param.typeAnnotation.type === "TSTypeAnnotation") {
                        const typeNode = param.typeAnnotation.typeAnnotation;
                        // Mappen von TS-Typen zu Python-Typen
                        switch (typeNode.type) {
                            case "TSStringKeyword":
                                paramType = "str";
                                break;
                            case "TSNumberKeyword":
                                paramType = "int"; // oder float
                                break;
                            case "TSBooleanKeyword":
                                paramType = "bool";
                                break;
                            case "TSNullKeyword":
                                paramType = "null";
                                break;
                            case "TSObjectKeyword":
                                paramType = "object";
                                break;
                            // Fügen Sie hier weitere Typ-Mappings hinzu
                            default:
                                // Für komplexere Typen wie Klassen
                                if (typeNode.type === "TSTypeReference" &&
                                    typeNode.typeName.type === "Identifier") {
                                    paramType = typeNode.typeName.name;
                                }
                                break;
                        }
                    }
                    // Python-Syntax: "param_name: param_type"
                    return paramType ? `${paramName}: ${paramType}` : paramName;
                }
                return "";
            })
                .join(", ")}):`,
            line: path.node.loc?.start.line,
            type: "code",
        });
        return { ok: true, contents };
    }
    catch (error) {
        return { ok: false };
    }
}
//# sourceMappingURL=index.js.map