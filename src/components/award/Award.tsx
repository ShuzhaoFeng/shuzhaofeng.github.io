import { Grid } from '@mui/material'
import { AwardItem, AwardProps } from './awardTypes'
import AwardRow from './AwardRow'

import woodenPattern from '../../assets/wooden-pattern.jpg'
import woodenPatternDark from '../../assets/wooden-pattern-dark.jpg'

const Award = (props: AwardProps) => {
    const { items } = props
    const itemRows: AwardItem[][] = []

    items.forEach((item, index) => {
        index % 3 === 0
            ? itemRows.push([item])
            : itemRows[itemRows.length - 1].push(item)
    })

    return (
        <Grid
            className='award'
            container
            sx={{
                backgroundImage: `url(${woodenPatternDark})`,
                boxShadow:
                    '0 0 16px 0 rgba(0, 0, 0, 0.9),0 10px 24px 0 rgba(0, 0, 0, 0.81)',
            }}
        >
            {itemRows.map((row, index) => (
                <Grid
                    className='grid-row'
                    item
                    xs={12}
                    key={index}
                    sx={{
                        backgroundImage: `url(${woodenPattern})`,
                    }}
                >
                    <AwardRow rowItems={row} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Award
