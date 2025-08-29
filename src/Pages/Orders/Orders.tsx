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
    payment_method: 'bank_transfer' | 'online'
    created_at: string
}

export function Orders({
    order,
    setOrder,
}: {
    order: OrdersType
    setOrder: React.Dispatch<React.SetStateAction<OrdersType>>
}) {
    const handleChangeProductType = (event: SelectChangeEvent) => {
        setOrder((prev) => {
            return {...prev, status: event.target.value as OrderStatus}
        })
    }
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
                ]}
            />
        </Stack>
    )
}
