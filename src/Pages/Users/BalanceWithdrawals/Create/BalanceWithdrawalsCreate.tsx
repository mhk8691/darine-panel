import { useParams } from 'react-router-dom'
import { CreatePage } from '../../../../Components/Table/CreatePage'
import BalanceWithdrawals from '../BalanceWithdrawals'

export function BalanceWithdrawalsCreate({
    data,
    setData,
    resource,
    title,
    type
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    resource:string
    title:string
    type:'silver' | 'gold'
}) {
        const userId =useParams().userId
    return (
        <CreatePage title={title} resource={resource} redirect={`users/${userId}/${type === 'gold' ? 'gold-withdrawals' :'silver-withdrawals'}`} formDetails={data} isFormData>
            <BalanceWithdrawals type={type} resource={resource} balance={data} setBalance={setData} userId={userId || ''} />
        </CreatePage>
    )
}
