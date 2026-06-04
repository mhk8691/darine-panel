import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { SilverCard } from '../SilverCard'

export function SilverCardCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'افزودن کارت'} resource={'silver-bank/'} redirect={'silver-card'} formDetails={data} isFormData>
            <SilverCard card={data} setCard={setData} />
        </CreatePage>
    )
}
