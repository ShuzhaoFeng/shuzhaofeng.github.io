import { Palette, createTheme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
    interface Theme {
        typography:
            | TypographyOptions
            | ((palette: Palette) => TypographyOptions)
    }

    interface ThemeOptions {
        typography?:
            | TypographyOptions
            | ((palette: Palette) => TypographyOptions)
    }
}

const theme = createTheme({
    typography: {
        h3: {
            fontWeight: 600,
            paddingBottom: 20,
        },
        subtitle1: {
            fontSize: 18,
            fontWeight: 400,
            color: '#5e5e5e',
        },
    },
})

export default theme
