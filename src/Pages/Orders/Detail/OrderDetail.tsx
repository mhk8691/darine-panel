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
import Products from './Products'

const RECOURCE = 'orders'

export function OrderDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState<number | null>(null)
    const [order, setOrder] = useState<OrdersType>({
        id: 1,
        status: 'در انتظار',
        username: 'test',
        Consent: [
            'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
            'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
        ],
        Payment_method: {
            title: null,
            image: 'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
        },
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
                    {order?.id}
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
                    وضعیت سفارش:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order?.status}
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
                    نام کاربری:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order?.username}
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
                    تاریخ سفارش:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {formatDate(order?.createdAt)}
                </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    رضایت نامه:
                </Typography>
                <Stack direction={'row'} spacing={1}>
                    {order.Consent.map((item) => (
                        <Box
                            component={'img'}
                            sx={{
                                width: '75px',
                                height: '75px',
                                borderRadius: 2,
                                objectFit: 'cover',
                            }}
                            src={item}
                            borderRadius={2}
                        />
                    ))}
                </Stack>
            </Stack>
            <Stack
                direction={{
                    xs: 'column',
                    sm: order.Payment_method.title ? 'row' : 'column',
                }}
                spacing={1}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    روش پرداخت:
                </Typography>
                <Stack direction={'row'} spacing={1}>
                    {order.Payment_method.title && (
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {order.Payment_method.title}
                        </Typography>
                    )}
                    {order.Payment_method.image && (
                        <Box
                            component={'img'}
                            sx={{
                                width: '75px',
                                height: '75px',
                                borderRadius: 2,
                                objectFit: 'cover',
                            }}
                            src={order.Payment_method.image}
                            borderRadius={2}
                        />
                    )}
                </Stack>
            </Stack>
            <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    محصولات:
                </Typography>
                <Products order={order} isOpen={isOpen} setIsOpen={setIsOpen} />
            </Stack>
        </Stack>
    )
}
