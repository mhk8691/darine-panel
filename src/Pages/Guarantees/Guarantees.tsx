import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import {  useMemo,} from 'react'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { formatPrice } from '../../Core/FormatPrice'
import { formatDate } from '../../Core/FormatDate'




export type GuaranteesStatusType = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'EXECUTED'
export type GuaranteesType = {
    "id": number,
    "user_mobile": string,
    "user_full_name": string,
    "plan_name": string,
    "gold_weight": number,
    "guaranteed_price": number,
    "service_fee": number,
    "status": GuaranteesStatusType,
    "status_display": string,
    "days_remaining": number
    "created_at": string
    "end_date": string
    platform_profit:number
    user_payout:number
    "start_date": string
}      



export function Guarantees({
    guarantees,
    setGuarantees,
}: {
    guarantees: GuaranteesType
    setGuarantees: React.Dispatch<React.SetStateAction<GuaranteesType>>
}) {
   
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setGuarantees((prev) => ({
            ...prev,
            status: event.target.value as GuaranteesStatusType,
        }))
    }
    const data = useMemo(
        () =>
            [
                <CustomTextField
                    key={guarantees.id}
                    name="id"
                    disabled
                    label="آیدی"
                    defaultValue={guarantees.id}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="user_mobile"
                    disabled
                    label="شماره تلفن"
                    defaultValue={guarantees.user_mobile}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="user_full_name"
                    disabled
                    label="نام کاربر"
                    defaultValue={guarantees.user_full_name}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="plan_name"
                    disabled
                    label="نام طرح"
                    defaultValue={guarantees?.plan_name}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="gold_weight"
                    disabled
                    label="وزن"
                    defaultValue={`${guarantees?.gold_weight} گرم`}
                />,
        
                <CustomTextField
                    key={guarantees.id}
                    name="guaranteed_price"
                    disabled
                    label="قیمت گارانتی"
                    defaultValue={`${formatPrice(guarantees?.guaranteed_price)} `}
                />,
                 <CustomTextField
                    key={guarantees.id}
                    name="platform_profit"
                    disabled
                    label="سود پلتفرم"
                    defaultValue={`${formatPrice(guarantees?.platform_profit)} `}
                />,
                 <CustomTextField
                    key={guarantees.id}
                    name="user_payout"
                    disabled
                    label="مبلغ پرداختی به کاربر"
                    defaultValue={`${formatPrice(guarantees?.user_payout)} `}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="service_fee"
                    disabled
                    label="کارمزد"
                    defaultValue={`${formatPrice(guarantees?.service_fee)} `}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="days_remaining"
                    disabled
                    label="زمان باقیمانده"
                    defaultValue={guarantees?.days_remaining}
                />,
                <Grid item xs={12} key={guarantees.id}>
                    <FormControl fullWidth>
                        <InputLabel>وضعیت</InputLabel>
                        <Select
                            value={guarantees.status ?? ''}
                            label="وضعیت"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="CANCELLED">لغو شده</MenuItem>
                            <MenuItem value="EXPIRED">منقضی شده</MenuItem>

                        </Select>

                    </FormControl>
                </Grid>,
                <CustomTextField
                    key={guarantees.id}
                    name="created_at"
                    disabled
                    label="تاریخ"
                    defaultValue={formatDate(guarantees?.created_at)}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="created_at"
                    disabled
                    label="تاریخ شروع"
                    defaultValue={formatDate(guarantees?.start_date)}
                />,
                <CustomTextField
                    key={guarantees.id}
                    name="created_at"
                    disabled
                    label="تاریخ پایان"
                    defaultValue={formatDate(guarantees?.end_date)}
                />,
             
            ].filter(Boolean),
        [guarantees]
    )   

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
        </Stack>
    )
}