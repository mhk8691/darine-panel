import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
      Box,
  Card,
  CardContent,
  Divider,
  Typography,
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
                target_price?:number
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
                     "referral_info": {
            "referrer_mobile": string,
            "referrer_code": string,
            "referrer_name": string,
            "referral_percent": number,
            "referral_commission_amount": number,
            "referral_profit": number,
            "referral_net_commission": number,
        }
}


const ReferralItem = ({
  title,
  value,
  highlight = false,
  
}: {
  title: string;
  value: React.ReactNode;
  highlight?: boolean;
  
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      py: 1.2,
      borderBottom: "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>

    <Typography
      variant="body2"
      fontWeight={highlight ? 700 : 500}
      color={highlight ? "success.main" : "text.primary"}
    >
      {value || "—"}
    </Typography>
  </Stack>
);

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
                order.target_price && <CustomTextField
                    key={order.id}
                    name="target_price"
                    disabled
                    label="قیمت هدف"
                    defaultValue={formatPrice(+order?.target_price)}
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
                    defaultValue={formatPrice(+order?.profit || 0)}
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
  <Stack spacing={3}>
    <GridProducer sx={{ mb: 2 }} data={data} />

    {order.referral_info && (
      <Stack spacing={2} sx={{ mt: 3 ,pr:3}}>
  <Typography
    variant="body1"
    fontWeight={700}
    color="text.primary"
  >
    اطلاعات معرف
  </Typography>

  <Divider />

  <Grid container spacing={2}>
    <Grid item xs={12} >
      <ReferralItem
        title="نام"
        value={order.referral_info.referrer_name}
      />
    </Grid>

    <Grid item xs={12} >
      <ReferralItem
        title="موبایل"
        value={order.referral_info.referrer_mobile}
      />
    </Grid>

    <Grid item xs={12} >
      <ReferralItem
        title="کد"
        value={order.referral_info.referrer_code}
      />
    </Grid>

    <Grid item xs={12} >
      <ReferralItem
        title="درصد"
        value={`${order.referral_info.referral_percent}%`}
      />
    </Grid>

    <Grid item xs={12} >
      <ReferralItem
        title="پورسانت"
        value={formatPrice(
          order.referral_info.referral_commission_amount
        )}
      />
    </Grid>

    <Grid item xs={12} >
      <ReferralItem
        title="سود"
        value={formatPrice(
          order.referral_info.referral_profit
        )}
      />
    </Grid>

    <Grid item xs={12}>
      <ReferralItem
        title="پورسانت نهایی"
        value={formatPrice(
          order.referral_info.referral_net_commission
        )}
        highlight
      />
    </Grid>
  </Grid>
</Stack>
    )}
  </Stack>
);
}