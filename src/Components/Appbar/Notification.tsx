import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import {
    Badge,
    Box,
    Divider,
    IconButton,
    Menu,
    Popover,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {DataProvider} from '../../Core/DataProvider'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {Link, useNavigate} from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import CampaignIcon from '@mui/icons-material/Campaign'
interface Notification {
    id: number
    massage: string
    link: string
    time: string
}
export default function Notification() {
    const [hidden, setHidden] = useState(true)
    const [notifications, setNotifications] = useState<Notification[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getNotification = async () => {
        try {
            const response = await DataProvider.get<Notification[] | null>('notif')
            setNotifications(response.data)
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
    }

    const calculateDifference = (targetDate: string) => {
        const now = new Date()
        const target = new Date(targetDate)
        const diffInMilliseconds = now.getTime() - target.getTime()

        const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)
        const diffInMinutes = diffInMilliseconds / (1000 * 60)

        if (diffInHours < 24 && diffInHours > 1) {
            return `${Math.floor(diffInHours)} ساعت `
        } else if (diffInHours < 1) {
            return `${Math.floor(diffInMinutes)} دقیقه `
        } else {
            return `${Math.floor(diffInDays)} روز `
        }
    }
     const handleSeen = async (id: number) => {
         try {
             await DataProvider.get(`notif/${id}`)
             getNotification()
         } catch (error: any) {
            console.log(error.message)
         }
     }
    const handleNaivgation = (item: Notification) => {
        navigate(item.link)
        handleSeen(item.id)
        handleClose()
    }
    useEffect(() => {
        getNotification()
    }, [])
   
    return (
        <>
            <Badge
                badgeContent={notifications?.length}
                color="error"
                overlap="circular"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <IconButton onClick={handleClick}>
                    <NotificationsNoneIcon sx={{color: 'primary.main', fontSize: '1.9rem'}} />
                </IconButton>
            </Badge>

            <Stack
                component={Popover}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    m: 3.5,
                }}
            >
                <Stack
                    sx={{
                        minWidth: '450px',
                        minHeight: '120px',
                        py: 2,
                        borderRadius: 3,
                        animation: !hidden ? 'show 0.3s ease-in-out' : 'none',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',

                        '@keyframes show': {
                            '0%': {
                                transform: 'translateY(5%)',
                                opacity: 0,
                            },
                            '100%': {
                                transform: 'translateY(0)',
                                opacity: 1,
                            },
                        },
                    }}
                >
                    <Stack direction="column" gap={1} alignItems={'center'} px={4}>
                        <Typography variant="body2" fontWeight={500} fontSize={16}>
                            اعلان ها
                        </Typography>
                        <Divider variant="middle" sx={{width: '100%', borderWidth: 0.5}} />
                    </Stack>
                    <Stack direction="column" gap={1} alignItems={'flex-start'} mt={1.5}>
                        {(notifications?.length || 0) > 0 ? (
                            notifications?.map((item) => (
                                <Stack
                                    component={'div'}
                                    sx={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0.5,
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        },
                                        px: 4,
                                    }}
                                >
                                    <Stack
                                        component={'div'}
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                        onClick={() => handleNaivgation(item)}
                                        width={'100%'}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                        py={1}
                                    >
                                        <CampaignIcon
                                            sx={{
                                                fontSize: '2.2rem',
                                            }}
                                            color="primary"
                                        />

                                        <Typography
                                            variant="body2"
                                            fontWeight={400}
                                            fontSize={15}
                                            sx={{
                                                lineHeight: '22.4px',
                                            }}
                                        >
                                            {item.massage}
                                        </Typography>
                                        <Typography
                                            variant="labelSm"
                                            color="primary.light"
                                            sx={{
                                                color: 'primary.light',
                                            }}
                                        >
                                            {calculateDifference(item.time)}
                                        </Typography>
                                    </Stack>
                                    <IconButton onClick={() => handleSeen(item?.id)} sx={{py: 1}}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            ))
                        ) : (
                            <Typography sx={{mx: 'auto', mt: '0.5rem'}} variant="bodyLg">
                                اعلانی برای نمایش وجود ندارد
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
