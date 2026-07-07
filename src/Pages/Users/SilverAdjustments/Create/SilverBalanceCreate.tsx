import { useParams } from 'react-router-dom'
import { CreatePage } from '../../../../Components/Table/CreatePage'
import SilverAdjustments from '../SilverAdjustments'

export function SilverBalanceCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
        const userId =useParams().userId
    return (
        <CreatePage title={'واریز نقرینه'} resource={`silver-balance-adjustments/`} redirect={`users/${userId}/silver-balance/`} formDetails={data} isFormData>
            <SilverAdjustments balance={data} setBalance={setData} userId={userId || ''} />
        </CreatePage>
    )
}
