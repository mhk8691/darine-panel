import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Products, ProductsType} from '../Products'
import {DataProvider} from '../../../Core/DataProvider'
import {ProductDetailType} from '../Detail/ProductDetail'

const RESOURCE = 'product'
export function ProductEdit() {
    const productId = useParams().id
    const [product, setProduct] = useState<ProductDetailType>({} as ProductDetailType)
    const [initialData, setInitialData] = useState<ProductDetailType>({} as ProductDetailType)
    const getProduct = async () => {
        try {
            let response = await DataProvider.get<ProductDetailType>(`product/${productId}/`)
            if (response) {
                setProduct(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct()
    }, [productId])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش محصول"
            formDetails={product}
            isFormData={true}
            initialData={initialData}
        >
            <Products
                product={product}
                setProduct={setProduct}
                editMode={true}
                getProduct={getProduct}
            />
        </EditPage>
    )
}
