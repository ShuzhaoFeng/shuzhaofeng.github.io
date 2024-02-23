import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from '@mui/lab'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { JourneyProps } from './journeyTypes'

const Journey = (props: JourneyProps) => {
    const { items } = props

    const focusedPosition = useSelector(
        (state: RootState) => state.journey.focusedPosition
    )

    console.log(focusedPosition)

    return (
        <Timeline {...props}>
            {items.map((_item, index) => (
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index !== items.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{_item.title}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    )
}

export default Journey
