import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'ionic',
    webDir: '../../dist/apps/ionic',
    bundledWebRuntime: false,
    includePlugins: [
        'es6-promise-plugin',
        'cordova-plugin-screen-orientation',
        'cordova.plugins.diagnostic',
        'cordova-plugin-file',
        'cordova-clipboard',
    ],
    server: {
        url: "http://192.168.29.34:4200", // Ide a saját IP-d, port amin az ionic fut
        cleartext: true
    },
}

export default config
