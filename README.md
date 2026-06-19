# @yca-software/2chi-react-core

Design system and shared SPA kit for 2chi React apps.

## Install

```bash
pnpm add @yca-software/2chi-react-core
```

Import styles once in your app entry:

```tsx
import '@yca-software/2chi-react-core/styles.css';
```

**Peers:** `react`, `react-dom`, `react-hook-form`, `react-router`, `react-i18next`, `i18next`, `@tanstack/react-query`

## Usage

Prefer subpath imports:

```tsx
import { Button } from '@yca-software/2chi-react-core/ui';
import { useAPI, createApiProvider } from '@yca-software/2chi-react-core/api';
import { formatApiError } from '@yca-software/2chi-react-core/errors';
import { AdminListPage } from '@yca-software/2chi-react-core';
```

| Subpath | Contents |
|---------|----------|
| `/ui` | Design-system components |
| `/marketing` | Landing-page sections |
| `/api` | HTTP client, token refresh |
| `/auth` | Cookies, JWT helpers |
| `/errors` | API error formatting |
| `/forms` | react-hook-form fields |
| `/hooks` | Admin list, i18n hooks |
| `/constants` | Cookie names, pagination |
| `/admin` | Admin detail helpers |

The root export re-exports everything. `@yca-software/2chi-react-core/design-system` is a deprecated alias for `.`.

## Development

```bash
pnpm install
pnpm run build
pnpm run ci
pnpm run storybook
```

## Release

Publishing is automated when you [create a GitHub Release](https://github.com/yca-software/2chi-react-core/releases/new):

1. Bump `version` in `package.json`
2. Commit and push to `main`
3. Tag `vX.Y.Z` and publish the release

CI runs build, lint, tests, then publishes to npm with `NPM_TOKEN`.
