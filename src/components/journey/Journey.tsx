import { JourneyProps } from './journeyTypes'
import { Chrono } from 'react-chrono'

const Journey = (props: JourneyProps) => {
    const { items } = props

    return (
        <Chrono
            items={items}
            mode='VERTICAL_ALTERNATING'
            disableToolbar={true}
            allowDynamicUpdate={true}
        />
    )
}

export default Journey
