import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Users} from '../Users'

export function UserCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'افزودن کاربر'} resource={'services'} formDetails={data}>
            <Users user={data} setUser={setData} />
        </CreatePage>
    )
}
