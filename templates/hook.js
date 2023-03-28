import { camelCaseToArr } from "../helper.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export const hook = (name = 'FooBar') => `interface Use${name}Response {

}

export const use${name} = (): Use${name}Response => {
    return {
        
    }
}
`

export const test = (name = 'FooBar', dashName = 'foo-bar') => `import React from 'react'
import { render } from '@testing-library/react'

import { use${name} } from './${dashName}.hook'

interface ExampleProps {
  
}

const Example = ({  }: ExampleProps) => {
  const {} = use${name}()

  return (<div></div>)
}

describe('use${name}', () => {
  it('should render', () => {
    const { baseElement } = render(<Example />)

    expect(baseElement).not.toBeEmptyDOMElement()
  })
})
`

export const generateHook = (name = 'FooBar', force = false) => {
    const dashName = camelCaseToArr(name).join('-')

    if (!existsSync('hooks')) {
        mkdirSync('hooks')
    }

    if (!existsSync(`hooks/use-${dashName}`)) {
        mkdirSync(`hooks/use-${dashName}`)
    }

    const hookFn = `hooks/use-${dashName}/use-${dashName}.hook.tsx`
    const hookTestFn = `hooks/use-${dashName}/use-${dashName}.test.tsx`

    if (!existsSync(hookFn) || force) {
        writeFileSync(hookFn, hook(name), {
            encoding: 'utf8'
        })
    }

    if (!existsSync(hookTestFn) || force) {
        writeFileSync(hookTestFn, test(name, `use-${dashName}`), {
            encoding: 'utf8'
        })
    }
}
