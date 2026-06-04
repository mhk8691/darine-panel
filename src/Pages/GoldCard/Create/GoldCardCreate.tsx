import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {GoldCard} from '../GoldCard'

export function GoldCardCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'افزودن کارت'} resource={'gold-bank/'} redirect={'gold-card'} formDetails={data} isFormData>
            <GoldCard card={data} setCard={setData} />
        </CreatePage>
    )
}
