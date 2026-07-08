import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'
import { formatPrice } from '../../Core/FormatPrice'
import { OrderRecieve, OrderStatus } from '../Orders/Orders'



export type OrdersTransactionsType = {
                "id": number,
                "user_mobile": string,
                "type_display":string,
                "status_display": string,
                "type": "SELL" | 'BUY',
                "status": OrderStatus,
                "amount_gr": number,
                "price_per_gram": number,
                "fee": number,
                "profit": number,
                "total_amount": number,
                "tracking_code": string,
                "description": string,
                "created_at": string,
                "updated_at": string,
}


export function OrdersTransactions({
    order,
    setOrder,
}: {
    order: OrdersTransactionsType
    setOrder: React.Dispatch<React.SetStateAction<OrdersTransactionsType>>
}) {

    const safe = (v: any) => v ?? '—'

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setOrder((prev) => ({
            ...prev,
            status: event.target.value as OrderStatus,
        }))
    }


    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={order.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={safe(order.id)}
                />,
                <CustomTextField
                    key={order.id}
                    name="user_mobile"
                    disabled
                    label="شماره تلفن"
                    defaultValue={safe(order.user_mobile)}
                />,
                   <CustomTextField
                    key={order.id}
                    name="type_display"
                    disabled
                    label="نوع"
                    defaultValue={order.type_display}
                />,
                 <CustomTextField
                    key={order.id}
                    name="amount_gr"
                    disabled
                    label="وزن"
                    defaultValue={order?.amount_gr + ' گرم'}
                />,
                 <CustomTextField
                    key={order.id}
                    name="price_per_gram"
                    disabled
                    label="قیمت"
                    defaultValue={formatPrice(+order?.price_per_gram)}
                />,
                <CustomTextField
                    key={order.id}
                    name="fee"
                    disabled
                    label="کارمزد"
                    defaultValue={formatPrice(+order?.fee)}
                />,
                  <CustomTextField
                    key={order.id}
                    name="profit"
                    disabled
                    label="سود"
                    defaultValue={formatPrice(+order?.profit)}
                />,
                <CustomTextField
                    key={order.id}
                    name="total_amount"
                    disabled
                    label="قیمت نهایی"
                    defaultValue={formatPrice(+order?.total_amount)}
                />,
                <CustomTextField
                    key={order.id}
                    name="tracking_code"
                    disabled
                    label="کد پیگیری"
                    defaultValue={`${order?.tracking_code} گرم`}
                />,
        
                <CustomTextField
                    key={order.id}
                    name="description"
                    disabled
                    label="توضیحات"
                    defaultValue={safe(order?.description)}
                />,
           
         
                <CustomTextField
                    key={order.id}
                    name="created_at"
                    disabled
                    label="تاریخ سفارش"
                    defaultValue={formatDate(order.created_at)}
                />,
                
                <Grid item xs={12} key={order.id}>
              <FormControl fullWidth>
                        <InputLabel>وضعیت سفارش</InputLabel>
                        <Select
                            value={order.status ?? ''}
                            label="وضعیت سفارش"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="PENDING">در انتظار</MenuItem>
                            <MenuItem value="COMPLETED">تکمیل شده</MenuItem>
                            <MenuItem value="FAILED">ناموفق</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>,
          
            ].filter(Boolean),
        [order]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
        </Stack>
    )
}