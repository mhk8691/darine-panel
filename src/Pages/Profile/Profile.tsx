import {useState} from 'react'
import {EditPage} from '../../Components/Table/EditPage'
import {Users, UsersType} from '../Users/Users'
import {useAppSelector} from '../../redux/store'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
const RESOURCE = 'users'
interface Login {
    login: boolean
    token: string
}
interface Profile extends Login, UsersType {}
export default function Profile() {
    const profile = useAppSelector((state) => state.user)
    const [user, setUser] = useState<Profile>(profile)
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش حساب کاربری"
            formDetails={user}
            initialData={profile}
        >
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="first_name"
                        setData={setUser}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={user.first_name}
                    />,
                    <CustomTextField
                        name="last_name"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'نام خانوادگی'}
                        defaultValue={user.last_name}
                    />,
                    <CustomTextField
                        name="email"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'ایمیل'}
                        defaultValue={user.email}
                    />,
                    <CustomTextField
                        name="username"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'نام کاربری'}
                        defaultValue={user.username}
                    />,
                    <CustomTextField
                        name="phone_number"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'شماره تلفن'}
                        defaultValue={user.phone_number}
                    />,
                ]}
            />
        </EditPage>
    )
}
