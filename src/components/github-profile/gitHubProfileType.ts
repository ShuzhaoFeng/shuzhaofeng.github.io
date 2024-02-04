import { GridProps } from '@mui/material'

export type GitHubProfileType = {
    username: string
}

export type GitHubProfileProps = GridProps & {
    username: string
}
