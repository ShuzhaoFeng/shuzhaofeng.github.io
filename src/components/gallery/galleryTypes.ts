import { GridProps } from '@mui/material'

export type GalleryItem = {
    title: string
    desc: string
    image: string
    color: string
    url?: string
}

export type GalleryProps = GridProps & {
    name: string
    items: GalleryItem[]
}
