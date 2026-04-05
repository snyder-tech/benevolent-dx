export type StyleOutputKind =
  | 'css'
  | 'theme'
  | 'tokens'
  | 'manifest'
  | 'typescript';

export type StyleOutputScope = 'global' | 'component' | 'theme';

export interface StylePipelineOutput {
  id: string;
  provider: string;
  kind: StyleOutputKind;
  scope: StyleOutputScope;
  order: number;
  absolutePath: string;
  rootRelativePath: string;
  importId: string | null;
  inject: boolean;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface StylePipelineBuildResult {
  outputs: StylePipelineOutput[];
  watchFiles?: string[];
  warnings?: string[];
}

export interface StylePipelineContext {
  workspaceRoot: string;
  projectRoot: string;
  mode: 'development' | 'production' | 'test';
  command: 'serve' | 'build' | 'test';
}

export interface StylePipelineProvider<
  TName extends string = string,
  TOptions extends object = object,
> {
  kind: TName;
  options: TOptions;
  build(context: StylePipelineContext): Promise<StylePipelineBuildResult>;
}

export interface CustomStylePipelineProviderOptions {
  name: string;
  build(context: StylePipelineContext): Promise<StylePipelineBuildResult>;
}

export interface StylePipelineConfig<
  TProviders extends readonly StylePipelineProvider[] = readonly StylePipelineProvider[],
> {
  injectDefaultCss?: boolean;
  manifestModuleId?: string;
  cssModuleId?: string;
  providers: TProviders;
}

export function defineStylePipelineConfig<
  TProviders extends readonly StylePipelineProvider[],
>(config: StylePipelineConfig<TProviders>): StylePipelineConfig<TProviders> {
  return config;
}

export function defineStylePipelineProvider<
  TName extends string,
  TOptions extends object,
>(
  kind: TName,
  options: TOptions,
  build: StylePipelineProvider<TName, TOptions>['build'],
): StylePipelineProvider<TName, TOptions> {
  return {
    kind,
    options,
    build,
  };
}

export function customStylePipelineProvider(
  options: CustomStylePipelineProviderOptions,
): StylePipelineProvider<'custom', CustomStylePipelineProviderOptions> {
  return defineStylePipelineProvider('custom', options, options.build);
}

export function toStyleImportId(relativePath: string): string {
  return `virtual:style-pipeline/file/${relativePath.replace(/^\/+/, '')}`;
}

export function sortOutputs(
  outputs: readonly StylePipelineOutput[],
): StylePipelineOutput[] {
  return [...outputs].sort((left, right) => left.order - right.order);
}
