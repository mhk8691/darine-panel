import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { InvestmentPlans } from '../InvestmentPlans'

export function InvestmentPlansCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن طرح سرمایه‌گذاری'}
            resource={'gold-investment-plans/'}
            isFormData={true}
            formDetails={data}
        >
            <InvestmentPlans plans={data} setPlans={setData} isEditMode={false} />
        </CreatePage>
    )
}
