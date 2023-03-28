import { camelCaseToArr } from "../helper.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const service = (name = 'FooBar') => `export class ${name}Service {

}
`

export const generateService = (name = 'FooBar', force = false) => {
    const dashName = camelCaseToArr(name).join('-')

    if (!existsSync('services')) {
        mkdirSync('services')
    }

    if (!existsSync(`services/${dashName}`)) {
        mkdirSync(`services/${dashName}`)
    }

    const componentFn = `services/${dashName}/${dashName}.service.ts`

    if (!existsSync(componentFn) || force) {
        writeFileSync(componentFn, service(name), {
            encoding: 'utf8'
        })
    }

}
