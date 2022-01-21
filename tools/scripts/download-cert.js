const http = require('http')
const https = require('https')
const fs = require('fs')
require('dotenv').config()

const download = function (url, dest, callback) {
    const file = fs.createWriteStream(dest)
    const driver = url.startsWith('https') ? https : http
    const request = driver
        .get(url, function (response) {
            response.pipe(file)
            file.on('finish', function () {
                file.close() // close() is async, call cb after close completes.
                callback(dest)
            })
        })
        .on('error', function (err) {
            // Handle errors
            // Delete the file async. (But we don't check the result)
            fs.unlink(dest, () => {
                if (callback) callback(err.message)
            })
        })
}

// Check if the env variable is set
if (!process.env.DATABASE_CERT) {
    console.log(
        'No certificate to download. If you use SSL to connect, Please set the DATABASE_CERT environment variable.',
    )
    process.exit(0)
}

// Check if the cert is already downloaded
if (fs.existsSync(process.env.DATABASE_CERT)) {
    console.log('Certificate already downloaded')
    process.exit(0)
}

// Download the cert
console.log('Certificate needs to be downloaded')
// Check if the cert download url is set
if (!process.env.CERT_DOWNLOAD) {
    console.error(
        'No certificate url to download. If you use SSL to connect, Please set the DATABASE_CERT_URL environment variable.',
    )
    process.exit(0)
}

// Download the cert
download(process.env.CERT_DOWNLOAD, process.env.DATABASE_CERT, function (err) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log('Certificate downloaded')
    process.exit(0)
})
