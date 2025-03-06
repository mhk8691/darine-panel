import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Categories,CategoriesType} from '../Categories'

const RESOURCE = 'product-category'
export function CategoryEdit() {
    const state = useLocation().state as {row: CategoriesType}
    const [category, setCategory] = useState(state.row)
     const formData = new FormData()
     useEffect(() => {
         formData.append('name', category.name)
         formData.append('image', category.image)
     }, [category, setCategory])
    return (
        <EditPage resource={RESOURCE} title="ویرایش دسته بندی" data={formData}>
            <Categories category={category} setCategory={setCategory} />
        </EditPage>
    )
}
