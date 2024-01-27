import { Palette, createTheme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
    interface Theme {
        typography:
            | TypographyOptions
            | ((palette: Palette) => TypographyOptions)
    }
    // allow configuration using `createTheme`
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
        },
    },
})

export default theme
