import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Users, UsersType} from '../Users'

const RESOURCE = 'users'
export function UserEdit() {
    const state = useLocation().state as {row: UsersType}
    const [user, setUser] = useState(state.row)
    useEffect(() => {
        setUser((prev) => {
            return {
                ...prev,
                profile_picture: prev.profile_picture ? prev.profile_picture : '',
            }
        })
    }, [])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش کاربر"
            formDetails={user}
            initialData={state.row}
            isFormData
            hasChange={false}
        >
            <Users user={user} setUser={setUser} editMode={true} />
        </EditPage>
    )
}
