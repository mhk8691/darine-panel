import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Products} from '../Products'

export function ProductCreate({
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
            title={'افزودن محصول'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Products product={data} setProduct={setData} />
        </CreatePage>
    )
}
