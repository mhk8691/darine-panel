import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {AccountsType} from '../Accounts'

const RECOURCE = 'account'

export function AccountDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [account, setAccount] = useState<AccountsType | null>({
        id: 1,
        name: 'ali',
        introduction: 'mmdi',
        connectionMethod: 'ali',
        description: 'ali@gmail.com',
        price: 300000,
        category: 'clash of clans',
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s'],
    })
    const getAccount = async () => {
        setLoading(true)
        let response = await DataProvider.get<AccountsType>(`${RECOURCE}/${id}/`)
        if (response) {
            setAccount(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getAccount()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات اکانت
            </Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.id}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.name}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    معرفی محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.introduction}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    دسته بندی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.category}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نوع اتصال:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.connectionMethod}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    توضیحات:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.description}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    قیمت:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {account?.price}
                </Typography>
            </Stack>
        </Stack>
    )
}
