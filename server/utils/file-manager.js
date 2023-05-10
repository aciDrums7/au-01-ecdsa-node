const fs = require('fs')

function readFile(path) {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (error) {
        throw new Error(error.message)
    }
}

function writeFile(path, data) {
    try {
        fs.writeFileSync(path, data, 'utf8')
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    readFile,
    writeFile,
}
