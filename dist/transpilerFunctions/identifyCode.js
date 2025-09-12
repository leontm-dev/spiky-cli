// Project-Imports
import { parse } from '@babel/parser';
// Code
export const transpileCode = (code) => {
    const ast = parse(code, { sourceType: 'module', plugins: ['typescript'] });
    return ast;
};
//# sourceMappingURL=identifyCode.js.map