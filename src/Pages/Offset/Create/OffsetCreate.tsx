import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Offset } from '../Offset'

export function OffsetCreate({
    data,
    setData,
    resource
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    resource:string
}) {
    return (
        <CreatePage title={'افزودن قیمت'} resource={resource + '/'} redirect={resource} formDetails={data} isFormData>
            <Offset offset={data} setOffset={setData} resource={resource} />
        </CreatePage>
    )
}
