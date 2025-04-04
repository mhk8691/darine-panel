import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import ProfileUploader from './ProfileUploader'
export type UsersType = {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    role: string
    profile_picture: string | File
    date_joined: string
}
const RESOURCE = 'users'

export function Users({
    user,
    setUser,
    editMode = false,
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
    editMode?: boolean
}) {
    return (
        <Stack>
            <ProfileUploader user={user} setUser={setUser} />
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        key={user.id}
                        name="first_name"
                        setData={setUser}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={user.first_name}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="last_name"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'نام خانوادگی'}
                        defaultValue={user.last_name}
                    />,

                    <CustomTextField
                        key={user.id}
                        name="phone_number"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'شماره تلفن'}
                        defaultValue={user.phone_number}
                        disabled={editMode}
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                bgcolor: 'background.light',
                            },
                        }}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="role"
                        resource={RESOURCE}
                        setData={setUser}
                        label={'نقش کاربر'}
                        defaultValue={user.role}
                    />,
                ]}
            />
        </Stack>
    )
}
