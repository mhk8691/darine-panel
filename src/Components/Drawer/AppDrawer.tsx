import {Stack, Theme, Typography} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {AppIcon} from '../Pictures/AppIcon'
import {DrawerItems} from './DrawerItems'

export function AppDrawer(props) {
    const classes = useStyles()
    const [selected, setSelected] = useState<boolean[]>(new Array(DrawerItems.length).fill(false))
    const navigate = useNavigate()
    const location = useLocation()
    const t = props.t
    // async function getEmployee() {
    //     let data = await DataProvider.getOne('employee/one/' + localStorage.getItem('id'))
    //     if (data && data.data) setEmployee(data.data)
    // }
    useEffect(() => {
        const value = location.pathname
        let checked = false
        for (let item of DrawerItems) {
            if (value.toString().startsWith('/' + item.link)) {
                let index = DrawerItems.indexOf(item)
                let newList = new Array(DrawerItems.length).fill(false)
                newList[index] = true
                setSelected(newList)
                checked = true
            }
        }

        // if (!checked && value.toString().startsWith('/profile')) setSelected(DrawerItems.length)
    }, [location.pathname])

    function handleClick(link, index) {
        let newList = new Array(DrawerItems.length).fill(false)
        newList[index] = true
        setSelected(newList)
        navigate(link)
    }

    // const roles = JSON.parse(sessionStorage.getItem('roles'))

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Stack direction="row" p="30px" alignItems={'center'}>
                <AppIcon />
                <Typography fontWeight={700} sx={{pl: '25px'}} variant="subtitle2" noWrap>
                    My Panel
                </Typography>
            </Stack>
            <List component="div" disablePadding>
                {DrawerItems.map((item, index) => (
                    <>
                        <ListItemButton
                            onClick={(event) => handleClick(item.link, index)}
                            selected={selected[index]}
                            key={item.title}
                            classes={{
                                selected: classes.selected,
                                root: classes.mainSelected,
                            }}
                        >
                            <ListItemIcon style={{color: selected[index] ? 'white' : '#606566'}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{variant: 'h6'}}
                                color={'secondary'}
                            />
                        </ListItemButton>
                    </>
                ))}
            </List>
        </Drawer>
    )
}

export const drawerWidth = 320

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    subMainSelected: {
        padding: '12px 50px',
        margin: '2px 12px',
        borderRadius: '8px',
        fontWeight: 500,
        fontSize: '32px',
        '&$selected': {
            backgroundColor: theme.palette.primary.main,
            fontWeight: 700,
            color: 'white',
            // '&:hover': {
            //     backgroundColor: theme.palette.primary.dark,
            // },
        },
    },
    mainSelected: {
        padding: '12px 16px',
        margin: '2px 12px',
        borderRadius: '8px',
        fontWeight: 500,
        fontSize: '32px',
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
        // whiteSpace: 'wrap',
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
