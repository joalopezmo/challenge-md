import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'table',
  exposes: {
    './Routes': 'apps/table/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
