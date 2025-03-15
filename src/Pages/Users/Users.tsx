import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import ProfileUploader from './ProfileUploader'
export type UsersType = {
    id: number
    first_name: string
    last_name: string
    email: string
    username: string
    phone_number: string
    role: string
    image: string | File
}
const RESOURCE = 'users'

export function Users({
    user,
    setUser,
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
}) {
    return (
        <Stack>
            <ProfileUploader user={user} setUser={setUser} />
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
        </Stack>
    )
}
