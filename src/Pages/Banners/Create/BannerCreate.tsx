import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Banners} from '../Banners'

export function BannerCreate({
    data,
    setData,
    resource
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    resource:string
}) {
    return (
        <CreatePage
            title={'افزودن بنر'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Banners banner={data} setBanner={setData} />
        </CreatePage>
    )
}
