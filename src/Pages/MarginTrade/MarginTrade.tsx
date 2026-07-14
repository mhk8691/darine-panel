import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { useMemo } from 'react'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'
import { formatPrice } from '../../Core/FormatPrice'
import { OrderStatus } from '../Orders/Orders'

export type MarginTradeType = {
  id: number
  user_mobile: string
  user_full_name: string
  order_type_display: string
  status: 'ACTIVE' | 'CLOSED'
  status_display: string
  weight: string
  leverage_display: string
  entry_price: string
  target_price: string
  take_profit: string
  stop_loss: string
  close_price: string
  profit_loss: string
  initial_fee: string
  daily_fee: string
  total_fee: string
  current_price: number
  current_profit_loss: number
  created_at: string
  closed_at: string
}

export function MarginTrade({
  order,
  setOrder,
}: {
  order: MarginTradeType
  setOrder: React.Dispatch<React.SetStateAction<MarginTradeType>>
}) {
  const safe = (v: any) => (v ?? '') === '' ? '—' : v

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setOrder((prev) => ({
      ...prev,
      status: event.target.value as 'ACTIVE' | 'CLOSED',
    }))
  }

  const data = useMemo(
    () => [
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
        label="نام کاربر"
        defaultValue={safe(order.user_full_name)}
      />,

      <CustomTextField
        key={order.id}
        name="user_mobile"
        disabled
        label="شماره موبایل"
        defaultValue={safe(order.user_mobile)}
      />,

      <CustomTextField
        key={order.id}
        name="order_type_display"
        disabled
        label="نوع سفارش"
        defaultValue={safe(order.order_type_display)}
      />,

      <CustomTextField
        key={order.id}
        name="weight"
        disabled
        label="وزن"
        defaultValue={`${safe(order.weight)} گرم`}
      />,

      <CustomTextField
        key={order.id}
        name="leverage_display"
        disabled
        label="اهرم"
        defaultValue={safe(order.leverage_display)}
      />,

      <CustomTextField
        key={order.id}
        name="entry_price"
        disabled
        label="قیمت ورود"
        defaultValue={formatPrice(Number(order.entry_price))}
      />,

      <CustomTextField
        key={order.id}
        name="target_price"
        disabled
        label="قیمت هدف"
        defaultValue={
          order.target_price
            ? formatPrice(Number(order.target_price))
            : '—'
        }
      />,

      <CustomTextField
        key={order.id}
        name="take_profit"
        disabled
        label="حد سود"
        defaultValue={
          order.take_profit
            ? formatPrice(Number(order.take_profit))
            : '—'
        }
      />,

      <CustomTextField
        key={order.id}
        name="stop_loss"
        disabled
        label="حد ضرر"
        defaultValue={
          order.stop_loss
            ? formatPrice(Number(order.stop_loss))
            : '—'
        }
      />,

      <CustomTextField
        key={order.id}
        name="close_price"
        disabled
        label="قیمت بسته شدن"
        defaultValue={
          order.close_price
            ? formatPrice(Number(order.close_price))
            : '—'
        }
      />,

      <CustomTextField
        key={order.id}
        name="current_price"
        disabled
        label="قیمت فعلی"
        defaultValue={formatPrice(order.current_price || 0)}
      />,

      <CustomTextField
        key={order.id}
        name="profit_loss"
        disabled
        label="سود / زیان نهایی"
        defaultValue={formatPrice(Number(order.profit_loss || 0))}
      />,

      <CustomTextField
        key={order.id}
        name="current_profit_loss"
        disabled
        label="سود / زیان لحظه‌ای"
        defaultValue={formatPrice(order.current_profit_loss)}
      />,

      <CustomTextField
        key={order.id}
        name="initial_fee"
        disabled
        label="کارمزد اولیه"
        defaultValue={formatPrice(Number(order.initial_fee))}
      />,

      <CustomTextField
        key={order.id}
        name="daily_fee"
        disabled
        label="کارمزد روزانه"
        defaultValue={formatPrice(Number(order.daily_fee))}
      />,

      <CustomTextField
        key={order.id}
        name="total_fee"
        disabled
        label="کارمزد کل"
        defaultValue={formatPrice(Number(order.total_fee))}
      />,

      <CustomTextField
        key={order.id}
        name="created_at"
        disabled
        label="تاریخ ایجاد"
        defaultValue={formatDate(order.created_at)}
      />,

      <CustomTextField
        key={order.id}
        name="closed_at"
        disabled
        label="تاریخ بسته شدن"
        defaultValue={
          order.closed_at ? formatDate(order.closed_at) : '—'
        }
      />,

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>وضعیت سفارش</InputLabel>

          <Select
            value={order.status ?? ''}
            label="وضعیت سفارش"
            onChange={handleChangeStatus}
          >
            <MenuItem value="ACTIVE">فعال</MenuItem>
            <MenuItem value="CLOSED">بسته شده</MenuItem>
          </Select>
        </FormControl>
      </Grid>,
    ],
    [order]
  )

  return (
    <Stack>
      <GridProducer sx={{ mb: 2 }} data={data} />
    </Stack>
  )
}