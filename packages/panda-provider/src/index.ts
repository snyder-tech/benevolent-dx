import path from 'node:path';
import {
  defineStylePipelineProvider,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineOutput,
} from '@snyder-tech/style-pipeline-core';

export interface PandaProviderOptions {
  configFile: string;
  outDir?: string;
  emitCss?: boolean;
  emitTokens?: boolean;
}

export function pandaProvider(options: PandaProviderOptions) {
  return defineStylePipelineProvider(
    'panda',
    options,
    async (context): Promise<StylePipelineBuildResult> => {
      const outDir = path.resolve(
        context.workspaceRoot,
        options.outDir ?? 'styled-system',
      );
      const outputs: StylePipelineOutput[] = [];
      let order = 0;

      if (options.emitCss !== false) {
        const absolutePath = path.resolve(outDir, 'styles.css');
        const rootRelativePath = path.relative(context.workspaceRoot, absolutePath);
        outputs.push({
          id: 'panda:styles.css',
          provider: 'panda',
          kind: 'css',
          scope: 'global',
          order: order++,
          absolutePath,
          rootRelativePath,
          importId: toStyleImportId(rootRelativePath),
          inject: false,
          tags: ['panda', 'css'],
          metadata: {
            configFile: options.configFile,
          },
        });
      }

      if (options.emitTokens !== false) {
        const absolutePath = path.resolve(outDir, 'tokens/index.ts');
        const rootRelativePath = path.relative(context.workspaceRoot, absolutePath);
        outputs.push({
          id: 'panda:tokens',
          provider: 'panda',
          kind: 'typescript',
          scope: 'theme',
          order: order++,
          absolutePath,
          rootRelativePath,
          importId: null,
          inject: false,
          tags: ['panda', 'tokens'],
          metadata: {
            configFile: options.configFile,
          },
        });
      }

      return {
        outputs,
        watchFiles: [path.resolve(context.workspaceRoot, options.configFile)],
      };
    },
  );
}
