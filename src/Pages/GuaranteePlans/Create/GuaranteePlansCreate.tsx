import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { GuaranteePlans } from '../GuaranteePlans'

export function GuaranteePlansCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن طرح تضمین قیمت'}
            resource={'gold-guarantee-plans/'}
            isFormData={true}
            formDetails={data}
        >
            <GuaranteePlans plans={data} setPlans={setData} isEditMode={false} />
        </CreatePage>
    )
}
