import { TypeBackground } from '@material-ui/core/styles/createPalette'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import BoxProps from '@material-ui/core/Box/Box'

declare module "@material-ui/core/styles/createPalette" {
    export interface TypeBackground {
        dark?:"default" | "dark" | undefined
    }
}

declare module "@material-ui/core/styles/createMuiTheme" {
    export interface Theme {
        name?:string
    }
}

declare module '@material-ui/core/Box/Box' {
    export interface  BoxProps {
        ref?:any
    }
}