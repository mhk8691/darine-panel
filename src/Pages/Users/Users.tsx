import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type UsersType = {
    id: number
    firstName: string
    lastName: string
    email: string
    username: string
    phoneNumber: string
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
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="first_name"
                        setData={setUser}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={user.firstName}
                    />,
                    <CustomTextField
                        name="last_name"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'نام خانوادگی'}
                        defaultValue={user.lastName}
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
                        defaultValue={user.phoneNumber}
                    />,
                ]}
            />
        </Stack>
    )
}
