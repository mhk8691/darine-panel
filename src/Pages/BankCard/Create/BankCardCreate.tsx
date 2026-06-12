import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { BankCard } from '../BankCard'

export function BankCardCreate({
    data,
    setData,
    resource
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    resource:string
}) {
    return (
        <CreatePage title={'افزودن کارت'} resource={resource + '/'} redirect={resource} formDetails={data} isFormData>
            <BankCard card={data} setCard={setData} resource={resource} />
        </CreatePage>
    )
}
