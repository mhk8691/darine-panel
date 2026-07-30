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
import { formatPrice } from '../../Core/FormatPrice'
import { formatDate } from '../../Core/FormatDate'

export type InvestmentsStatusType =
    | 'ACTIVE'
    | 'CANCELLED'
    | 'COMPLETED'

export type InvestmentsType = {
    id: number
    user: number
    user_mobile: string
    user_full_name: string
    plan: number
    plan_name: string
    plan_duration_months: number
    gold_weight: string
    investment_price: string
    start_date: string
    end_date: string
    status: InvestmentsStatusType
    status_display: string
    monthly_profit: number
    total_expected_profit: number
    paid_profit: string
    total_return: number
    months_passed: number
    remaining_months: number
    cancelled_at: string | null
    completed_at: string | null
    last_profit_paid_at: string | null
    cancellation_profit: string
    description: string | null
}

export function Investments({
    investments,
    setInvestments,
}: {
    investments: InvestmentsType
    setInvestments: React.Dispatch<React.SetStateAction<InvestmentsType>>
}) {
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setInvestments((prev) => ({
            ...prev,
            status: event.target.value as InvestmentsStatusType,
        }))
    }

    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={investments.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={investments.id}
                />,
                <CustomTextField
                    key={investments.id}
                    name="user"
                    disabled
                    label="آیدی کاربر"
                    defaultValue={investments.user}
                />,
                <CustomTextField
                    key={investments.id}
                    name="user_mobile"
                    disabled
                    label="شماره تلفن"
                    defaultValue={investments.user_mobile}
                />,
                <CustomTextField
                    key={investments.id}
                    name="user_full_name"
                    disabled
                    label="نام کاربر"
                    defaultValue={investments.user_full_name}
                />,
                <CustomTextField
                    key={investments.id}
                    name="plan"
                    disabled
                    label="آیدی طرح"
                    defaultValue={investments.plan}
                />,
                <CustomTextField
                    key={investments.id}
                    name="plan_name"
                    disabled
                    label="نام طرح"
                    defaultValue={investments.plan_name}
                />,
              
                <CustomTextField
                    key={investments.id}
                    name="gold_weight"
                    disabled
                    label="وزن طلا"
                    defaultValue={`${investments.gold_weight} گرم`}
                />,
                <CustomTextField
                    key={investments.id}
                    name="investment_price"
                    disabled
                    label="قیمت سرمایه‌گذاری"
                    defaultValue={formatPrice(Number(investments.investment_price))}
                />,
             
                <CustomTextField
                    key={investments.id}
                    name="total_expected_profit"
                    disabled
                    label="سود کل مورد انتظار"
                    defaultValue={`${investments.total_expected_profit} گرم`}
                />,
                <CustomTextField
                    key={investments.id}
                    name="paid_profit"
                    disabled
                    label="سود پرداخت شده"
                    defaultValue={`${investments.paid_profit} گرم`}
                />,
                <CustomTextField
                    key={investments.id}
                    name="total_return"
                    disabled
                    label="مجموع بازگشتی"
                    defaultValue={`${investments.total_return} گرم`}
                />,
               
              
                <CustomTextField
                    key={investments.id}
                    name="start_date"
                    disabled
                    label="تاریخ شروع"
                    defaultValue={formatDate(investments.start_date)}
                />,
                <CustomTextField
                    key={investments.id}
                    name="end_date"
                    disabled
                    label="تاریخ پایان (میلادی)"
                    defaultValue={formatDate(investments.end_date)}
                />,
           
                <CustomTextField
                    key={investments.id}
                    name="status_display"
                    disabled
                    label="وضعیت فعلی"
                    defaultValue={investments.status_display}
                />,
                <CustomTextField
                    key={investments.id}
                    name="cancelled_at"
                    disabled
                    label="تاریخ لغو"
                    defaultValue={
                        investments.cancelled_at
                            ? formatDate(investments.cancelled_at)
                            : '-'
                    }
                />,
                <CustomTextField
                    key={investments.id}
                    name="completed_at"
                    disabled
                    label="تاریخ تکمیل"
                    defaultValue={
                        investments.completed_at
                            ? formatDate(investments.completed_at)
                            : '-'
                    }
                />,
                <CustomTextField
                    key={investments.id}
                    name="last_profit_paid_at"
                    disabled
                    label="آخرین پرداخت سود"
                    defaultValue={
                        investments.last_profit_paid_at
                            ? formatDate(investments.last_profit_paid_at)
                            : '-'
                    }
                />,
                <CustomTextField
                    key={investments.id}
                    name="cancellation_profit"
                    disabled
                    label="سود هنگام لغو"
                    defaultValue={`${investments.cancellation_profit} گرم`}
                />,
                <CustomTextField
                    key={investments.id}
                    name="description"
                    disabled
                    label="توضیحات"
                    defaultValue={investments.description ?? '-'}
                />,
                <Grid item xs={12} key={investments.id}>
                    <FormControl fullWidth>
                        <InputLabel>وضعیت</InputLabel>
                        <Select
                            value={investments.status ?? ''}
                            label="وضعیت"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="ACTIVE">فعال</MenuItem>
                            <MenuItem value="COMPLETED">تکمیل شده</MenuItem>
                            <MenuItem value="CANCELLED">لغو شده</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>,
            ].filter(Boolean),
        [investments]
    )

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
        </Stack>
    )
}
