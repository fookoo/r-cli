import { camelCaseToArr } from "../helper.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const page = (name = 'FooBar', filename = 'foo-bar') => `import React from 'react'

import { ${name}PageStyled }  from './${filename}.style'

const ${name}Page: React.FC = () => {
    return (
        <${name}PageStyled>${name}</${name}PageStyled>
    )
}

export default ${name}Page
`

const style = (name = 'FooBar') => `import styled from '@emotion/styled'

export const ${name}PageStyled = styled.div\`\`
`

export const generatePage = (name = 'FooBar', force = false) => {
    const dashName = camelCaseToArr(name).join('-')

    if (!existsSync('pages')) {
        mkdirSync('pages')
    }

    if (!existsSync(`pages/${dashName}`)) {
        mkdirSync(`pages/${dashName}`)
    }

    const componentFn = `pages/${dashName}/${dashName}.page.tsx`
    const componentStyleFn = `pages/${dashName}/${dashName}.style.ts`

    if (!existsSync(componentFn) || force) {
        writeFileSync(componentFn, page(name, dashName), {
            encoding: 'utf8'
        })
    }

    if (!existsSync(componentStyleFn) || force) {
        writeFileSync(componentStyleFn, style(name), {
            encoding: 'utf8'
        })
    }
}
