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
    const formData = new FormData()
    useEffect(() => {
        formData.append('name', data.name)
        formData.append('introduction', data.introduction)
        formData.append('connection_method', data.connection_method)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('category', data.category)
        formData.append('image', data.image)
    }, [data, setData])
    return (
        <CreatePage title={'افزودن محصول'} resource={'procuts'} formDetails={formData}>
            <Products product={data} setProduct={setData} />
        </CreatePage>
    )
}
