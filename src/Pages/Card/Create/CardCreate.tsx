import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Card} from '../Card'

export function CardCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'افزودن کارت'} resource={'card'} formDetails={data} isFormData>
            <Card card={data} setCard={setData} />
        </CreatePage>
    )
}
