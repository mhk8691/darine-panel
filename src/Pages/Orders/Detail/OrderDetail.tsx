import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import {setUtil} from '../../../redux/UtilSlice'
import Payment from '../Edit/Payment'
import Products from '../Edit/Products'
import {enToPer, statusCalc} from '../List/OrdersList'

const RECOURCE = 'shop/orders'
// User info
interface User {
    id: number
    full_name: string
    phone_number: string
}

// Account details fields
interface AccountField {
    field_title: string
    value: string
}

// Account details
export interface AccountDetails {
    id: number
    account_title: string
    fields: AccountField[]
}

// Order item
export interface OrderItem {
    id: number
    product_name: string
    product_option_title: string
    price: number
    product_image_url: string
    account_details: AccountDetails
}

interface PaymentType {
    id: number
    payment_method_display: string
    status: 'pending' | 'confirmed' | 'failed'
    transaction_id: string
    ref_id: string
    receipt_image_url: string | null
    error: string
    created_at: string
}

export interface Order {
    id: number
    user: User
    status: 'pending' | 'processing' | 'completed' | 'canceled' | 'waiting_for_approval'
    status_display: string
    total_price: number
    created_at: string
    items: OrderItem[]
    payments: PaymentType[]
    reason: string | undefined
    authentication_video: string
}

export function OrderDetail() {
    const id = useParams().id
    const [isOpen, setIsOpen] = useState<number | null>(null)
    const [order, setOrder] = useState<Order>({
        id: 0,
        user: {id: 0, full_name: '', phone_number: ''},
        status: 'pending',
        status_display: '',
        total_price: 0,
        created_at: '',
        items: [],
        payments: [],
        reason: '',
        authentication_video: '',
    })
    const dispatch = useDispatch()

    useEffect(() => {
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<Order>(`${RECOURCE}/${id}/`)

                setOrder(response.data)
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        }
        getOrder()
    }, [id, dispatch])

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
                    نام کاربری:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order?.user.full_name}
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
                    شماره تلفن:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order?.user.phone_number}
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
                <Typography
                    variant="body1"
                    color={statusCalc(order?.status)}
                    sx={{
                        fontWeight: '400',
                        fontSize: '16px',
                    }}
                >
                    {enToPer(order?.status)}
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
                    دلیل لغو:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order?.reason}
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
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    قیمت نهایی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {formatPrice(order?.total_price)}
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
                    روش پرداخت:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {order.payments[0]?.payment_method_display}
                </Typography>
            </Stack>

            <Payment order={order} />

            <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    محصولات:
                </Typography>
                <Products order={order} isOpen={isOpen} setIsOpen={setIsOpen} />
            </Stack>
        </Stack>
    )
}
