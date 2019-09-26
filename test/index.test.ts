import { PluginItem, transformSync } from '@babel/core'
import jsxSyntax from '@babel/plugin-syntax-jsx'
import styleProps from '../src'

const plugins = [jsxSyntax, styleProps]
const pluginsWithPropRemoval = [jsxSyntax, [styleProps, { stripProps: true }]]

const parseCode = (example: string, plug?: PluginItem[]) =>
  transformSync(example, { plugins: plug || plugins })!.code

describe('style prop parsing', () => {
  it('handles style props and places them in a new prop', () => {
    const example = `
      const Example = () => {
        return <div m='3rem' lineHeight={1.5} />
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })

  it('handles responsive style props', () => {
    const example = `
      const Example = () => {
        return <div m={['3rem', '4rem']} display='grid' pt={[null, '4rem', null, '6rem']} />
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })

  it('handles variable usage in style props', () => {
    const example = `
      const Example = ({ size }) => {
        const variable = '3rem'
        const myFunction = () => '4rem'
        
        return <div m={[variable, size, myFunction()]} />
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })

  it('handles expressions in style props', () => {
    const example = `
      const Example = ({ isTest }) => {
        return <div m={isTest ? '3rem' : '4rem'} />
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })

  it('handles style props on multiple elements', () => {
    const example = `
      const Example = () => {
        return (
          <div m='1rem'>
            <span p='2rem' />
          </div>
        )
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })

  it('strips style props if `shouldStrip` is set', () => {
    const example = `
      const Example = () => {
        return (
          <div
            p={['1rem', '2rem', '3rem', '4rem']}
          />
        )
      }
    `
    const code = parseCode(example, pluginsWithPropRemoval)

    expect(code).toMatchSnapshot()
  })

  it('does not strip non style props if `shouldStrip` is set', () => {
    const example = `
      const Example = () => {
        return (
          <div
            p={['1rem', '2rem', '3rem', '4rem']}
            shouldNotStrip={true}
          />
        )
      }
    `
    const code = parseCode(example, pluginsWithPropRemoval)

    expect(code).toMatchSnapshot()
  })

  it('merges parsed props with an existing __styleProps__ prop', () => {
    const example = `
      const Example = () => {
        return (
          <div
            p={['1rem', '2rem', '3rem', '4rem']}
            __styleProps__={[
              {
                margin: '1rem',
              },
              {},
              {
                margin: '3rem',
              },
              {
                margin: '4rem',
              }
            ]} 
          />
        )
      }
    `
    const code = parseCode(example)

    expect(code).toMatchSnapshot()
  })
})
