import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'

export type InvestmentPlansType = {
    id: number
    name: string
    duration_months: number
    monthly_profit_percent: string
    total_profit_percent: string
    is_active: boolean
    description: string
    created_at: string
    updated_at: string
    investment_count: number
    active_investment_count: number
    total_invested_gold: number
}

const RESOURCE = 'gold-investment-plans'

export function InvestmentPlans({
    plans,
    setPlans,
    isEditMode
}: {
    plans: InvestmentPlansType
    setPlans: React.Dispatch<React.SetStateAction<InvestmentPlansType>>
    isEditMode: boolean
}) {
    return (
        <Stack>
            {plans && (
                <GridProducer
                    sx={{ marginBottom: '16px' }}
                    data={[
                        isEditMode && (
                            <CustomTextField
                                name="id"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'آیدی'}
                                defaultValue={plans.id}
                                disabled
                            />
                        ),
                        <CustomTextField
                            name="name"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'نام'}
                            defaultValue={plans.name}
                        />,
                        <CustomTextField
                            name="duration_months"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'مدت (ماه)'}
                            defaultValue={plans.duration_months}
                            disabled={isEditMode}
                        />,
                        <CustomTextField
                            name="monthly_profit_percent"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'درصد سود ماهانه'}
                            defaultValue={plans.monthly_profit_percent}
                        />,
                        <CustomTextField
                            name="total_profit_percent"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'درصد سود کل'}
                            defaultValue={plans.total_profit_percent}
                        />,
                        <CustomTextField
                            name="description"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'توضیحات'}
                            defaultValue={plans.description}
                        />,
                        isEditMode && (
                            <CustomTextField
                                name="investment_count"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'تعداد سرمایه‌گذاری'}
                                defaultValue={plans.investment_count}
                                disabled
                            />
                        ),
                        isEditMode && (
                            <CustomTextField
                                name="active_investment_count"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'تعداد سرمایه‌گذاری فعال'}
                                defaultValue={plans.active_investment_count}
                                disabled
                            />
                        ),
                        isEditMode && (
                            <CustomTextField
                                name="total_invested_gold"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'مجموع طلای سرمایه‌گذاری شده'}
                                defaultValue={plans.total_invested_gold}
                                disabled
                            />
                        ),
                        isEditMode && (
                            <CustomTextField
                                name="created_at"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'تاریخ ایجاد'}
                                defaultValue={plans.created_at}
                                disabled
                            />
                        ),
                        isEditMode && (
                            <CustomTextField
                                name="updated_at"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'آخرین بروزرسانی'}
                                defaultValue={plans.updated_at}
                                disabled
                            />
                        ),
                        <FormControl fullWidth key={plans.id}>
                            <InputLabel>وضعیت</InputLabel>
                            <Select
                                value={plans.is_active ? 'true' : 'false'}
                                label="وضعیت"
                                onChange={(e: SelectChangeEvent) => {
                                    const value = e.target.value === 'true'
                                    setPlans((prev) => ({
                                        ...prev,
                                        is_active: value,
                                    }))
                                }}
                            >
                                <MenuItem value="true">فعال</MenuItem>
                                <MenuItem value="false">غیرفعال</MenuItem>
                            </Select>
                        </FormControl>,
                    ].filter(Boolean)}
                />
            )}
        </Stack>
    )
}