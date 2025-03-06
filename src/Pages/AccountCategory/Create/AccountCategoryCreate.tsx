import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {AccountCategory} from '../AccountCategory'

export function AccountCategoryCreate({
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
            resource={'poruduct-category'}
            formDetails={formData}
        >
            <AccountCategory category={data} setCategory={setData} />
        </CreatePage>
    )
}
