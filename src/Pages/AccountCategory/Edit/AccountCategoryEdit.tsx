import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {AccountCategory, AccountCategoryType} from '../AccountCategory'

const RESOURCE = 'account-category'
export function AccountCategoryEdit() {
    const state = useLocation().state as {row: AccountCategoryType}
    const [category, setCategory] = useState(state.row)
    const formData = new FormData()
    useEffect(() => {
        formData.append('name', category.name)
        formData.append('image', category.image)
    }, [category, setCategory])
    return (
        <EditPage resource={RESOURCE} title="ویرایش دسته بندی" formDetails={formData}>
            <AccountCategory category={category} setCategory={setCategory} />
        </EditPage>
    )
}
