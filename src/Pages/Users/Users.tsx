import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography, Button} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import ProfileUploader from './ProfileUploader'
import { formatDate } from '../../Core/FormatDate'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import { ParamType } from '../../Components/Filter/CustomFilter'
import { useEffect, useState } from 'react'
import { DepositList } from '../Deposit/List/DepositList'
import { TransactionsList } from './TransactionsList'
import { BaseModal } from '../../Components/Modal/BaseModal'
import { DataProvider } from '../../Core/DataProvider'
import { useDispatch } from 'react-redux'
import { setUtil } from '../../redux/UtilSlice'
import { OrderStatus } from '../Orders/Orders'
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
    created_at: string
    updated_at: string

    profile_picture: string | File

    fees: {
        gold_buy_fee: number
        gold_sell_fee: number
        silver_buy_fee: number
        silver_sell_fee: number
    }
    "balances": {
            "gold_wallet": {
                "accessible_toman": number,
                "blocked_toman": number
            },
            "silver_wallet": {
                "accessible_toman": number,
                "blocked_toman": number
            },
            "gold_inventory": {
                "accessible_balance": number,
                "blocked_balance": number
            },
            "silver_inventory": {
                "accessible_balance": number,
                "blocked_balance": number
            }
        },
}
export interface TransactionsType{
    id:number
        "type": "DEPOSIT" | 'WITHDRAW',
        "status":OrderStatus,
        "amount": number,
        "toman_amount": number,
        "tracking_code": string,
        "description": string,
        "created_at": string
}
const RESOURCE = 'users'

export function Users({
    user,
    setUser,
    editMode = false,
    isProfile = false,
    setDate,
    date
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
     setDate: React.Dispatch<React.SetStateAction<ParamType>>
     date:ParamType
    editMode?: boolean
    isProfile?: boolean
    
}) {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
  
    const [formData, setFormData] = useState({
    amount: '',
    price: '',
    weight: '',
    sheba_number: '',
})
    const [actionType,setActionType] = useState<'goldDeposit' | 'goldWithdraw' | 'deposit' | 'withdraw' | null>(null)
    const handleRoleChange = (event: SelectChangeEvent) => {
        setUser((prev) => ({
            ...prev,
            role: event.target.value as UsersType['role'],
        }))
    }
       const queryNames = {
  label: "تاریخ تولد",
  field: "date",
}   
useEffect(() => {
    if (!date.date) return;

    setUser(prev => ({
        ...prev,
        birth_date: date.date as string,
    }));
}, [date]);

const dispatch = useDispatch()
const deposit = async () => {
    setLoading(true)

    try {
        await DataProvider.post(`${'/wallet'}/deposit/`, {
            data:{
                amount: formData.amount,
            }
        })

        dispatch(
            setUtil({
                open: true,
                message: 'واریز با موفقیت انجام شد.',
                severity: 'success',
            })
        )

        setOpen(false)
    } catch (error: any) {
        dispatch(
            setUtil({
                open: true,
                message: error.message,
                severity: 'error',
            })
        )
    }

    setLoading(false)
}
const withdraw = async () => {
    setLoading(true)

    try {
        await DataProvider.post(`${''}/withdraw/`, {
            data:{
                amount: formData.amount,
            sheba_number: formData.sheba_number,
            }
        })

        dispatch(
            setUtil({
                open: true,
                message: 'درخواست برداشت ثبت شد.',
                severity: 'success',
            })
        )

        setOpen(false)
    } catch (error: any) {
        dispatch(
            setUtil({
                open: true,
                message: error.message,
                severity: 'error',
            })
        )
    }

    setLoading(false)
}
const goldDeposit = async () => {
    setLoading(true)

    try {
        await DataProvider.post(`${''}/gold/deposit/`, {
            data:{
                price: formData.price,
            }
        })

        dispatch(
            setUtil({
                open: true,
                message: 'واریز طلا انجام شد.',
                severity: 'success',
            })
        )

        setOpen(false)
    } catch (error: any) {
        dispatch(
            setUtil({
                open: true,
                message: error.message,
                severity: 'error',
            })
        )
    }

    setLoading(false)
}
const goldWithdraw = async () => {
    setLoading(true)

    try {
        await DataProvider.post(`${''}/gold/withdraw/`, {
            data:{
                weight: formData.weight,
            }
        })

        dispatch(
            setUtil({
                open: true,
                message: 'برداشت طلا انجام شد.',
                severity: 'success',
            })
        )

        setOpen(false)
    } catch (error: any) {
        dispatch(
            setUtil({
                open: true,
                message: error.message,
                severity: 'error',
            })
        )
    }

    setLoading(false)
}
const handleSubmit = () => {
    switch (actionType) {
        case 'deposit':
            deposit()
            break

        case 'withdraw':
            withdraw()
            break

        case 'goldDeposit':
            goldDeposit()
            break

        case 'goldWithdraw':
            goldWithdraw()
            break

        default:
            break
    }
}


    return (
        <>
        <Stack gap={3} >
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
        
                    <DatePickerFilter setParams={setDate} item={queryNames} initialValue={user.birth_date} /> ,
              <CustomTextField   
                      key={user.id}
                        name="referral_code"
                        label="سود کد نمایندگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.referral_code}
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
                        name="created_at"
                        label="تاریخ عضویت"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={formatDate(user.created_at)}
                        disabled
                    />,
                    <FormControl fullWidth>
                                <InputLabel>وضعیت حساب</InputLabel>
                    
                                <Select
                                key={user.id}
                                  value={user.is_active ? 'true' : 'false'}
                                  label="وضعیت حساب"
                                  onChange={(e: SelectChangeEvent) => {
                                    const value = e.target.value === 'true';
                                    setUser((prev) => ({
                                      ...prev,
                                      is_active: value,
                                    }));
                                  }}
                                >
                                  <MenuItem value="true">فعال</MenuItem>
                                  <MenuItem value="false">غیرفعال</MenuItem>
                                </Select>
                              </FormControl>
            
                ]}
            />
            <GridProducer
  data={[
    <CustomTextField
      key={user.id}
      name="gold_wallet_accessible"
      label="کیف پول طلا (قابل برداشت)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_wallet?.accessible_toman}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="gold_wallet_blocked"
      label="کیف پول طلا (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_wallet?.blocked_toman}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="silver_wallet_accessible"
      label="کیف پول نقره (قابل برداشت)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_wallet?.accessible_toman}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="silver_wallet_blocked"
      label="کیف پول نقره (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_wallet?.blocked_toman}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="gold_inventory_accessible"
      label="موجودی طلا (قابل استفاده)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_inventory?.accessible_balance}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="gold_inventory_blocked"
      label="موجودی طلا (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_inventory?.blocked_balance}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="silver_inventory_accessible"
      label="موجودی نقره (قابل استفاده)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_inventory?.accessible_balance}
      disabled
    />,
    <CustomTextField
      key={user.id}
      name="silver_inventory_blocked"
      label="موجودی نقره (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_inventory?.blocked_balance}
      disabled
    />,
  ]}
/>
        </Stack>
        {/* <Typography variant="body1" mt={5}>عملیات:</Typography>
        <Stack direction={'row'} gap={2} mt={2}>
            <Button variant="outlined" color="primary" size='large' onClick={()=>{
                setActionType('deposit')
                setOpen(true)
            }}>
          واریز وجه
        </Button>
        <Button variant="outlined" color="primary" size='large' onClick={()=>{
            setActionType('withdraw')
            setOpen(true)
        }}>
          برداشت وجه
        </Button>
        <Button variant="outlined" color="primary" size='large' onClick={()=>{
            setActionType('goldDeposit')
            setOpen(true)
        }}>
          واریز طلا
        </Button>
        <Button variant="outlined" color="primary" size='large' onClick={()=>{
            setActionType('goldWithdraw')
            setOpen(true)
        }}>
          برداشت طلا
        </Button>
        </Stack> */}
        <TransactionsList id={user.id} key={user.id} />
         <BaseModal
                            open={open}
                            setOpen={setOpen}
                            title={actionType === 'deposit' ? 'واریز وجه' : actionType === 'withdraw' ? 'برداشت وجه' : actionType === 'goldDeposit' ?'واریز طلا':'برداشت طلا'}
                            onClose={()=>{
                                setOpen(false)
                                setActionType(null)
                            }
                            }
                            style={{maxWidth: 700}}
                        >
                         <Stack my={2}>
                            <GridProducer
                         count={1}
                                         data={[
                                            
                                            <Stack my={2} spacing={2}>
    {actionType === 'deposit' && (
        <CustomTextField
            name="amount"
            label="مبلغ"
            setData={setFormData}
            defaultValue={formData.amount}
        />
    )}

    {actionType === 'withdraw' && (
        <>
            <CustomTextField
                name="amount"
                label="مبلغ"
                setData={setFormData}
                defaultValue={formData.amount}
                fullWidth
            />

            <CustomTextField
                name="sheba_number"
                label="شماره شبا"
                setData={setFormData}
                defaultValue={formData.sheba_number}
            />
        </>
    )}

    {actionType === 'goldDeposit' && (
        <CustomTextField
            name="price"
            label="قیمت"
            setData={setFormData}
            defaultValue={formData.price}
        />
    )}

    {actionType === 'goldWithdraw' && (
        <CustomTextField
            name="weight"
            label="وزن"
            setData={setFormData}
            defaultValue={formData.weight}
            sx={{width:'100%'}}
        />
    )}
</Stack>
                                          
                                         ]}
                                         
                                     />
                         </Stack>
                
                            <Stack direction={'row'} spacing={2} mt={1}>
                                <Button
                                    variant="contained"
                                    size="large"
                                 onClick={handleSubmit}
                                 
                                >
                                    تایید
                                </Button>
                                <Button variant="outlined" color="primary" size="large" onClick={()=>{
                                    setOpen(false)
                                    setActionType(null)
                                }}>
                                    لغو
                                </Button>
                            </Stack>
        </BaseModal>
        </>
    )
}