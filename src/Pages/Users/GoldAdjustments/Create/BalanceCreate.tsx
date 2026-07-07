import { useParams } from 'react-router-dom'
import { CreatePage } from '../../../../Components/Table/CreatePage'
import GoldAdjustments from '../GoldAdjustments'

export function BalanceCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
        const userId =useParams().userId
    return (
        <CreatePage title={'کیف پول'} resource={`gold-balance-adjustments/`} redirect={`users/${userId}/balance/`} formDetails={data} isFormData>
            <GoldAdjustments balance={data} setBalance={setData} userId={userId || ''} />
        </CreatePage>
    )
}
