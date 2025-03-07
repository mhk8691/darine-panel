import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Users, UsersType} from '../Users'

const RESOURCE = 'users'
export function UserEdit() {
    const state = useLocation().state as {row: UsersType}
    const [user, setUser] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="ویرایش کاربر" formDetails={user}>
            <Users user={user} setUser={setUser} />
        </EditPage>
    )
}
