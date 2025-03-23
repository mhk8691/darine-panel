import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {ConnectionMethod} from '../Method'

export function MethodCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن روش اتصال'}
            resource={'account/base-accounts/'}
            redirect={'base-accounts'}
            formDetails={data}
        >
            <ConnectionMethod method={data} setMethod={setData} editMode={false} />
        </CreatePage>
    )
}
