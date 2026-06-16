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
import { OrderStatus } from '../Orders/Orders'

export type DepositType = {
    id: number
    user_mobile: string
    amount: number
    method: 'ONLINE' | 'CARD_TO_CARD'
    status: OrderStatus
    receipt_image: string | null
    tracking_code: string
    admin_note: string | null
    created_at: string
    user: number
    description:string
}

export function Deposit({
    deposit,
    setDeposit,
}: {
    deposit: DepositType
    setDeposit: React.Dispatch<React.SetStateAction<DepositType>>
}) {

    const safe = (v: any) => v ?? '—'

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setDeposit((prev) => ({
            ...prev,
            status: event.target.value as OrderStatus,
        }))
    }

  

    const methodLabel = deposit.method === 'ONLINE' ? 'آنلاین' : 'کارت به کارت'

    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={deposit.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={safe(deposit.id)}
                />,
                <CustomTextField
                    key={deposit.id}
                    name="user_mobile"
                    disabled
                    label="شماره تلفن"
                    defaultValue={safe(deposit.user_mobile)}
                />,
                <CustomTextField
                    key={deposit.id}
                    name="created_at"
                    disabled
                    label="تاریخ واریز"
                    defaultValue={formatDate(deposit.created_at)}
                />,
                <CustomTextField
                    key={deposit.id}
                    name="amount"
                    disabled
                    label="مبلغ"
                    defaultValue={formatPrice(deposit.amount)}
                />,
                <CustomTextField
                    key={deposit.id}
                    name="method"
                    disabled
                    label="روش پرداخت"
                    defaultValue={methodLabel}
                />,
                <CustomTextField
                    key={deposit.id}
                    name="tracking_code"
                    disabled
                    label="کد رهگیری"
                    defaultValue={safe(deposit.tracking_code)}
                />,
                    <CustomTextField
                    key={deposit.id}
                    name="description"
                    disabled
                    label="توضیح"
                    defaultValue={safe(deposit.description)}
                />,
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>وضعیت واریز</InputLabel>
                        <Select
                            value={deposit.status ?? ''}
                            label="وضعیت واریز"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="PENDING">در انتظار</MenuItem>
                            <MenuItem value="COMPLETED">تکمیل شده</MenuItem>
                            <MenuItem value="FAILED">ناموفق</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>,
                
            ].filter(Boolean),
        [deposit]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
<GridProducer count={1} sx={{ mb: 2 }} data={[
        <Grid key={deposit.id}>
    <CustomTextField
        name="admin_note"
        label="یادداشت ادمین"
        value={deposit.admin_note ?? ''}
        multiline
        rows={3}
        fullWidth
        onChange={(e) =>
            setDeposit((prev) => ({
                ...prev,
                admin_note: e.target.value,
            }))
        }
    />
</Grid>,
]} />
            {deposit.receipt_image && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        رسید بانکی:
                    </Typography>

                    <img
                        src={deposit.receipt_image}
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
        </Stack>
    )
}