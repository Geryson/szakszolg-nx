const { writeFile } = require('fs')
const { argv } = require('yargs')
const path = require('path')

require('dotenv').config()

const environment = argv.environment
const isProduction = environment === 'prod'
const envFolder = path.join(__dirname, '..', '..', 'apps', 'ionic', 'src', 'environments')
const targetPath = isProduction ? `${envFolder}/environment.prod.ts` : `${envFolder}/environment.ts`

const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_HOST: '${process.env.API_HOST}',
   API_PORT: '${process.env.API_PORT}',
   API_SSL: ${process.env.API_SSL},
}
`
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err)
    }
    console.log(`Wrote variables to ${targetPath}`)
})
