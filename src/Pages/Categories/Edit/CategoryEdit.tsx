import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Categories, CategoriesType} from '../Categories'

const RESOURCE = 'categories'
export function CategoryEdit() {
    const state = useLocation().state as {row: CategoriesType}
    const [category, setCategory] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات دسته بندی"
            formDetails={category}
            initialData={state.row}
            isFormData={true}
            redirect={'category'}
        >
            <Categories category={category} setCategory={setCategory}  />
        </EditPage>
    )
}
