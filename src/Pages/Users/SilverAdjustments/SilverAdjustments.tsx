import React, { useEffect } from 'react'
import { GridProducer } from '../../../Components/Table/GridProducer'
import { CustomTextField } from '../../../Components/Input/CustomTextField'


const RESOURCE = 'silver-balance-adjustments'

export interface  SilverBalanceType {
    "id": number,
    "user": string,
    "user_mobile": string,
    "admin": number,
    "admin_mobile": string,
    "wallet_amount": number,
    "silver_amount": number,
    
    "admin_note": string,
    "created_at": string,
    "updated_at": string
}



export default function SilverAdjustments({
    balance,
    setBalance,
    userId
}: {
    balance: SilverBalanceType
    setBalance: React.Dispatch<React.SetStateAction<SilverBalanceType>>
    userId:string
    
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
                            key={balance.id}
                            name="wallet_amount"
                            label="کیف پول"
                            resource={RESOURCE}
                            setData={setBalance}
                            defaultValue={balance.wallet_amount}
                        />,
                           <CustomTextField
                            key={balance.id}
                            name="gold_amount"
                            label="موجودی نقره"
                            resource={RESOURCE}
                            setData={setBalance}
                            defaultValue={balance.silver_amount}
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
