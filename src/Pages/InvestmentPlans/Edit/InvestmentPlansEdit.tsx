import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { InvestmentPlans, InvestmentPlansType } from '../InvestmentPlans'

const RESOURCE = 'gold-investment-plans'
export function InvestmentPlansEdit() {
    const state = useLocation().state as {row: InvestmentPlansType}
    const [plans, setPlans] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات طرح سرمایه‌گذاری"
            formDetails={plans}
            initialData={state.row}
            isFormData={true}
        >
            <InvestmentPlans plans={plans} setPlans={setPlans} isEditMode />
        </EditPage>
    )
}
