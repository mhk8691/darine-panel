import {Avatar, Button, Popover, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {logout} from '../../redux/user_slice'

const AppbarProfile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const dispatch = useAppDispatch()
    const {username, image, email} = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
                    {username}
                </Typography>
                <Avatar
                    alt="profile image"
                    src={image}
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
                        <Avatar alt="profile image" src={image} sx={{height: 45, width: 45}} />
                        <Stack>
                            <Typography
                                variant="bodyLg"
                                fontWeight={700}
                                fontSize={{xs: '15px', md: '16px'}}
                            >
                                {username}
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
                                {email}
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
                        <Button variant="text" size="small" onClick={handleClose}>
                            خروج
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </Stack>
    )
}

export default AppbarProfile
