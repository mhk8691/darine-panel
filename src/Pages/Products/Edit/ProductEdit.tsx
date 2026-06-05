import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {Products} from '../Products'
import { ProductsListType } from '../List/ProductsList'

const RESOURCE = 'products'
export function ProductEdit() {
    const productId = useParams().id
    const [product, setProduct] = useState<ProductsListType>({} as ProductsListType)
    const [initialData, setInitialData] = useState<ProductsListType>({} as ProductsListType)
    const getProduct = async () => {
        try {
            let response = await DataProvider.get<ProductsListType>(`${RESOURCE}/${productId}/`)
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
            title="جزئیات محصول"
            formDetails={product}
            isFormData={true}
            redirect={'product'}
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
