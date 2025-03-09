import {
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {OrdersType} from '../Orders'
import {formatDate} from '../../../Core/FormatDate'
import {BaseModal} from '../../../Components/Modal/BaseModal'
import AccountDetail from './AccountDetail'

const RECOURCE = 'orders'

export function OrderDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState<number | null>(null)
    const [order, setOrder] = useState<OrdersType | null>({
        id: 1,
        status: 'در انتظار',
        username: 'test',
        createdAt: '2021-09-01',
        products: [
            {
                account: {
                    email: 'test@gmail.com',
                    username: 'test',
                    password: '123',
                    method: 'facebook',
                },
                id: 1,
                count: 3,
                name: 'محصول ۱',
                price: 1000,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
            {
                account: {
                    email: 'test@gmail.com',
                    username: 'test',
                    password: '123',
                    method: 'facebook',
                },
                id: 2,
                count: 2,
                name: 'محصول ۲',
                price: 2000,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
        ],
    })
    const getOrder = async () => {
        setLoading(true)
        let response = await DataProvider.get<OrdersType>(`${RECOURCE}/${id}/`)
        if (response) {
            setOrder(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات سفارش
            </Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {order?.id}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    وضعیت سفارش:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {order?.status}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام کاربری:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {order?.username}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    تاریخ سفارش:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {formatDate(order?.createdAt)}
                </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    محصولات:
                </Typography>
                <Grid container spacing={2}>
                    {order?.products.map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Stack p={2} pb={0}>
                                    <Badge badgeContent={`${item.count}x`} color="primary">
                                        <Box
                                            component={'img'}
                                            sx={{height: '100%', width: '100%'}}
                                            src={item.image}
                                            borderRadius={2}
                                        />
                                    </Badge>
                                </Stack>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: '400', fontSize: '16px !important'}}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: '400', fontSize: '14px !important'}}
                                        color={'primary'}
                                    >
                                        {item.price} تومان
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        sx={{fontSize: '12px !important'}}
                                        onClick={() => setIsOpen(item.id)}
                                    >
                                        نمایش بیشتر
                                    </Button>
                                </CardActions>
                            </Card>
                            <BaseModal
                                open={Boolean(isOpen === item.id)}
                                setOpen={setIsOpen}
                                title="مشخصات اکانت"
                                style={{maxWidth: 700}}
                            >
                                <AccountDetail item={item}/>
                            </BaseModal>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    )
}
