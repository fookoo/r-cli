import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { camelCaseToArr } from "../helper.js";

const component = (name = 'FooBar', filename = 'foo-bar') => `import React from 'react'

import { ${name}Styled }  from './${filename}.style'

interface I${name}Props {

}

export const ${name}: React.FC<I${name}Props> = ({}) => {
  return (
   <${name}Styled>${name}</${name}Styled>
  )
}
`

const style = (name = 'FooBar') => `import styled from '@emotion/styled'

export const ${name}Styled = styled.div\`\`
`

const test = (name = 'FooBar') => `import { render } from '@testing-library/react'

describe('${name}', () => {
    it('should render', () => {
        const { baseElement } = render(<${name} />)
        
        expect(baseElement).not.toBeEmptyDOMElement()
    })
})
`



export const generateComponent = (name = 'FooBar', force = false) => {
    const dashName = camelCaseToArr(name).join('-')

    if (!existsSync('components')) {
        mkdirSync('components')
    }

    if (!existsSync(`components/${dashName}`)) {
        mkdirSync(`components/${dashName}`)
    }

    const componentFn = `components/${dashName}/${dashName}.component.tsx`
    const componentStyleFn = `components/${dashName}/${dashName}.style.ts`
    const componentTestFn = `components/${dashName}/${dashName}.test.tsx`

    if (!existsSync(componentFn) || force) {
        writeFileSync(componentFn, component(name, dashName), {
            encoding: 'utf8'
        })
    }

    if (!existsSync(componentStyleFn) || force) {
        writeFileSync(componentStyleFn, style(name), {
            encoding: 'utf8'
        })
    }
    if (!existsSync(componentTestFn) || force) {
        writeFileSync(componentTestFn, test(name), {
            encoding: 'utf8'
        })
    }
}
