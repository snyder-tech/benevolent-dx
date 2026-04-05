import { defineConfig } from 'vite';
import stylePipelineConfig from './style-pipeline.config';
import { stylePipeline } from '@snyder-tech/style-pipeline-vite';

export default defineConfig({
  plugins: [...stylePipeline(stylePipelineConfig)],
});
