import {Stack, Typography} from '@mui/material'
import React from 'react'
import {OrdersType, ProductsType} from '../Orders'
interface Props {
    item: ProductsType
}
export default function AccountDetail({item}: Props) {
    return (
        <Stack spacing={2} p={2}>
            <Stack direction="row" alignItems={'center'} spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام کاربری:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {item.account.username}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    ایمیل:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {item.account.email}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    رمز عبور:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {item.account.password}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    روش اتصال:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {item.account.method}
                </Typography>
            </Stack>
        </Stack>
    )
}
