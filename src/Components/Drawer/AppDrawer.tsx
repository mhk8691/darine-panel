import {
    Box,
    Divider,
    ListItem,
    Stack,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
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
import darineLogo  from '../../Images/darineh.png'
import noghrineLogo  from '../../Images/noghrine.png'
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
    const isMobile = useMediaQuery(theme.breakpoints.down('mdl'))

    useEffect(() => {
        const value = location.pathname
        let checked = false

        drawerItems.forEach((item, index) => {
            if (value.toString().startsWith('/' + item.link)) {
                const newList = new Array(drawerItems.length).fill(false)
                newList[index] = true
                setSelected(newList)
                setSelectedTitle(item.title)
                checked = true
            }
        })

        if (!checked) setSelectedTitle('')
    }, [location.pathname])

    function handleClick(link, index, title) {
        const newList = new Array(drawerItems.length).fill(false)
        newList[index] = true
        setSelected(newList)
        setSelectedTitle(title)

        if (isMobile) setDrawerOpen(false)
        navigate(link)
    }

    const bothItems = drawerItems.filter((i) => i.section === 'both')
    const darinehItems = drawerItems.filter((i) => i.section === 'darineh')
    const silverItems = drawerItems.filter((i) => i.section === 'silver')

    const renderItems = (items) =>
        items.map((item) => {
            const index = drawerItems.findIndex((i) => i.link === item.link)

            if (!(item.role === user.role || item.role === 'all')) return null

            return (
                <ListItemButton
                    key={item.title}
                    onClick={() => handleClick(item.link, index, item.title)}
                    selected={selected[index]}
                    sx={{width: '100%', borderRadius: '8px'}}
                    classes={{
                        selected: classes.selected,
                        root: classes.mainSelected,
                    }}
                >
                    {isMobile ? (
                        <ListItemIcon sx={{color: selected[index] ? 'black' : '#606566'}}>
                            {item.icon}
                        </ListItemIcon>
                    ) : (
                        <Tooltip title={item.title} placement="left" arrow>
                            <ListItemIcon sx={{color: selected[index] ? 'black' : '#606566'}}>
                                {item.icon}
                            </ListItemIcon>
                        </Tooltip>
                    )}

                    <Typography
                        variant="bodyMd"
                        sx={{
                            color: selected[index] ? 'black' : 'grey.600',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {item.title}
                    </Typography>
                </ListItemButton>
            )
        })

    return (
        <Stack>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
                classes={{paper: classes.drawerPaper}}
                sx={{
                    zIndex: 1000,
                    overflow: 'hidden',
                    '& .MuiDrawer-paper': {
                        width: 220,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {display: 'none'},
                    },
                    '& .MuiPaper-root': {
                        backgroundImage: 'none',
                    },
                }}
            >
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        py: '1rem',
                        mt: isMobile ? 8 : 0,
                    }}
                >
                    {isMobile && (
                        <ListItem>
                            <AppbarProfile user={user} />
                        </ListItem>
                    )}

                    <Typography sx={{fontWeight: 700, fontSize: 18, mt: 1,mb:2,ml:1.5}}>
                       پنل
                    </Typography>
                    {renderItems(bothItems)}

                    <Divider sx={{my: 2}} />

                  
                    <Stack direction={'row'} alignItems={'center'} ml={1.5} mb={2} gap={1}>
                        <Box component={'img'} src={darineLogo} width={30} height={30} />
                          <Typography sx={{fontWeight: 700, fontSize: 18}}>
                        دارینه
                    </Typography>
                    </Stack>
                    {renderItems(darinehItems)}

                    <Divider sx={{my: 2}} />

                   <Stack direction={'row'} alignItems={'center'} ml={1.5} mb={2} gap={1}>
                        <Box component={'img'} src={noghrineLogo} width={30} height={30} />
                          <Typography sx={{fontWeight: 700, fontSize: 18}}>
                        نقرینه
                    </Typography>
                    </Stack>
                    {renderItems(silverItems)}
                </List>
            </Drawer>
        </Stack>
    )
}

export const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: `${theme.palette.background.main} !important`,
    },
    mainSelected: {
        width: '65px',
        height: '65px',
        borderRadius: '8px !important',
        '&$selected': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: 'white',
        },
    },
    selected: {},
}))