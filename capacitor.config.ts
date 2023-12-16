import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'trip-planner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
