import AddIcon from '@mui/icons-material/Add'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MessageIcon from '@mui/icons-material/Message'
import TtyIcon from '@mui/icons-material/Tty'
import {Button, Menu, MenuItem, Stack, Typography} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const addOptions = [
    {
        title: 'اکانت جدید',
        description: 'اکانت خودتون رو متصل کنید',
        link: 'social-accounts/create',
        icon: <ManageAccountsIcon sx={{fontSize: '30px'}} />,
    },
    {
        title: 'ارسال پیام جدید',
        description: 'پیام خودتون رو برای مخاطبان بفرستید',
        link: 'messages/create',
        icon: <MessageIcon sx={{fontSize: '30px'}} />,
    },
    {
        title: 'لیست مخاطب جدید',
        description: 'لیست مخاطبتون رو ایجاد کنید',
        link: 'contacts/create',
        icon: <TtyIcon sx={{fontSize: '30px'}} />,
    },
]

const NewActivity = () => {
    const [createMenuAnchorEl, setCreateMenuAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()

    const handleCreateMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setCreateMenuAnchorEl(event.currentTarget)
    }

    const handleCreateMenuClose = () => {
        setCreateMenuAnchorEl(null)
    }

    const createMenuOpen = Boolean(createMenuAnchorEl)

    return (
        <Stack direction="row" alignItems="center" gap={2} sx={{cursor: 'pointer'}}>
            <Stack>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateMenuClick}>
                    جدید
                </Button>
                <Menu
                    anchorEl={createMenuAnchorEl}
                    open={createMenuOpen}
                    onClose={handleCreateMenuClose}
                    disableScrollLock
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{mt: '1rem'}}
                >
                    {addOptions.map((item, index) => (
                        <MenuItem
                            sx={{
                                '&:hover': {
                                    bgcolor: 'background.light',
                                    transition: '0.3s ease',
                                },
                            }}
                            onClick={() => {
                                navigate(item.link)
                                setCreateMenuAnchorEl(null)
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1}>
                                <ListItemIcon
                                    sx={{
                                        padding: '8px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <Stack>
                                    <Typography variant="bodyMd" fontWeight={700}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="xSmall" fontWeight={600}>
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>
        </Stack>
    )
}

export default NewActivity
