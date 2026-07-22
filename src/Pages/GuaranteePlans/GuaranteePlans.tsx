import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'

export type GuaranteePlansType = {
    "id": number,
    "name": string,
    "duration_days": number,
    "service_fee_percent": string,
    "is_active": boolean,
    "description": string,
    "guarantee_count": number,
    "active_guarantee_count": number
}

const RESOURCE = 'gold-guarantee-plans'

export function GuaranteePlans({
    plans,
    setPlans,
    isEditMode
}: {
    plans: GuaranteePlansType
    setPlans: React.Dispatch<React.SetStateAction<GuaranteePlansType>>
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
                            name="duration_days"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'مدت زمان'}
                            defaultValue={plans.duration_days}
                            disabled={isEditMode}
                        />,
                        <CustomTextField
                            name="service_fee_percent"
                            setData={setPlans}
                            resource={RESOURCE}
                            label={'درصد کارمزد'}
                            defaultValue={plans.service_fee_percent}
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
                                name="guarantee_count"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'تعداد تضمین'}
                                defaultValue={plans.guarantee_count}
                                disabled
                            />
                        ),
                        isEditMode && (
                            <CustomTextField
                                name="active_guarantee_count"
                                setData={setPlans}
                                resource={RESOURCE}
                                label={'تعداد تضمین فعال'}
                                defaultValue={plans.active_guarantee_count}
                                disabled
                            />
                        ),
                        <FormControl fullWidth key={plans.id}>
                            <InputLabel>وضعیت</InputLabel>
                            <Select
                                value={plans.is_active ? 'true' : 'false'}
                                label="وضعیت"
                                onChange={(e: SelectChangeEvent) => {
                                    const value = e.target.value === 'true';
                                    setPlans((prev) => ({
                                        ...prev,
                                        is_active: value,
                                    }));
                                }}
                            >
                                <MenuItem value="true">فعال</MenuItem>
                                <MenuItem value="false">غیرفعال</MenuItem>
                            </Select>
                        </FormControl>
                    ].filter(Boolean)} // 👈 اضافه شدن این قسمت مقادیر false را پاک می‌کند
                />
            )}
        </Stack>
    )
}