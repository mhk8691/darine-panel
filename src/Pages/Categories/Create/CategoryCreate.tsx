import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Categories} from '../Categories'

export function CategoryCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    const formData = new FormData()
    useEffect(() => {
        formData.append('name', data.name)
        formData.append('image', data.image)
    }, [data, setData])
    return (
        <CreatePage
            title={'افزودن دسته بندی'}
            resource={'account-category'}
            formDetails={formData}
        >
            <Categories category={data} setCategory={setData} />
        </CreatePage>
    )
}
