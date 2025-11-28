import {Stack, Typography} from '@mui/material'
import { AccountDetails } from '../Detail/OrderDetail'
interface Props {
    item: AccountDetails
}
export default function AccountDetail({item}: Props) {
    return (
        <Stack spacing={2} p={1}>
            {item.fields.map((field) => (
                <Stack direction="row" alignItems={'center'} spacing={0.5}>
                    <Typography variant="body1" sx={{fontWeight: '600'}}>
                        {field.field_title}:
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                        {field.value}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    )
}
