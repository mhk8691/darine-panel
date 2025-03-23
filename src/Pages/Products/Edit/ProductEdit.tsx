import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Products, ProductsType} from '../Products'

const RESOURCE = 'product'
export function ProductEdit() {
    const state = useLocation().state as {row: ProductsType}
    const [product, setProduct] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="ویرایش محصول" formDetails={product} initialData={state.row}>
            <Products product={product} setProduct={setProduct} />
        </EditPage>
    )
}
