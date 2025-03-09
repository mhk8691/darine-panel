import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

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
export type OrdersType = {
    id: number
    status: 'در انتظار' | 'انجام شده' | 'لغو شده'
    username: string
    createdAt: string
    products: ProductsType[]
}

export function Orders({
    order,
    setOrder,
}: {
    order: OrdersType
    setOrder: React.Dispatch<React.SetStateAction<OrdersType>>
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomAutocomplete
                        options={[
                            {label: 'در انتظار', id: 'pending'},
                            {label: 'انجام شده', id: 'done'},
                            {label: 'لغو شده', id: 'canceled'},
                        ]}
                        name="status"
                        setData={setOrder}
                        defaultValue={order.status}
                        label={'وضعیت سفارش'}
                    />,
                ]}
            />
        </Stack>
    )
}
