import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'hu.hmpedszakszolgalat.pava',
    appName: 'PÁVA',
    webDir: '../../dist/apps/ionic',
    bundledWebRuntime: false,
    includePlugins: [
        'es6-promise-plugin',
        'cordova-plugin-screen-orientation',
        'cordova.plugins.diagnostic',
        'cordova-plugin-file',
        'cordova-clipboard',
    ],
}

export default config
