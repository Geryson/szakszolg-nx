import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'ionic',
    webDir: '../../dist/apps/ionic',
    bundledWebRuntime: false,
    includePlugins: ['es6-promise-plugin', 'cordova-plugin-screen-orientation', 'cordova.plugins.diagnostic'],
}

export default config
