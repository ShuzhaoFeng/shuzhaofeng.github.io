import { GridProps } from '@mui/material'

export type GitHubProfileType = {
    login: string
    avatar_url: string
    html_url: string
}

export type GitHubProfileProps = GridProps & {
    username: string
}
