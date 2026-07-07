import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { ParamType } from '../../../../Components/Filter/CustomFilter'
import { DataProvider } from '../../../../Core/DataProvider'
import { EditPage } from '../../../../Components/Table/EditPage'
import SilverAdjustments, { SilverBalanceType } from '../SilverAdjustments'

const RESOURCE = 'silver-balance-adjustments'
export function SilverBalanceEdit() {
    const balanceId = useParams().id
        const userId =useParams().userId
    const [user, setBalance] = useState<SilverBalanceType>({} as SilverBalanceType)
    const [initialData, setInitialData] = useState<SilverBalanceType>({} as SilverBalanceType)
    const getBalance = async () => {
        try {
            let response = await DataProvider.get<SilverBalanceType>(`${RESOURCE}/${userId}/${balanceId}`)
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
            title="ویرایش واریز نقرینه"
            formDetails={user}
            initialData={initialData}
            isFormData
             redirect={`users/${userId}/silver-balance/`}
        >
            <SilverAdjustments balance={user}  setBalance={setBalance} userId={userId || ''} />
        </EditPage>
    )
}
