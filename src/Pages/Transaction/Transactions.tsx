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

export type transactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'

export type transactionItem = {
  id: number
  product_name: string
  quantity: number
  price_at_time: string
  weight_at_time: string
  transaction: number
  product: number
}

export type TransactionsType = {
  id: number
  user_mobile: string
  user: number

  items: transactionItem[]

  province: string
  city: string
  address: string
  postal_code: string
  plaque: string
  unit: string

  payment_method: 'GOLD' | 'CASH' | string
  delivery_type: 'HOME' | 'PICKUP' | string

  status: transactionStatus

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

export function Transactions({
    transaction,
    setTransaction,
}: {
    transaction: TransactionsType
    setTransaction: React.Dispatch<React.SetStateAction<TransactionsType>>
}) {
    const [isCanceled, setIsCanceled] = useState(false)
    const [isOpen, setIsOpen] = useState<number | null>(null)

    const safe = (v: any) => v ?? '—'

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setTransaction((prev) => ({
            ...prev,
            status: event.target.value as transactionStatus,
        }))
    }

    const handleChangeReason = (event: SelectChangeEvent) => {
        setTransaction((prev) => ({
            ...prev,
            reason: event.target.value,
        }))
    }

    useEffect(() => {
        setIsCanceled(transaction.status === 'FAILED')
    }, [transaction.status])

    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={transaction.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={safe(transaction.id)}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="user_full_name"
                    disabled
                    label="شماره تلفن"
                    defaultValue={safe(transaction.user_mobile)}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="created_at"
                    disabled
                    label="تاریخ سفارش"
                    defaultValue={formatDate(transaction.created_at)}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="total_price"
                    disabled
                    label="قیمت نهایی"
                    defaultValue={formatPrice(+transaction?.total_toman_amount)}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="total_price"
                    disabled
                    label="طلا"
                    defaultValue={`${transaction?.total_gold_amount} گرم`}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="address_summary"
                    disabled
                    label="آدرس"
                    defaultValue={`${transaction?.province} - ${transaction?.city} - ${transaction?.address} - پلاک ${transaction?.plaque} - واحد ${transaction?.unit}`}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="payment_method"
                    disabled
                    label="روش پرداخت"
                    defaultValue={transaction?.payment_method}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="delivery_type"
                    disabled
                    label="روش ارسال"
                    defaultValue={transaction?.delivery_type}
                />,
                <CustomTextField
                    key={transaction.id}
                    name="tracking_code"
                    disabled
                    label="کد رهگیری"
                    defaultValue={transaction?.tracking_code}
                />,
                <Grid item xs={12} key={transaction.id}>
                    <FormControl fullWidth>
                        <InputLabel>وضعیت سفارش</InputLabel>
                        <Select
                            value={transaction.status ?? ''}
                            label="وضعیت سفارش"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="PENDING">در انتظار</MenuItem>
                            {/* <MenuItem value="FAILED">لغو شده</MenuItem> */}
                            <MenuItem value="COMPLETED">تکمیل شده</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>,
            ].filter(Boolean),
        [transaction, isCanceled]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />

            {transaction.authentication_video && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        احراز هویت:
                    </Typography>

                    <video
                        controls
                        src={transaction.authentication_video}
                        style={{
                            width: '100%',
                            maxHeight: 400,
                            borderRadius: 12,
                        }}
                    />
                </Stack>
            )}

            {transaction.bank_receipt && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        رسید بانکی:
                    </Typography>

                    <img
                        src={transaction.bank_receipt}
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
                transaction.items.length>0 && (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                <Typography fontWeight={600} fontSize={17}>
                    محصولات:
                </Typography>

            
            </Stack>
                )
            }
        </Stack>
    )
}
