import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {OrdersType} from '../Orders'
import { formatDate } from '../../../Core/FormatDate'

const RECOURCE = 'orders'

export function OrderDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState<OrdersType | null>({
        id: 1,
        status: 'در انتظار',
        username: 'test',
        createdAt: '2021-09-01',
        products: [
            {
                name: 'product1',
                price: 1000,
                image: 'https://via.placeholder.com/150',
            },
            {
                name: 'product2',
                price: 2000,
                image: 'https://via.placeholder.com/150',
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
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    محصولات:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {order?.products[0].name}
                </Typography>
            </Stack>
        </Stack>
    )
}
