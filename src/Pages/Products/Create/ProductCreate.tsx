import React, {useEffect, useState} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Products} from '../Products'

export function ProductCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        // ✅ اعتبارسنجی همه فیلدها به جز ویدیو
        const hasName = !!data?.name?.trim()
        const hasCategory =
            !!data?.category?.id || (typeof data?.category === 'number' && data?.category > 0)
        const hasConnectionMethod =
            !!data?.connection_method_id?.id ||
            (typeof data?.connection_method_id === 'number' && data?.connection_method_id > 0)
        const hasShortIntro = !!data?.short_introduction?.trim()
        const hasType = !!data?.type
        const hasInventory = typeof data?.inventory === 'boolean'
        const hasVisible = typeof data?.visible === 'boolean'

        setIsValid(
            hasName &&
                hasCategory &&
                hasConnectionMethod &&
                hasShortIntro &&
                hasType &&
                hasInventory &&
                hasVisible,
        )
    }, [data])
    return (
        <CreatePage
            title={'افزودن محصول'}
            resource={'product/'}
            isFormData={true}
            redirect={'product'}
            formDetails={data}
            disabled={!isValid}
        >
            <Products product={data} setProduct={setData} />
        </CreatePage>
    )
}
