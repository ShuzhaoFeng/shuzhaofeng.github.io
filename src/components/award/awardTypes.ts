export type AwardItem = {
    title: string
    date: string
    description: string
    media?: unknown
}

export type AwardProps = {
    items: AwardItem[]
}

export type AwardRowProps = {
    rowItems: AwardItem[]
}

export type AwardItemProps = {
    item: AwardItem
}
