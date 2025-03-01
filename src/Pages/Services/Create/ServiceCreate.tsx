import {Stack} from '@mui/material'
import React from 'react'
import {Service} from '../Service'
import {CreatePage} from '../../../Components/Table/CreatePage'

export function ServiceCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'Add Service'} resource={'services'} formDetails={data}>
            <Service service={data} setService={setData} />
        </CreatePage>
    )
}
