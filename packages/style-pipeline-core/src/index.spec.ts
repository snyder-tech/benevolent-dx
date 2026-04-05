import { describe, expect, it } from 'vitest';
import {
  customStylePipelineProvider,
  defineStylePipelineConfig,
  sortOutputs,
  toStyleImportId,
} from './index.js';

describe('style-pipeline-core', () => {
  it('creates stable virtual import ids', () => {
    expect(toStyleImportId('themes/app.css')).toBe(
      'virtual:style-pipeline/file/themes/app.css',
    );
  });

  it('keeps provider config strongly typed at runtime', async () => {
    const provider = customStylePipelineProvider({
      name: 'custom-theme',
      async build() {
        return {
          outputs: [
            {
              id: 'theme',
              provider: 'custom',
              kind: 'theme',
              scope: 'theme',
              order: 2,
              absolutePath: '/tmp/theme.css',
              rootRelativePath: 'tmp/theme.css',
              importId: toStyleImportId('tmp/theme.css'),
              inject: true,
              tags: ['theme'],
            },
          ],
        };
      },
    });

    const config = defineStylePipelineConfig({
      providers: [provider],
    });
    const result = await config.providers[0].build({
      workspaceRoot: '/workspace',
      projectRoot: '/workspace/apps/demo',
      mode: 'development',
      command: 'serve',
    });

    expect(sortOutputs(result.outputs)[0]?.provider).toBe('custom');
  });
});
