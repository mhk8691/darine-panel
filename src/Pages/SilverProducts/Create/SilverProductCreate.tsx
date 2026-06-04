import {CreatePage} from '../../../Components/Table/CreatePage'
import { Products } from '../../Products/Products'
import { SilverProducts } from '../SilverProducts'

export function SilverProductCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {

    return (
        <CreatePage
            title={'افزودن محصول'}
            resource={'silver-products/'}
            isFormData={true}
            redirect={'silver-product'}
            formDetails={data}
        >
            <SilverProducts product={data} setProduct={setData} />
        </CreatePage>
    )
}
