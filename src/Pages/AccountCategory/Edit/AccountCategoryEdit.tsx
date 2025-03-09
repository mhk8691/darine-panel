import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {AccountCategory, AccountCategoryType} from '../AccountCategory'

const RESOURCE = 'account-category'
export function AccountCategoryEdit() {
    const state = useLocation().state as {row: AccountCategoryType}
    const [category, setCategory] = useState(state.row)

    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش دسته بندی"
            formDetails={category}
            initialData={state.row}
        >
            <AccountCategory category={category} setCategory={setCategory} />
        </EditPage>
    )
}
