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

export type WithdrawType = {
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
}

export function Withdraw({
    withdraw,
    setWithdraw,
}: {
    withdraw: WithdrawType
    setWithdraw: React.Dispatch<React.SetStateAction<WithdrawType>>
}) {
    const [isCanceled, setIsCanceled] = useState(false)

    const safe = (v: any) => v ?? '—'

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setWithdraw((prev) => ({
            ...prev,
            status: event.target.value as OrderStatus,
        }))
    }

    useEffect(() => {
        if (withdraw.status === 'FAILED'){
            setIsCanceled(true)

        }else{
             setWithdraw((prev) => ({
                ...prev,
                admin_note: '',
            }))
            setIsCanceled(false)
        }
    }, [withdraw.status])

    const methodLabel = withdraw.method === 'ONLINE' ? 'آنلاین' : 'کارت به کارت'

    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={withdraw.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={safe(withdraw.id)}
                />,
                <CustomTextField
                    key={withdraw.id}
                    name="user_mobile"
                    disabled
                    label="شماره تلفن"
                    defaultValue={safe(withdraw.user_mobile)}
                />,
                <CustomTextField
                    key={withdraw.id}
                    name="created_at"
                    disabled
                    label="تاریخ واریز"
                    defaultValue={formatDate(withdraw.created_at)}
                />,
                <CustomTextField
                    key={withdraw.id}
                    name="amount"
                    disabled
                    label="مبلغ"
                    defaultValue={formatPrice(withdraw.amount)}
                />,
                <CustomTextField
                    key={withdraw.id}
                    name="method"
                    disabled
                    label="روش پرداخت"
                    defaultValue={methodLabel}
                />,
                <CustomTextField
                    key={withdraw.id}
                    name="tracking_code"
                    disabled
                    label="کد رهگیری"
                    defaultValue={safe(withdraw.tracking_code)}
                />,
            
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>وضعیت واریز</InputLabel>
                        <Select
                            value={withdraw.status ?? ''}
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
        [withdraw, isCanceled]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
<GridProducer count={1} sx={{ mb: 2 }} data={[
    <Grid key={withdraw.id}>
    <CustomTextField
        name="admin_note"
        disabled={!isCanceled}
        label="یادداشت ادمین"
        value={withdraw.admin_note ?? ''}
        multiline
        rows={3}
        fullWidth
        onChange={(e) =>
            setWithdraw((prev) => ({
                ...prev,
                admin_note: e.target.value,
            }))
        }
    />
</Grid>,
]} />
            {withdraw.receipt_image && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography fontWeight={600} fontSize={17}>
                        رسید بانکی:
                    </Typography>

                    <img
                        src={withdraw.receipt_image}
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