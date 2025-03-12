import {Button, Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {useState} from 'react'
import ImageUploader from '../../Components/Input/ImageUploader'

export type UsersType = {
    id: number
    first_name: string
    last_name: string
    email: string
    username: string
    phone_number: string
    role:string
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
    const [imagePreview, setImagePreview] = useState('')
    const [open, setOpen] = useState(false)
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
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {user.image ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>,
                ]}
            />
            <ImageUploader
                key={'user'}
                data={user}
                open={open}
                setOpen={setOpen}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setData={setUser}
            />
        </Stack>
    )
}
