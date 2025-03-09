import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Users, UsersType} from '../Users'

const RESOURCE = 'users'
export function UserEdit() {
    const state = useLocation().state as {row: UsersType}
    const [user, setUser] = useState(state.row)
    return (
        <EditPage ge resource={RESOURCE} title="ویرایش کاربر" formDetails={user} initialData={state.row}>
            <Users user={user} setUser={setUser} />
        </EditPage>
    )
}
