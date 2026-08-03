import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Categories} from '../Categories'

export function CategoryCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن دسته بندی محصولات'}
            resource={'categories/'}
            isFormData={true}
            redirect={'category'}
            formDetails={data}
        >
            <Categories category={data} setCategory={setData} />
        </CreatePage>
    )
}
