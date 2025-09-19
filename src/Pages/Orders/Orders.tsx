import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import {GridProducer} from '../../Components/Table/GridProducer'
import {useEffect, useState} from 'react'

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
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled'
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
    reason: string | undefined
}

export function Orders({
    order,
    setOrder,
}: {
    order: OrdersType
    setOrder: React.Dispatch<React.SetStateAction<OrdersType>>
}) {
    const [isCanceled, setIsCanceled] = useState(false)
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
            }
            else {
                setIsCanceled(false)
                return {
                    ...prev,
                    reason: undefined,
                }
            }
            
        })
    }, [order, setOrder])
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
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
        </Stack>
    )
}
