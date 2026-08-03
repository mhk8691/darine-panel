import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {VersionControl} from '../VersionControl'

export function VersionControlCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن نسخه جدید اپلیکیشن'}
            resource={'version-control/'}
            isFormData={true}
            redirect={'version-control'}
            formDetails={data}
        >
            <VersionControl version={data} setVersion={setData} />
        </CreatePage>
    )
}