import fs from 'fs/promises'
import { Pill } from '@payloadcms/ui'

export async function VersionInfo() {
  const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'))
  return (
    <div className="tw:mx-auto tw:mb-8">
      <Pill pillStyle="light-gray" rounded>
        v{packageJson.version}
      </Pill>
    </div>
  )
}
