/**
 * Type declarations for react-syntax-highlighter
 * 解决 TS7016 错误：Could not find a declaration file for module
 */

declare module 'react-syntax-highlighter' {
    import { ComponentType } from 'react'

    export interface SyntaxHighlighterProps {
        language?: string
        style?: any
        customStyle?: React.CSSProperties
        codeTagProps?: React.HTMLProps<HTMLElement>
        useInlineStyles?: boolean
        showLineNumbers?: boolean
        showInlineLineNumbers?: boolean
        startingLineNumber?: number
        lineNumberContainerStyle?: React.CSSProperties
        lineNumberStyle?: React.CSSProperties | ((lineNumber: number) => React.CSSProperties)
        wrapLines?: boolean
        wrapLongLines?: boolean
        lineProps?:
            | React.HTMLProps<HTMLElement>
            | ((lineNumber: number) => React.HTMLProps<HTMLElement>)
        renderer?: (props: {
            rows: any[]
            stylesheet: any
            useInlineStyles: boolean
        }) => React.ReactNode
        PreTag?: string | ComponentType<any>
        CodeTag?: string | ComponentType<any>
        children: string | string[]
        [key: string]: any
    }

    export const Prism: ComponentType<SyntaxHighlighterProps>
    export const Light: ComponentType<SyntaxHighlighterProps>
    export default Light
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    export const oneDark: any
    export const oneLight: any
    export const prism: any
    export const dark: any
    export const funky: any
    export const okaidia: any
    export const twilight: any
    export const coy: any
    export const solarizedlight: any
    export const tomorrow: any
    export const duotoneDark: any
    export const duotoneLight: any
    export const base16AteliersulphurpoolLight: any
    export const cb: any
    export const ghcolors: any
    export const pojoaque: any
    export const xonokai: any
    export const atomDark: any
    export const coldarkCold: any
    export const coldarkDark: any
    export const coyWithoutShadows: any
    export const darcula: any
    export const dracula: any
    export const duotoneSea: any
    export const duotoneSpace: any
    export const hopscotch: any
    export const lucario: any
    export const materialDark: any
    export const materialLight: any
    export const materialOceanic: any
    export const nord: any
    export const synthwave84: any
    export const vs: any
    export const vscDarkPlus: any
    export const z80: any
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
    export const agate: any
    export const androidstudio: any
    export const arduinoLight: any
    export const arta: any
    export const ascetic: any
    export const atelierCaveLight: any
    export const atelierDuneLight: any
    export const atelierEstuaryLight: any
    export const atelierForestLight: any
    export const atelierHeathLight: any
    export const atelierLakesideLight: any
    export const atelierPlateauLight: any
    export const atelierSavannaLight: any
    export const atelierSeasideLight: any
    export const atelierSulphurpoolLight: any
    export const atomOneDarkReasonable: any
    export const atomOneDark: any
    export const atomOneLight: any
    export const brownPaper: any
    export const codepenEmbed: any
    export const colorBrewer: any
    export const darcula: any
    export const dark: any
    export const defaultStyle: any
    export const docco: any
    export const dracula: any
    export const far: any
    export const foundation: any
    export const githubGist: any
    export const github: any
    export const gml: any
    export const googlecode: any
    export const gradientDark: any
    export const grayscale: any
    export const gruvboxDark: any
    export const gruvboxLight: any
    export const hopscotch: any
    export const hybrid: any
    export const idea: any
    export const irBlack: any
    export const isblEditorDark: any
    export const isblEditorLight: any
    export const kimbieDark: any
    export const kimbieLight: any
    export const lightfair: any
    export const magula: any
    export const monoBlue: any
    export const monokaiSublime: any
    export const monokai: any
    export const nord: any
    export const obsidian: any
    export const ocean: any
    export const paraisoDark: any
    export const paraisoLight: any
    export const pojoaque: any
    export const purebasic: any
    export const qtcreatorDark: any
    export const qtcreatorLight: any
    export const railscasts: any
    export const rainbow: any
    export const routeros: any
    export const schoolBook: any
    export const shadesOfPurple: any
    export const solarizedDark: any
    export const solarizedLight: any
    export const sunburst: any
    export const tomorrowNightBlue: any
    export const tomorrowNightBright: any
    export const tomorrowNightEighties: any
    export const tomorrowNight: any
    export const tomorrow: any
    export const vs: any
    export const vs2015: any
    export const xcode: any
    export const xt256: any
    export const zenburn: any
}
