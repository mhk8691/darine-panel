import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
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
    isProfile=false
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
    editMode?: boolean
    isProfile?:boolean
}) {
    const handleChange = (event: SelectChangeEvent) => {
        setUser((prev) => {
            return {...prev, role: event.target.value as 'superadmin' | 'admin' | 'user'}
        })
    }
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
                    !isProfile && (
                        <FormControl
                            fullWidth
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '54.56px !important',
                                },
                                '& .MuiSelect-select': {
                                    fontSize: '15px !important',
                                },
                                '& .Mui-disabled': {
                                    color: '#3f3f3f !important',
                                },
                            }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                    fontSize: '15px !important',
                                }}
                            >
                                نقش کاربر
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.role ?? ''}
                                label="نقش کاربر"
                                onChange={handleChange}
                                sx={{
                                    '& .MuiAutocomplete-listbox': {
                                        fontSize: '15px',
                                    },
                                    '& .MuiAutocomplete-option': {
                                        py: '12px !important',
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'user'}
                                >
                                    کاربر عادی
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'admin'}
                                >
                                    ادمین
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'superadmin'}
                                >
                                    سوپر ادمین
                                </MenuItem>
                            </Select>
                        </FormControl>
                    ),
                ]}
            />
        </Stack>
    )
}
