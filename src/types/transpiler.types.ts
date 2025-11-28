// Code

export type ITranspiledFile = {
  content: string;
  imports: IFileImport[];
  exports: IFileExport[];
  methodsTypes?: IMethodType[];
};
export type IFileImport = {
  isDefault: boolean;
  name: string;
  path: string;
};
export type IFileExport = {
  isDefault: boolean;
  name: string;
};
export type IMethodType = {
  async: boolean;
  name: string;
  paramaters: IParameterType[];
  returnType: string;
};
export type IParameterType = {
  initializer?: string;
  isOptional: boolean;
  name: string;
  type: string;
};
export type TranspilerConfig = {
  verbose?: boolean;
  python?: {
    uncamelcaseIdentifiers?: boolean;
    asyncTranspiling?: boolean;
    parser?: Record<string, string>;
    FullPropertyAccessReplacements?: Record<string, string>;
    LeftPropertyAccessReplacements?: Record<string, string>;
    RightPropertyAccessReplacements?: Record<string, string>;
    CallExpressionReplacements?: Record<string, string>;
    StringLiteralReplacements?: Record<string, string>;
  };
};
