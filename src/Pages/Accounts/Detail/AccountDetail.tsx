import {Box, Grid, Stack, Typography} from '@mui/material'
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
        properties: [{id: 1, name: 'سطح اکانت', value: '300'}],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
        ],
        video: '',
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
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.id}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    نام محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.name}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    معرفی محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.introduction}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    دسته بندی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.category}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    نوع اتصال:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.connectionMethod}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    توضیحات:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.description}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    قیمت:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {account?.price}
                </Typography>
            </Stack>
            <Stack direction={'column'} spacing={1}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    تصاویر:
                </Typography>
                <Grid
                    container
                    spacing={{
                        xs: 0.5,
                        sm: 1.5,
                    }}
                >
                    {account?.images.map((item) => (
                        <Grid item xs={12 / 5} sm={12 / 7} md={12 / 8} lg={12 / 10} xl={12 / 13}>
                            <Box
                                component={'img'}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                                src={item}
                                borderRadius={2}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            {account?.video && (
                <Stack direction={'column'} spacing={1.5}>
                    <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                        ویدئو:
                    </Typography>
                    <Box
                        component={'video'}
                        src={typeof account?.video === 'string' ? account?.video : ''}
                        controls
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 2,
                            objectFit: 'cover',
                        }}
                    />
                </Stack>
            )}
        </Stack>
    )
}
