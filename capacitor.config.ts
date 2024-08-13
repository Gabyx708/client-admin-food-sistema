import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.admin',
  appName: 'admin menu',
  webDir: 'dist',
  android:{
    allowMixedContent: true
  },
  server:{
    cleartext: true
  }
};

export default config;
