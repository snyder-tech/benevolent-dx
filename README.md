# Benevolent DX

Kind tools for exceptional DX — AnalogJS, TanStack, and modern web utilities.
Open source by Snyder Tech and the community.

Benevolent DX is a community-driven open-source monorepo of thoughtfully
crafted packages for AnalogJS, TanStack (Query, Router, Start, etc.), and the
general frontend tooling we actually use on real client projects.

The name is a playful nod to our founder, Ben Snyder — “Ben-evolent” — because
we believe developer experience should be kind, generous, and genuinely
helpful. No bloat. No corporate cruft. Just high-quality, well-documented
packages that make your life better.

## Brand

- Official brand name: `Benevolent DX`
- Short form: `BDX`
- Repository: `snyder-tech/benevolent-dx`
- Package publisher: `@snyder-tech`
- Naming convention:
  - `@snyder-tech/bdx-analog-*`
  - `@snyder-tech/bdx-tanstack-*`

## Goals

- Keep framework cores lean
- Provide strongly typed integration surfaces for community extensions
- Prove generic style-pipeline APIs before asking Analog core to commit to them
- Support multiple styling ecosystems without forcing host frameworks to own their semantics
- Ship practical packages we actually want to use on client work

## Initial packages

- `@snyder-tech/bdx-analog-style-pipeline-core`
- `@snyder-tech/bdx-analog-style-pipeline-vite`
- `@snyder-tech/bdx-analog-style-dictionary-provider`
- `@snyder-tech/bdx-analog-panda-provider`
- `@snyder-tech/bdx-analog-tokiforge-provider`

## Principles

- Host frameworks should own as little public API as possible
- Style resource orchestration should be generic
- Providers own production semantics
- Libraries and frameworks own their own adapters
- CSS variables are the durable runtime contract
- DX should feel warm, practical, and unsurprising
