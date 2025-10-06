import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Categories, CategoriesType} from '../Categories'
import { CustomTextField } from '../../../Components/Input/CustomTextField'

const RESOURCE = 'category'
export function CategoryEdit() {
    const state = useLocation().state as {row: CategoriesType}
    const [category, setCategory] = useState(state.row)
    const element = [
        <CustomTextField
            name="id"
            resource={RESOURCE}
            disabled
            label={'آیدی'}
            defaultValue={category.id}
        />,
        <CustomTextField
            name="children_count"
            resource={RESOURCE}
            disabled
            label={'تعداد زیر دسته بندی'}
            defaultValue={category.children_count}
        />,
        <CustomTextField
            name="products_count"
            resource={RESOURCE}
            disabled
            label={'تعداد محصولات'}
            defaultValue={category.products_count}
        />,
    ]
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش دسته بندی"
            formDetails={category}
            initialData={state.row}
            isFormData={true}
        >
            <Categories category={category} setCategory={setCategory} children={element} />
        </EditPage>
    )
}
