import path from 'node:path';
import {
  defineStylePipelineProvider,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineContext,
  type StylePipelineOutput,
} from '@snyder-tech/style-pipeline-core';

export interface StyleDictionaryDeclaredOutput {
  destination: string;
  kind?: StylePipelineOutput['kind'];
  scope?: StylePipelineOutput['scope'];
  inject?: boolean;
  tags?: string[];
}

export interface StyleDictionaryProviderOptions {
  configFile: string;
  outDir?: string;
  outputs: StyleDictionaryDeclaredOutput[];
}

export function styleDictionaryProvider(
  options: StyleDictionaryProviderOptions,
) {
  return defineStylePipelineProvider(
    'style-dictionary',
    options,
    async (context): Promise<StylePipelineBuildResult> => {
      const outDir = path.resolve(
        context.workspaceRoot,
        options.outDir ?? 'node_modules/.analog/style-dictionary',
      );

      const outputs = options.outputs.map((output, index): StylePipelineOutput => {
        const absolutePath = path.resolve(outDir, output.destination);
        const rootRelativePath = path.relative(context.workspaceRoot, absolutePath);
        const isCss = absolutePath.endsWith('.css');

        return {
          id: `style-dictionary:${output.destination}`,
          provider: 'style-dictionary',
          kind: output.kind ?? (isCss ? 'css' : 'tokens'),
          scope: output.scope ?? 'global',
          order: index,
          absolutePath,
          rootRelativePath,
          importId: isCss ? toStyleImportId(rootRelativePath) : null,
          inject: isCss && output.inject !== false,
          tags: output.tags ?? [],
          metadata: {
            configFile: options.configFile,
          },
        };
      });

      return {
        outputs,
        watchFiles: [path.resolve(context.workspaceRoot, options.configFile)],
      };
    },
  );
}
