import {useState} from 'react'
import {EditPage} from '../../Components/Table/EditPage'
import {useAppSelector} from '../../redux/store'
import {Users, UsersType} from '../Users/Users'
const RESOURCE = 'users'

export default function Profile() {
    const profile = useAppSelector((state) => state.user)
    const [user, setUser] = useState<UsersType>(profile)
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش حساب کاربری"
            formDetails={user}
            initialData={profile}
        >
            <Users user={user} setUser={setUser} />
        </EditPage>
    )
}
