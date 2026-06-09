import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import ProfileUploader from './ProfileUploader'
import { formatDate } from '../../Core/FormatDate'
export type UsersType = {
    id: number

    username: string
    first_name: string
    last_name: string
    email: string

    mobile: string
    national_code: string
    birth_date: string

    card_number: string | null
    shaba_number: string | null

    referral_code: string | null
    referred_by: number | null

    role: 'customer' | 'admin' 

    is_active: boolean
    is_staff: boolean
    is_superuser: boolean

    auth_status: 'pending' | 'verified' | 'rejected'

    last_login: string | null
    date_joined: string
    updated_at: string

    profile_picture: string | File

    fees: {
        gold_buy_fee: number
        gold_sell_fee: number
        silver_buy_fee: number
        silver_sell_fee: number
    }
}
const RESOURCE = 'users'

export function Users({
    user,
    setUser,
    editMode = false,
    isProfile = false,
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
    editMode?: boolean
    isProfile?: boolean
}) {
    const handleRoleChange = (event: SelectChangeEvent) => {
        setUser((prev) => ({
            ...prev,
            role: event.target.value as UsersType['role'],
        }))
    }
    return (
        <Stack spacing={3}>
            <ProfileUploader user={user} setUser={setUser} />
            <GridProducer
                data={[
                    <CustomTextField
                        key={user.id}
                        name="first_name"
                        label="نام"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.first_name}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="last_name"
                        label="نام خانوادگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.last_name}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="national_code"
                        label="کد ملی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.national_code}
                        disabled={editMode}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="mobile"
                        label="شماره تلفن"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.mobile}
                        disabled={editMode}
                        
                    />,
                ]}
            />

            <GridProducer
               
                data={[
                   
                    !isProfile && (
                <Stack spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel>نقش کاربر</InputLabel>
                        <Select
                        key={user.id}
                            value={user.role}
                            label="نقش کاربر"
                            onChange={handleRoleChange}
                        >
                            <MenuItem value="customer">کاربر عادی</MenuItem>
                            <MenuItem value="admin">ادمین</MenuItem>
                        </Select>
                    </FormControl>
                   
                </Stack>
                
                ),
                editMode && <CustomTextField
                        key={user.id}
                        name="birth_date"
                        label="تاریخ تولد"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={formatDate(user.birth_date)}
                         disabled={editMode}
                    />,
              
                      editMode &&<CustomTextField
                      key={user.id}
                        name="referral_code"
                        label="کد نمایندگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.referral_code}
                    />,
                         editMode &&  <CustomTextField
                        key={user.id}
                        name="date_joined"
                        label="تاریخ عضویت"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={formatDate(user.date_joined)}
                        disabled
                    />,
            
                ]}
            />
            

            <GridProducer
                data={[
                    
                   
                    <CustomTextField
                        key={user.id}
                        name="gold_buy_fee"
                        label="کارمزد خرید طلا"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.fees?.gold_buy_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="gold_sell_fee"
                        label="کارمزد فروش طلا"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.gold_sell_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="silver_buy_fee"
                        label="کارمزد خرید نقره"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.silver_buy_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="silver_sell_fee"
                        label="کارمزد فروش نقره"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.silver_sell_fee}
                    />,
                 
                ]}
                
            />
         
        </Stack>
    )
}