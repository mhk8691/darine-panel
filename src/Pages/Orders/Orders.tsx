import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {formatDate} from '../../Core/FormatDate'
import {formatPrice} from '../../Core/FormatPrice'
import {Order} from './Detail/OrderDetail'
import Payment from './Edit/Payment'
import Products from './Edit/Products'

type AccountType = {
    method: string
    email: string
    password: string
    username: string
}
export type ProductsType = {
    id: number
    name: string
    price: number
    image: string
    count: number
    account: AccountType
}
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled' | 'waiting_for_approval'
export type OrdersType = {
    id: number
    user_full_name: string
    user_phone: string
    status: OrderStatus
    status_display: string
    product_names: string
    total_price: number
    payment_method: 'Bank Transfer' | 'Online'
    created_at: string
    reason?: string
}

export function Orders({
    order,
    setOrder,
}: {
    order: Order
    setOrder: React.Dispatch<React.SetStateAction<Order>>
}) {
    const [isCanceled, setIsCanceled] = useState(false)
    const [isOpen, setIsOpen] = useState<number | null>(null)
    const handleChangeProductType = (event: SelectChangeEvent) => {
        setOrder((prev) => {
            return {...prev, status: event.target.value as OrderStatus}
        })
    }
    const handleChangeReason = (event: SelectChangeEvent) => {
        setOrder((prev) => {
            return {...prev, reason: event.target.value}
        })
    }
    useEffect(() => {
        setOrder((prev) => {
            if (prev.status === 'canceled') {
                setIsCanceled(true)
                return prev
            } else {
                setIsCanceled(false)
                const {reason, ...rest} = prev
                return rest as Order
            }
        })
    }, [order, setOrder])

    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        key={order.id}
                        name="id"
                        disabled
                        label={'آیدی'}
                        defaultValue={order.id}
                    />,
                    <CustomTextField
                        key={order.id}
                        name="user_full_name"
                        disabled
                        label={'نام کاربر'}
                        defaultValue={order.user?.full_name}
                    />,
                    <CustomTextField
                        key={order.id}
                        name="user_phone"
                        disabled
                        label={'شماره تلفن'}
                        defaultValue={order.user?.phone_number}
                    />,
                    <CustomTextField
                        key={order.id}
                        name="created_at"
                        disabled
                        label={'تاریخ سفارش'}
                        defaultValue={formatDate(order.created_at)}
                    />,
                    <CustomTextField
                        key={order.id}
                        name="total_price"
                        disabled
                        label={'قیمت نهایی'}
                        defaultValue={formatPrice(order.total_price)}
                    />,
                    order.payments && (
                        <CustomTextField
                            key={order.id}
                            name="user_full_name"
                            disabled
                            label={'روش پرداخت'}
                            defaultValue={
                                order?.payments[0]?.payment_method_display === 'Bank Transfer'
                                    ? 'کارت به کارت'
                                    : order?.payments[0]?.payment_method_display === 'Online'
                                    ? 'آنلاین'
                                    : 'نامشخص'
                            }
                        />
                    ),

                    <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '54.56px !important',
                                },
                                '& .MuiSelect-select': {
                                    fontSize: '15px !important',
                                },
                                '& .Mui-disabled': {
                                    color: '#3f3f3f !important',
                                },
                            }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                    fontSize: '15px !important',
                                }}
                            >
                                وضعیت سفارش
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order.status ?? ''}
                                label="وضعیت سفارش"
                                onChange={handleChangeProductType}
                                sx={{
                                    '& .MuiAutocomplete-listbox': {
                                        fontSize: '15px',
                                    },
                                    '& .MuiAutocomplete-option': {
                                        py: '12px !important',
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'waiting_for_approval'}
                                >
                                    در انتظار تایید
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'pending'}
                                >
                                    در انتظار
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'processing'}
                                >
                                    در حال پردازش
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'canceled'}
                                >
                                    لغو شده
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'completed'}
                                >
                                    تکمیل شده
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>,
                    isCanceled && (
                        <Grid item xs={12}>
                            <FormControl
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '54.56px !important',
                                    },
                                    '& .MuiSelect-select': {
                                        fontSize: '15px !important',
                                    },
                                    '& .Mui-disabled': {
                                        color: '#3f3f3f !important',
                                    },
                                }}
                            >
                                <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                >
                                    دلیل لغو
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={order.reason ?? ''}
                                    label="دلیل لغو"
                                    onChange={handleChangeReason}
                                    sx={{
                                        '& .MuiAutocomplete-listbox': {
                                            fontSize: '15px',
                                        },
                                        '& .MuiAutocomplete-option': {
                                            py: '12px !important',
                                        },
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            fontSize: '15px !important',
                                        }}
                                        value={'عدم وجود آفر مورد نظر در حساب شما'}
                                    >
                                        عدم وجود آفر مورد نظر در حساب شما
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            fontSize: '15px !important',
                                        }}
                                        value={'اشتباه بودن مشخصات حساب شما'}
                                    >
                                        اشتباه بودن مشخصات حساب شما
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ),
                ]}
            />
            <Payment order={order} />

            {order.authentication_video && (
                <Stack direction="column" spacing={1} sx={{mt: 2}}>
                    <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                        احراز هویت:{' '}
                    </Typography>
                    <video
                        controls
                        src={order.authentication_video}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            borderRadius: '12px',
                        }}
                    ></video>
                </Stack>
            )}
            <Stack direction="column" spacing={0.5} sx={{mt: 2}}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    محصولات:{' '}
                    <Typography variant="body2" sx={{fontSize: '14px', color: 'text.secondary'}}>
                        {order?.items?.length === 0 && 'هیچ محصولی ثبت نشده است'}
                    </Typography>
                </Typography>
                <Products key={order.id} order={order} isOpen={isOpen} setIsOpen={setIsOpen} />
            </Stack>
        </Stack>
    )
}
