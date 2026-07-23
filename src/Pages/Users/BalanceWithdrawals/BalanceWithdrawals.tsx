import React, { useEffect } from 'react'
import { GridProducer } from '../../../Components/Table/GridProducer'
import { CustomTextField } from '../../../Components/Input/CustomTextField'



export interface  BalanceType {
    "id": number,
    "user": string,
    "user_mobile": string,
    "admin": number,
    "admin_mobile": string,
    "wallet_amount": number,
    "gold_amount": number,
    'silver_amount':number
    tracking_code:string
    "admin_note": string,
    "created_at": string,
    "updated_at": string
}



export default function BalanceWithdrawals({
    balance,
    setBalance,
    userId,
    resource,
    type
}: {
    balance: BalanceType
    setBalance: React.Dispatch<React.SetStateAction<BalanceType>>
    userId:string
    resource:string
    type:'gold'|'silver'
}) {
    useEffect(()=>{
         setBalance((prev) => ({
                ...prev,
                user: userId,
            }))
    },[userId])
  return (
    <GridProducer
                    data={[
                        <CustomTextField
                        thousandSeparator
                            key={balance.id}
                            name="wallet_amount"
                            label="کیف پول"
                            resource={resource}
                            setData={setBalance}
                            defaultValue={balance.wallet_amount}
                        />,
                           <CustomTextField
                           thousandSeparator
                            key={balance.id}
                            name={type === 'gold' ? "gold_amount" :"silver_amount"}
                            label={type === 'gold' ? "موجودی طلا" :"موجودی نقره"}
                            resource={resource}
                            setData={setBalance}
                            defaultValue={type === 'gold' ? balance.gold_amount : balance.silver_amount}
                        />,
                      
                         <CustomTextField
        name="admin_note"
        label="یادداشت ادمین"
        value={balance.admin_note ?? ''}
        multiline
        rows={3}
        fullWidth
        onChange={(e) =>
            setBalance((prev) => ({
                ...prev,
                admin_note: e.target.value,
            }))
        }
    />
                       
                    ]}
                />
  )
}
