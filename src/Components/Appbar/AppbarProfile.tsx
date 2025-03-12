import {Avatar, Button, Popover, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {logout} from '../../redux/user_slice'

const AppbarProfile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const dispatch = useAppDispatch()
    const {username, profile_image, email} = useAppSelector((state) => state.user)

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
                direction="row"
                alignItems="center"
                gap={1}
                sx={{cursor: 'pointer'}}
                onClick={handleOpen}
            >
                <Typography fontWeight={600} variant="subtitle2" noWrap>
                    {username}
                </Typography>
                <Avatar alt="profile image" src={profile_image} sx={{height: 35, width: 35}} />
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
                <Stack
                    p="15px"
                    bgcolor="background.main"
                    minWidth="200px"
                    gap={1}
                >
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar
                            alt="profile image"
                            src={profile_image}
                            sx={{height: 45, width: 45}}
                        />
                        <Stack>
                            <Typography variant="bodyLg" fontWeight={700}>
                                {username}
                            </Typography>
                            <Typography variant="caption" fontWeight={600}>
                                {email}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around">
                        <Link to="/profile">
                            <Button variant="text" size="small">
                                تنظیمات حساب
                            </Button>
                        </Link>
                        <Button variant="text" size="small">
                            خروج
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </Stack>
    )
}

export default AppbarProfile
