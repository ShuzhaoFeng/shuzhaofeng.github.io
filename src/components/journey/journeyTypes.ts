export type JourneyItem = {
    title: string
    cardTitle: string
    cardDetailedText: string
    media?: {
        name: string
        source: {
            url: string
        }
        type: string
    }
}

export type JourneyProps = {
    items: JourneyItem[]
}
