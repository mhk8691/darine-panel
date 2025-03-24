import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Banners} from '../Banners'

export function BannerCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن بنر'}
            resource={'banners/'}
            isFormData={true}
            redirect={'banners'}
            formDetails={data}
        >
            <Banners banner={data} setBanner={setData} />
        </CreatePage>
    )
}
