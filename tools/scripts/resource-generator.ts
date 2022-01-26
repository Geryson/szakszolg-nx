// 0. Imports
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const files = []

main().then()

async function main() {
    if (process.argv.includes('--help')) {
        writeHelp()
        process.exit(0)
    }

    // 1. Set up arguments
    const dryRun = process.argv.includes('--dry-run')
    const input = process.argv[2]
    const dir = findDirParam() || path.resolve(path.join('apps', 'api', 'src', 'app'))

    // 1.2. Setup constants
    const templateDir = path.join(__dirname, '..', 'templates', 'resource-generator', '__kebab-case__')
    const resourceName = checkCasing(input)
    const interfaceIndex = path.resolve(path.join('libs', 'api-interfaces', 'src'))
    const interfaceDir = path.join(interfaceIndex, 'lib')

    // 2. Check if the input is valid
    if (!input) {
        console.error('No resource name specified')
        process.exit(1)
    }

    if (input.includes('/') || input.includes('\\')) {
        console.error('Resource name cannot contain slashes')
        process.exit(1)
    }

    if (input.endsWith('s')) {
        console.warn('Resource name should be singular. Do you want to continue?')
        let ans = (await prompt('[Y/n]')).toLowerCase()
        while (ans !== 'y' && ans !== 'n') {
            console.error('Invalid option')
            ans = (await prompt('[Y/n]')).toLowerCase()
        }
        if (ans === 'n') process.exit(1)
        else console.log('Continuing...')
    }

    // 3. Create the resource
    console.log(`Generating resource ${resourceName.pascalCase}`)
    walkDir(templateDir)
    for (const f of files) {
        const output = f
            .replace(templateDir, path.join(dir, resourceName.kebabCase))
            .replace('__kebab-case__', resourceName.kebabCase)

        if (fs.existsSync(output) && fs.lstatSync(output).isFile() && !process.argv.includes('--force')) {
            console.error(`File ${output} already exists. Specify --force to overwrite.`)
            process.exit(1)
        }

        const content = fs
            .readFileSync(f, 'utf8')
            .replace(/__PascalCase__/g, resourceName.pascalCase)
            .replace(/__kebab-case__/g, resourceName.kebabCase)
            .replace(/__camelCase__/g, resourceName.camelCase)

        console.log(`Creating: ${output}`)
        if (!dryRun) {
            fs.mkdirSync(path.dirname(output), { recursive: true })
            fs.writeFileSync(output, content)
        }
    }

    // 4. Create the interface
    const interfaceFile = path.join(interfaceDir, `${resourceName.kebabCase}.interface.ts`)
    if (fs.existsSync(interfaceFile) && !process.argv.includes('--force')) {
        console.error(`File ${interfaceFile} already exists. Specify --force to overwrite.`)
        process.exit(1)
    }
    console.log(`Creating: ${interfaceFile}`)
    if (!dryRun) {
        fs.writeFileSync(
            interfaceFile,
            `import { IApiResource } from './api-resource.interface'

export interface I${resourceName.pascalCase} extends IApiResource {
  // TODO: Add properties
}
`,
        )
    }
    // 5. Export the interface
    const indexFile = path.join(interfaceIndex, 'index.ts')
    console.log(`Updating ${indexFile}`)
    if (!dryRun) {
        fs.appendFileSync(indexFile, `export * from './lib/${resourceName.kebabCase}.interface'\n`)
    }

    if (dryRun) {
        console.log('Dry run complete. No filesystem changes made.')
    } else {
        console.log(
            `Generation complete. Please follow these steps:
- Update your app.module.ts file and import ${resourceName.pascalCase}Module.

- Implement the I${resourceName.pascalCase} interface in ${interfaceFile}.

- Implement the ${resourceName.pascalCase} entity

- Implement the Create${resourceName.pascalCase}Input

- Implement the Update${resourceName.pascalCase}Input

- Check the ${resourceName.pascalCase}Repository.
`,
        )
    }
}

////////////////////////////////////////////////////////
////////////////////// FUNCTIONS ///////////////////////

function walkDir(directory) {
    const filesInDirectory = fs.readdirSync(directory)
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file)
        if (fs.statSync(absolute).isDirectory()) {
            walkDir(absolute)
        } else {
            files.push(absolute)
        }
    }
}

function checkCasing(str: string) {
    const resourceName = {
        pascalCase: '', // PascalCase
        camelCase: '', // camelCase
        kebabCase: '', // kebab-case
    }
    if (str.includes('-')) {
        resourceName.pascalCase = toPascalCase(str)
        resourceName.camelCase = toCamelCase(str)
        resourceName.kebabCase = str
    } else if (str[0] === str[0].toUpperCase()) {
        resourceName.pascalCase = str
        resourceName.camelCase = toCamelCase(str)
        resourceName.kebabCase = toKebabCase(str)
    } else {
        resourceName.pascalCase = toPascalCase(str)
        resourceName.camelCase = str
        resourceName.kebabCase = toKebabCase(str)
    }
    return resourceName
}

function findDirParam() {
    const dirParam = process.argv.find((arg) => arg.startsWith('--dir='))
    if (dirParam) {
        return dirParam.split('=')[1]
    }
    return null
}

function writeHelp() {
    console.log(`
Usage:
  yarn run res <resource-name> [--dir=<dir>] [--force] [--dry-run]

Options:

  --dir=<dir>  The directory to generate the resource in. Defaults to the api/src/app directory.
  --force      Overwrite files if they already exist.
  --dry-run    Don't write anything to the filesystem.
`)
}

function toCamelCase(str: string) {
    if (str.includes('-')) str = toPascalCase(str)
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`
}

function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function toPascalCase(str: string) {
    return str
        .replace(/([a-zA-Z])-([a-zA-Z])/g, (str) => `${str[0]}${str[2].toUpperCase()}`)
        .replace(/^./, (str) => str.toUpperCase())
}

function prompt(query): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close()
            resolve(ans)
        }),
    )
}
