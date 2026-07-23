import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { GuaranteePlans, GuaranteePlansType } from '../GuaranteePlans'

const RESOURCE = 'gold-guarantee-plans'
export function GuaranteePlansEdit() {
    const state = useLocation().state as {row: GuaranteePlansType}
    const [plans, setPlans] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات طرح تضمین قیمت"
            formDetails={plans}
            initialData={state.row}
            isFormData={true}
        >
            <GuaranteePlans plans={plans} setPlans={setPlans} isEditMode />
        </EditPage>
    )
}
