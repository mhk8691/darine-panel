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
import { useEffect, useMemo, useState } from 'react'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'
import { formatPrice } from '../../Core/FormatPrice'
import Products from './Edit/Products'

export type OrderStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'

export type OrderItem = {
  id: number
  product_name: string
  quantity: number
  price_at_time: string
  weight_at_time: string
  order: number
  product: number
}

export type OrdersType = {
  id: number
  user_mobile: string
  user: number

  items: OrderItem[]

  province: string
  city: string
  address: string
  postal_code: string
  plaque: string
  unit: string

  payment_method: 'GOLD' | 'CASH' | string
  delivery_type: 'HOME' | 'PICKUP' | string

  status: OrderStatus
admin_note:string
  total_gold_amount: string
  total_toman_amount: string

  tracking_code: string
  description: string | null

  created_at: string
  updated_at: string

  authentication_video?: string
  reason?: string
  bank_receipt?: string
}

export function Orders({
    order,
    setOrder,
}: {
    order: OrdersType
    setOrder: React.Dispatch<React.SetStateAction<OrdersType>>
}) {
    const [isCanceled, setIsCanceled] = useState(false)
    const [isOpen, setIsOpen] = useState<number | null>(null)

    const safe = (v: any) => v ?? '—'

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setOrder((prev) => ({
            ...prev,
            status: event.target.value as OrderStatus,
        }))
    }

    const handleChangeReason = (event: SelectChangeEvent) => {
        setOrder((prev) => ({
            ...prev,
            reason: event.target.value,
        }))
    }

    useEffect(() => {
        setIsCanceled(order.status === 'FAILED')
    }, [order.status])

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
                    name="user_full_name"
                    disabled
                    label="شماره تلفن"
                    defaultValue={safe(order.user_mobile)}
                />,
                <CustomTextField
                    key={order.id}
                    name="created_at"
                    disabled
                    label="تاریخ سفارش"
                    defaultValue={formatDate(order.created_at)}
                />,
                <CustomTextField
                    key={order.id}
                    name="total_price"
                    disabled
                    label="قیمت نهایی"
                    defaultValue={formatPrice(+order?.total_toman_amount)}
                />,
                <CustomTextField
                    key={order.id}
                    name="total_price"
                    disabled
                    label="طلا"
                    defaultValue={`${order?.total_gold_amount} گرم`}
                />,
                <CustomTextField
                    key={order.id}
                    name="address_summary"
                    disabled
                    label="آدرس"
                    defaultValue={`${order?.province} - ${order?.city} - ${order?.address} - پلاک ${order?.plaque} - واحد ${order?.unit}`}
                />,
                <CustomTextField
                    key={order.id}
                    name="payment_method"
                    disabled
                    label="روش پرداخت"
                    defaultValue={order?.payment_method}
                />,
                <CustomTextField
                    key={order.id}
                    name="delivery_type"
                    disabled
                    label="روش ارسال"
                    defaultValue={order?.delivery_type}
                />,
                <CustomTextField
                    key={order.id}
                    name="tracking_code"
                    disabled
                    label="کد رهگیری"
                    defaultValue={order?.tracking_code}
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
                            <MenuItem value="CANCELED">در حال آماده سازی</MenuItem>
                            <MenuItem value="CANCELED">در حال تحویل</MenuItem>
                            <MenuItem value="COMPLETED">تکمیل شده</MenuItem>
                            <MenuItem value="CANCELED">لغو شده</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>,
                 <CustomTextField
                        name="admin_note"
                        label="یادداشت ادمین"
                        value={order.admin_note ?? ''}
                        multiline
                        rows={3}
                        fullWidth
                        onChange={(e) =>
                            setOrder((prev) => ({
                                ...prev,
                                admin_note: e.target.value,
                            }))
                        }
                    />
            ].filter(Boolean),
        [order, isCanceled]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />

            {order.authentication_video && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        احراز هویت:
                    </Typography>

                    <video
                        controls
                        src={order.authentication_video}
                        style={{
                            width: '100%',
                            maxHeight: 400,
                            borderRadius: 12,
                        }}
                    />
                </Stack>
            )}

            {order.bank_receipt && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        رسید بانکی:
                    </Typography>

                    <img
                        src={order.bank_receipt}
                        alt="رسید بانکی"
                        style={{
                            width: '100%',
                            maxHeight: 400,
                            borderRadius: 12,
                            objectFit: 'contain',
                        }}
                    />
                </Stack>
            )}

            {
                order?.items?.length>0 && (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                <Typography fontWeight={600} fontSize={17}>
                    محصولات:
                </Typography>

                {order?.items?.length ? (
                    <Products
                        order={order}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                ) : (
                    <Typography fontSize={14} color="text.secondary">
                        هیچ محصولی ثبت نشده است
                    </Typography>
                )}
            </Stack>
                )
            }
        </Stack>
    )
}
