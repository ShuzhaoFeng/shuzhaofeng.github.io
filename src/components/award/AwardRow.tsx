import { Grid } from '@mui/material'
import { AwardRowProps } from './awardTypes'
import AwardItem from './AwardItem'

const AwardRow = (props: AwardRowProps) => {
    const { rowItems } = props
    return (
        <Grid container>
            {rowItems.map(
                (item) =>
                    item && (
                        <Grid className='row-item' item xs={12} md={4}>
                            <AwardItem item={item} />
                        </Grid>
                    )
            )}
        </Grid>
    )
}

export default AwardRow
