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
                    '0 0 24px 0 rgba(85, 35, 0, 0.9),0 10px 28px 0 rgba(85, 35, 0, 0.81)',
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
                        boxShadow:
                            'inset 0 0 16px rgba(72, 20, 0, 0.9),inset 0 -8px 24px rgba(72, 20, 0, 0.81)',
                    }}
                >
                    <AwardRow rowItems={row} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Award
