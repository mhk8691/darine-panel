import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { DataProvider } from '../../../../Core/DataProvider'
import { EditPage } from '../../../../Components/Table/EditPage'
import BalanceWithdrawals, { BalanceType } from '../BalanceWithdrawals'

export function BalanceWithdrawalsEdit({resource,title,type}:{resource:string,title:string,type:'silver' | 'gold'}) {
    const balanceId = useParams().id
        const userId =useParams().userId
    const [user, setBalance] = useState<BalanceType>({} as BalanceType)
    const [initialData, setInitialData] = useState<BalanceType>({} as BalanceType)
    const getBalance = async () => {
        try {
            let response = await DataProvider.get<BalanceType>(`${resource}/${userId}/${balanceId}`)
                        if (response) {
                setBalance(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBalance()
    }, [balanceId])
    return (
        <EditPage
            resource={resource+`/${userId}`}
            title={title}
            formDetails={user}
            initialData={initialData}
            isFormData
             redirect={`users/${userId}/${type === 'gold' ? 'gold-withdrawals':'silver-withdrawals'}`}
        >
            <BalanceWithdrawals type={type} resource={resource} balance={user}  setBalance={setBalance} userId={userId || ''} />
        </EditPage>
    )
}
