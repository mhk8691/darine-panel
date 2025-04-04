import {ListItem, Stack, Theme, Tooltip, Typography, useMediaQuery, useTheme} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ProfileType} from '../../Core/types'
import AppbarProfile from '../Appbar/AppbarProfile'
import {drawerItems} from './DrawerItems'

export function AppDrawer({
    setSelectedTitle,
    drawerOpen,
    user,
    setDrawerOpen,
}: {
    setSelectedTitle: (title: string) => void
    drawerOpen: boolean
    user: ProfileType
    setDrawerOpen: (open: boolean) => void
}) {
    const [selected, setSelected] = useState<boolean[]>(new Array(drawerItems.length).fill(false))
    const theme = useTheme()
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        const value = location.pathname
        let checked = false
        drawerItems.map((item) => {
            if (value.toString().startsWith('/' + item.link)) {
                let index = drawerItems.indexOf(item)
                let newList = new Array(drawerItems.length).fill(false)
                newList[index] = true
                setSelected(newList)
                setSelectedTitle(item.title)
                checked = true
            }
        })
        if (!checked) {
            setSelectedTitle('')
        }
    }, [location.pathname])

    function handleClick(link, index, title) {
        let newList = new Array(drawerItems.length).fill(false)
        newList[index] = true
        setSelected(newList)
        setSelectedTitle(title)
        if (isMobile) setDrawerOpen(false)
        navigate(link)
    }

    return (
        <Stack>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
                sx={{
                    zIndex: 1000,
                    overflow: 'hidden',
                    '& .MuiDrawer-paper': {
                        width: {xs: '250px', sm: '350px', md: '100px'},
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {display: 'none'},
                    },
                    '& .MuiPaper-root': {
                        backgroundImage: 'none',
                    },
                }}
            >
                <List
                    component="div"
                    disablePadding
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: {xs: 'flex-start', md: 'center'},
                        gap: '5px',
                        py: '1rem',
                        mt: isMobile ? 8 : 0,
                    }}
                >
                    {isMobile && (
                        <>
                            <ListItem sx={{textAlign: 'center'}}>
                                <AppbarProfile user={user} />
                            </ListItem>
                        </>
                    )}
                    {drawerItems.map(
                        (item, index) =>
                            (item.role === user.role || item.role === 'all') && (
                                <ListItemButton
                                    onClick={(event) => handleClick(item.link, index, item.title)}
                                    selected={selected[index]}
                                    sx={{
                                        width: {xs: '100%', md: '65px'},
                                        borderRadius: '8px',
                                    }}
                                    classes={{
                                        selected: classes.selected,
                                        root: classes.mainSelected,
                                    }}
                                    key={item.title}
                                >
                                    {isMobile ? (
                                        <ListItemIcon
                                            sx={{
                                                color: selected[index] ? 'white' : '#606566',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    ) : (
                                        <Tooltip title={item.title} placement="left" arrow>
                                            <ListItemIcon
                                                sx={{
                                                    color: selected[index] ? 'white' : '#606566',
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                        </Tooltip>
                                    )}
                                    {isMobile && (
                                        <Typography
                                            variant="bodyMd"
                                            sx={{
                                                color: selected[index] ? 'white' : 'grey.600',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    )}
                                </ListItemButton>
                            ),
                    )}
                </List>
            </Drawer>
        </Stack>
    )
}

export const drawerWidth = 100

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: `${theme.palette.background.main} !important`,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: `${theme.palette.background.main} !important`,
    },
    subMainSelected: {
        width: '65px',
        height: '65px',
        borderRadius: '8px !important',
        fontWeight: 500,
        fontSize: '32px',
        '&$selected': {
            backgroundColor: theme.palette.background.main,
            fontWeight: 700,
            color: 'white',
        },
    },
    mainSelected: {
        width: '65px',
        height: '65px',
        borderRadius: '8px !important',
        fontWeight: 500,
        '&$selected': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            fontWeight: 700,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },
    profileSelected: {
        padding: '10px 5px 10px 40px',
        marginBottom: '30px',
        fontWeight: 500,
        fontSize: '20px',
        boxSizing: 'border-box',
        overflowWrap: 'break-word',
        '&$selected': {
            backgroundColor: '#0487FF',
            fontWeight: 700,
            color: 'white',
            '&:hover': {
                backgroundColor: '#0487FF',
            },
        },
    },
    selected: {},
    listItemText: {
        fontWeight: 700,
        fontSize: '32px',
    },
    drawerFooter: {
        display: 'flex',
        marginLeft: '30px',
        alignItems: 'center',
        marginBottom: '40px',
    },
    drawerHeader: {
        display: 'flex',
        padding: '30px',
        alignItems: 'center',
    },
    boldText: {
        fontWeight: 700,
        fontSize: '20px',
    },
}))
