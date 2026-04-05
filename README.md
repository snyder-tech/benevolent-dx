# analog-packages

Community-owned packages for AnalogJS integrations that are useful but do not
need to live in `analogjs/analog` directly.

## Goals

- Keep Analog core lean
- Provide strongly typed integration surfaces for community extensions
- Prove generic style-pipeline APIs before asking Analog core to commit to them
- Support multiple styling ecosystems without forcing Analog to own their semantics

## Initial packages

- `@snyder-tech/style-pipeline-core`
- `@snyder-tech/style-pipeline-vite`
- `@snyder-tech/style-dictionary-provider`
- `@snyder-tech/panda-provider`
- `@snyder-tech/tokiforge-provider`

## Principles

- Analog should own as little public API as possible
- Style resource orchestration should be generic
- Providers own production semantics
- Libraries and frameworks own their own adapters
- CSS variables are the durable runtime contract
