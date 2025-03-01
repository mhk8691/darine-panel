import {Stack, Typography} from '@mui/material'
import blankImage from '../../Images/blankList.png'

export function BlankList(props) {
    return (
        <Stack alignItems={'center'} marginTop="40px">
            <img src={blankImage} width="250px" height="250px" />
            <Typography color="GrayText" marginTop={'10px'}>
                لیست خالی !
            </Typography>
        </Stack>
    )
}
