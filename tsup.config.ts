import { defineConfig } from 'tsup';
import packageJson from './package.json' with { type: 'json' };

const external = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/api/index.ts',
    'src/auth/index.ts',
    'src/errors/index.ts',
    'src/forms/index.ts',
    'src/hooks/index.ts',
    'src/constants/index.ts',
    'src/admin/index.ts',
    'src/types/index.ts',
    'src/components/ui/index.ts',
    'src/components/marketing/index.ts',
  ],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
  external,
});
