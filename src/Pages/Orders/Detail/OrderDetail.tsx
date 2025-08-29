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
    const [order, setOrder] = useState<OrdersType>({} as OrdersType)
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
                    {order?.user_full_name}
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
                    {formatDate(order?.created_at)}
                </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    رضایت نامه:
                </Typography>
                {/* <Stack direction={'row'} spacing={1}>
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
                </Stack> */}
            </Stack>
            <Stack
                direction={{
                    xs: 'column',
                    sm: order.payment_method ? 'row' : 'column',
                }}
                spacing={1}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    روش پرداخت:
                </Typography>
                <Stack direction={'row'} spacing={1}>
                    {order.payment_method && (
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {order.payment_method}
                        </Typography>
                    )}
                    {/* {order.payment_method.image && (
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
                    )} */}
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
