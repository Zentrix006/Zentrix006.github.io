import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'dist')
const publicAssets = join(root, 'assets')

await mkdir(publicAssets, { recursive: true })
await copyFile(join(output, 'dev.html'), join(output, 'index.html'))
await copyFile(join(output, 'dev.html'), join(root, 'index.html'))

for (const asset of await readdir(join(output, 'assets'))) {
  await copyFile(join(output, 'assets', asset), join(publicAssets, asset))
}
