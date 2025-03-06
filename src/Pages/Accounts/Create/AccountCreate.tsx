import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Accounts} from '../Accounts'

export function AccountCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    const formData = new FormData()
    useEffect(() => {
        formData.append('name', data.name)
        formData.append('introduction', data.introduction)
        formData.append('connection_method', data.connection_method)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('category', data.category)
        formData.append('video', data.video)
        data?.images?.forEach((image) => {
            formData.append('image', image)
        })
    }, [data, setData])
    return (
        <CreatePage title={'افزودن اکانت بازی'} resource={'accounts'} formDetails={formData}>
            <Accounts account={data} setAccount={setData} />
        </CreatePage>
    )
}
