import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Accounts, AccountsType} from '../Accounts'

const RESOURCE = 'accounts'
export function AccountEdit() {
    const state = useLocation().state as {row: AccountsType}
    const [account, setAccount] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="ویرایش اکانت" formDetails={account} initialData={state.row}>
            <Accounts account={account} setAccount={setAccount}  />
        </EditPage>
    )
}
