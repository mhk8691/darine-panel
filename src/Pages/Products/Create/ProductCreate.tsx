import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Products} from '../Products'

export function ProductCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن محصول'}
            resource={'product/'}
            isFormData={true}
            redirect={'product'}
            formDetails={data}
            
        >
            <Products product={data} setProduct={setData} />
        </CreatePage>
    )
}
