import { promises } from 'fs'

export async function readFile(path) {
    return JSON.parse(await promises.readFile(path, 'utf-8'))
}

export async function writeFile(path, data) {
    return await promises.writeFile(path, data, 'utf-8')
}
