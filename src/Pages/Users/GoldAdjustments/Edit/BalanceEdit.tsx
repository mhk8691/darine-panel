import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import GoldAdjustments, { BalanceType } from '../GoldAdjustments'
import { ParamType } from '../../../../Components/Filter/CustomFilter'
import { DataProvider } from '../../../../Core/DataProvider'
import { EditPage } from '../../../../Components/Table/EditPage'

const RESOURCE = 'gold-balance-adjustments'
export function BalanceEdit() {
    const balanceId = useParams().id
        const userId =useParams().userId
    const [user, setBalance] = useState<BalanceType>({} as BalanceType)
    const [initialData, setInitialData] = useState<BalanceType>({} as BalanceType)
    const getBalance = async () => {
        try {
            let response = await DataProvider.get<BalanceType>(`${RESOURCE}/${userId}/${balanceId}`)
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
            resource={RESOURCE+`/${userId}`}
            title="ویرایش کیف پول"
            formDetails={user}
            initialData={initialData}
            isFormData
             redirect={`users/${userId}/balance/`}
        >
            <GoldAdjustments balance={user}  setBalance={setBalance} userId={userId || ''} />
        </EditPage>
    )
}
