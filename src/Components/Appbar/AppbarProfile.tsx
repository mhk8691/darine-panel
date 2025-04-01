import {Avatar, Button, Popover, Stack, Typography} from '@mui/material'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ProfileType} from '../../Core/types'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {logout} from '../../redux/user_slice'

const AppbarProfile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const token = useAppSelector((state) => state.user.token)
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get<{
                    data: ProfileType
                }>(`http://localhost:8000/api/auth/profile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                setProfile(response.data.data)
            } catch (error: any) {
                console.log(error)
            }
        }
        getProfile()
    }, [])
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        dispatch(logout())
        handleClose()
        navigate('/login')
    }

    const open = Boolean(anchorEl)

    return (
        <Stack>
            <Stack
                direction={{xs: 'row-reverse', md: 'row'}}
                alignItems="center"
                gap={1}
                sx={{cursor: 'pointer'}}
                onClick={handleOpen}
            >
                <Typography
                    fontWeight={600}
                    variant="subtitle2"
                    noWrap
                    sx={{
                        fontSize: {
                            xs: '15px',
                            md: '16px',
                        },
                    }}
                >
                    {profile.first_name}
                </Typography>
                <Avatar
                    alt="profile image"
                    src={profile.profile_picture || ''}
                    sx={{
                        height: {
                            xs: 45,
                            md: 35,
                        },
                        width: {
                            xs: 45,
                            md: 35,
                        },
                    }}
                />
            </Stack>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{mt: '1rem'}}
            >
                <Stack p="15px" bgcolor="background.main" minWidth="200px" gap={1}>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar
                            alt="profile image"
                            src={profile.profile_picture || ''}
                            sx={{height: 45, width: 45}}
                        />
                        <Stack>
                            <Typography
                                variant="bodyLg"
                                fontWeight={700}
                                fontSize={{xs: '15px', md: '16px'}}
                            >
                                {profile.first_name}
                            </Typography>
                            <Typography
                                variant="caption"
                                fontWeight={600}
                                fontSize={{xs: '12px', md: '14px'}}
                                sx={{
                                    mt: {
                                        xs: 0.5,
                                        md: 0,
                                    },
                                }}
                            >
                                {profile.phone_number}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                navigate('/profile')
                                handleClose()
                            }}
                        >
                            تنظیمات حساب
                        </Button>
                        <Button variant="text" size="small" onClick={handleLogout}>
                            خروج
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </Stack>
    )
}

export default AppbarProfile
