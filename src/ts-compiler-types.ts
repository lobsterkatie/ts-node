import type * as _ts from 'typescript';

/**
 * Common TypeScript interfaces between versions.  We endeavour to write ts-node's own code against these types instead
 * of against `import "typescript"`, though we are not yet doing this consistently.
 *
 * Sometimes typescript@next adds an API we need to use.  But we build ts-node against typescript@latest.
 * In these cases, we must declare that API explicitly here.  Our declarations include the newer typescript@next APIs.
 * Importantly, these re-declarations are *not* TypeScript internals.  They are public APIs that only exist in
 * pre-release versions of typescript.
 */
export interface TSCommon {
  version: typeof _ts.version;
  sys: typeof _ts.sys;
  ScriptSnapshot: typeof _ts.ScriptSnapshot;
  displayPartsToString: typeof _ts.displayPartsToString;
  createLanguageService: typeof _ts.createLanguageService;
  getDefaultLibFilePath: typeof _ts.getDefaultLibFilePath;
  getPreEmitDiagnostics: typeof _ts.getPreEmitDiagnostics;
  flattenDiagnosticMessageText: typeof _ts.flattenDiagnosticMessageText;
  transpileModule: typeof _ts.transpileModule;
  ModuleKind: typeof _ts.ModuleKind;
  ScriptTarget: typeof _ts.ScriptTarget;
  findConfigFile: typeof _ts.findConfigFile;
  readConfigFile: typeof _ts.readConfigFile;
  parseJsonConfigFileContent: typeof _ts.parseJsonConfigFileContent;
  formatDiagnostics: typeof _ts.formatDiagnostics;
  formatDiagnosticsWithColorAndContext: typeof _ts.formatDiagnosticsWithColorAndContext;

  createDocumentRegistry: typeof _ts.createDocumentRegistry;
  JsxEmit: typeof _ts.JsxEmit;
  createModuleResolutionCache: typeof _ts.createModuleResolutionCache;
  resolveModuleName: typeof _ts.resolveModuleName;
  resolveModuleNameFromCache: typeof _ts.resolveModuleNameFromCache;
  // Changed in TS 4.7
  resolveTypeReferenceDirective(
    typeReferenceDirectiveName: string,
    containingFile: string | undefined,
    options: _ts.CompilerOptions,
    host: _ts.ModuleResolutionHost,
    redirectedReference?: _ts.ResolvedProjectReference,
    cache?: _ts.TypeReferenceDirectiveResolutionCache,
    resolutionMode?: _ts.SourceFile['impliedNodeFormat']
  ): _ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
  createIncrementalCompilerHost: typeof _ts.createIncrementalCompilerHost;
  createSourceFile: typeof _ts.createSourceFile;
  getDefaultLibFileName: typeof _ts.getDefaultLibFileName;
  createIncrementalProgram: typeof _ts.createIncrementalProgram;
  createEmitAndSemanticDiagnosticsBuilderProgram: typeof _ts.createEmitAndSemanticDiagnosticsBuilderProgram;

  Extension: typeof _ts.Extension;
  ModuleResolutionKind: typeof _ts.ModuleResolutionKind;
}
export namespace TSCommon {
  export interface LanguageServiceHost extends _ts.LanguageServiceHost {
    // Modified in 4.7
    resolveTypeReferenceDirectives?(
      typeDirectiveNames: string[] | _ts.FileReference[],
      containingFile: string,
      redirectedReference: _ts.ResolvedProjectReference | undefined,
      options: _ts.CompilerOptions,
      containingFileMode?: _ts.SourceFile['impliedNodeFormat'] | undefined
    ): (_ts.ResolvedTypeReferenceDirective | undefined)[];
  }
  export type ModuleResolutionHost = _ts.ModuleResolutionHost;
  export type ParsedCommandLine = _ts.ParsedCommandLine;
  export type ResolvedModule = _ts.ResolvedModule;
  export type ResolvedTypeReferenceDirective =
    _ts.ResolvedTypeReferenceDirective;
  export type CompilerOptions = _ts.CompilerOptions;
  export type ResolvedProjectReference = _ts.ResolvedProjectReference;
  export type ResolvedModuleWithFailedLookupLocations =
    _ts.ResolvedModuleWithFailedLookupLocations;
  export type FileReference = _ts.FileReference;
  export type SourceFile = _ts.SourceFile;
}

/**
 * Compiler APIs we use that are marked internal and not included in TypeScript's public API declarations
 * @internal
 */
export interface TSInternal {
  // https://github.com/microsoft/TypeScript/blob/4a34294908bed6701dcba2456ca7ac5eafe0ddff/src/compiler/core.ts#L1906-L1909
  createGetCanonicalFileName(
    useCaseSensitiveFileNames: boolean
  ): TSInternal.GetCanonicalFileName;
  // https://github.com/microsoft/TypeScript/blob/c117c266e09c80e8a06b24a6e94b9d018f5fae6b/src/compiler/commandLineParser.ts#L2054
  convertToTSConfig(
    configParseResult: _ts.ParsedCommandLine,
    configFileName: string,
    host: TSInternal.ConvertToTSConfigHost
  ): any;
  libs?: string[];
  Diagnostics: {
    File_0_not_found: _ts.DiagnosticMessage;
  };
  createCompilerDiagnostic(
    message: _ts.DiagnosticMessage,
    ...args: (string | number | undefined)[]
  ): _ts.Diagnostic;
  nodeModuleNameResolver(
    moduleName: string,
    containingFile: string,
    compilerOptions: _ts.CompilerOptions,
    host: _ts.ModuleResolutionHost,
    cache?: _ts.ModuleResolutionCache,
    redirectedReference?: _ts.ResolvedProjectReference,
    lookupConfig?: boolean
  ): _ts.ResolvedModuleWithFailedLookupLocations;
  // Added in TS 4.7
  getModeForFileReference?: (
    ref: _ts.FileReference | string,
    containingFileMode: _ts.SourceFile['impliedNodeFormat']
  ) => _ts.SourceFile['impliedNodeFormat'];
}
/** @internal */
export namespace TSInternal {
  // https://github.com/microsoft/TypeScript/blob/4a34294908bed6701dcba2456ca7ac5eafe0ddff/src/compiler/core.ts#L1906
  export type GetCanonicalFileName = (fileName: string) => string;
  // https://github.com/microsoft/TypeScript/blob/c117c266e09c80e8a06b24a6e94b9d018f5fae6b/src/compiler/commandLineParser.ts#L2041
  export interface ConvertToTSConfigHost {
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames: boolean;
  }
}
