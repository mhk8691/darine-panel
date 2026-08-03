import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Box,
    Collapse,
    Divider,
    ListItem,
    Stack,
    Theme,
    Tooltip,
    Typography,
    alpha,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import {cloneElement, isValidElement, useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ProfileType} from '../../Core/types'
import AppbarProfile from '../Appbar/AppbarProfile'
import {DrawerGroupType, DrawerItemType, DrawerSection, drawerGroups, drawerItems} from './DrawerItems'
import darineLogo from '../../Images/darine.png'
import noghrineLogo from '../../Images/noghrine.png'

type Accent = {main: string; soft: string; gradient: string}

const ACCENTS: Record<DrawerSection, Accent> = {
    both: {
        main: '#4E5BD1',
        soft: alpha('#4E5BD1', 0.12),
        gradient: 'linear-gradient(135deg, #7B85E6 0%, #3B45B8 100%)',
    },
    darineh: {
        main: '#B4832F',
        soft: alpha('#B4832F', 0.12),
        gradient: 'linear-gradient(135deg, #E7C077 0%, #A9791F 100%)',
    },
    silver: {
        main: '#7C8797',
        soft: alpha('#7C8797', 0.12),
        gradient: 'linear-gradient(135deg, #D7DCE3 0%, #8B96A5 100%)',
    },
}

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
    const [openGroupId, setOpenGroupId] = useState<string | null>(null)
    const theme = useTheme()
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

                if (item.groupId) {
                    setOpenGroupId(item.groupId)
                }
            }
        })

        if (!checked) setSelectedTitle('')
    }, [location.pathname])

function handleClick(item: DrawerItemType, index: number) {
    if (item.disabled) return

    const newList = new Array(drawerItems.length).fill(false)
    newList[index] = true
    setSelected(newList)
    setSelectedTitle(item.title)

    if (isMobile) setDrawerOpen(false)
    navigate(item.link)
}
    function toggleGroup(groupId: string) {
        setOpenGroupId((prevId) => (prevId === groupId ? null : groupId))
    }

    const bothItems = drawerItems.filter((i) => i.section === 'both')
    const darinehItems = drawerItems.filter((i) => i.section === 'darineh')
    const silverItems = drawerItems.filter((i) => i.section === 'silver')

    const bothGroups = useMemo(() => drawerGroups.filter((g) => g.section === 'both'), [])
    const darinehGroups = useMemo(() => drawerGroups.filter((g) => g.section === 'darineh'), [])
    const silverGroups = useMemo(() => drawerGroups.filter((g) => g.section === 'silver'), [])

    // ---- shared row renderer (top-level and nested items) ----
  const renderItem = (item: DrawerItemType, accent: Accent, nested: boolean) => {
    const index = drawerItems.findIndex((i) => i.link === item.link)
    if (!(item.role === user.role || item.role === 'all')) return null

    const isSelected = selected[index]
    const isDisabled = Boolean(item.disabled)

    return (
        <ListItemButton
            key={item.title + item.link}
            disabled={isDisabled}
            onClick={() => handleClick(item, index)}
            disableRipple
            sx={{
                width: '100%',
                minHeight: nested ? 40 : 46,
                borderRadius: '10px',
                py: nested ? 0.5 : 0.75,
                pInlineStart: nested ? 1.5 : 1.25,
                pInlineEnd: 1,
                gap: 1,
                borderInlineStart: '3px solid transparent',
                transition: 'all .15s ease',
                backgroundColor: isSelected ? accent.soft : 'transparent',
                borderInlineStartColor: isSelected ? accent.main : 'transparent',
                
                // ---- استایل حالت غیرفعال (کم‌رنگ و غیرقابل کلیک) ----
                '&.Mui-disabled': {
                    opacity: 0.35, // شفافیت کمتر برای کم‌رنگ‌تر شدن کامپوننت
                    cursor: 'not-allowed',
                    pointerEvents: 'auto', // نمایش آیکون not-allowed موس
                    filter: 'grayscale(60%)', // خاکستری و کم‌رنگ‌تر کردن رنگ آیکون‌ها
                },
                '&:hover': {
                    backgroundColor: isDisabled
                        ? 'transparent'
                        : isSelected
                        ? accent.soft
                        : alpha(accent.main, 0.06),
                },
            }}
        >
            {isMobile ? (
                <ListItemIcon
                    sx={{
                        minWidth: nested ? 30 : 36,
                        color: isSelected ? accent.main : '#828A96',
                        '& svg': {fontSize: nested ? '1.35rem' : '1.6rem'},
                    }}
                >
                    {item.icon}
                </ListItemIcon>
            ) : (
                <Tooltip title={isDisabled ? `${item.title} (غیرفعال)` : item.title} placement="left" arrow>
                    <ListItemIcon
                        sx={{
                            minWidth: nested ? 30 : 36,
                            color: isSelected ? accent.main : '#828A96',
                            '& svg': {fontSize: nested ? '1.35rem' : '1.6rem'},
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                </Tooltip>
            )}

            <Typography
                variant="bodyMd"
                sx={{
                    color: isSelected ? 'text.primary' : 'grey.600',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: nested ? 13.5 : 14,
                    whiteSpace: 'nowrap',
                }}
            >
                {item.title}
            </Typography>
        </ListItemButton>
    )
}

    // ---- collapsible group header + its nested "ore vein" list ----
    const renderGroup = (group: DrawerGroupType, items: DrawerItemType[], accent: Accent) => {
        const groupItems = items.filter((i) => i.groupId === group.id)
        const visibleItems = groupItems.filter((i) => i.role === user.role || i.role === 'all')
        if (visibleItems.length === 0) return null

        const isOpen = openGroupId === group.id
        const isGroupActive = groupItems.some(
            (i) => selected[drawerItems.findIndex((di) => di.link === i.link)],
        )
        const chipActive = isOpen || isGroupActive

        const icon = isValidElement(group.icon)
            ? cloneElement(group.icon as React.ReactElement, {sx: {fontSize: '1.15rem !important'}})
            : group.icon

        return (
            <Box key={group.id}>
                <ListItemButton
                    onClick={() => toggleGroup(group.id)}
                    disableRipple
                    sx={{
                        width: '100%',
                        minHeight: 48,
                        borderRadius: '10px',
                        py: 0.75,
                        pInlineStart: 1.25,
                        pInlineEnd: 1,
                        gap: 1,
                        backgroundColor: chipActive ? accent.soft : 'transparent',
                        transition: 'background-color .2s ease',
                        '&:hover': {backgroundColor: alpha(accent.main, chipActive ? 0.16 : 0.08)},
                    }}
                >
                    <Box
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: chipActive ? '#fff' : accent.main,
                            background: chipActive ? accent.gradient : alpha(accent.main, 0.14),
                            transition: 'background .2s ease, color .2s ease',
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography
                        variant="bodyMd"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            fontSize: 14,
                            whiteSpace: 'nowrap',
                            color: chipActive ? 'text.primary' : 'grey.700',
                        }}
                    >
                        {group.title}
                    </Typography>

                    <ExpandMoreIcon
                        sx={{
                            fontSize: '1.3rem',
                            color: chipActive ? accent.main : '#A6ACB5',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform .25s cubic-bezier(.4,0,.2,1), color .2s ease',
                        }}
                    />
                </ListItemButton>

                <Collapse in={isOpen} timeout={220} unmountOnExit>
                    <Box
                        sx={{
                            position: 'relative',
                            mInlineStart: '17px',
                            pInlineStart: '16px',
                            my: 0.5,
                            borderInlineStart: '2px solid',
                            borderColor: alpha(accent.main, 0.22),
                        }}
                    >
                        <Stack gap={'2px'}>
                            {groupItems.map((item) => renderItem(item, accent, true))}
                        </Stack>
                    </Box>
                </Collapse>
            </Box>
        )
    }

    // ---- a full section: standalone items in order, then its groups ----
    const renderSection = (items: DrawerItemType[], groups: DrawerGroupType[], accent: Accent) => {
        const nodes: JSX.Element[] = []
        const renderedGroupIds = new Set<string>()

        items.forEach((item) => {
            if (!item.groupId) {
                const node = renderItem(item, accent, false)
                if (node) nodes.push(node)
                return
            }
            if (renderedGroupIds.has(item.groupId)) return
            renderedGroupIds.add(item.groupId)

            const group = groups.find((g) => g.id === item.groupId)
            if (!group) return
            const node = renderGroup(group, items, accent)
            if (node) nodes.push(node)
        })

        return nodes
    }

    const renderSectionHeading = (label: string, accent: Accent, logo?: string) => (
        <Stack direction="row" alignItems="center" gap={1.25} sx={{mb: 1.25, pInlineStart: 1.25}}>
            {logo ? (
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: accent.soft,
                        flexShrink: 0,
                    }}
                >
                    <Box component="img" src={logo} sx={{width: 19, height: 19, objectFit: 'contain'}} />
                </Box>
            ) : (
                <Box
                    sx={{
                        width: 9,
                        height: 9,
                        borderRadius: '3px',
                        background: accent.gradient,
                        flexShrink: 0,
                    }}
                />
            )}
            <Typography sx={{fontWeight: 800, fontSize: 15, letterSpacing: 0.1, color: 'text.primary'}}>
                {label}
            </Typography>
        </Stack>
    )

    return (
        <Stack>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
                sx={{
                    zIndex: 1000,
                    overflow: 'hidden',
                    '& .MuiDrawer-paper': {
                        width: 232,
                        overflowY: 'auto',
                        backgroundColor: (t: Theme) => `${t.palette.background.main} !important`,
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
                        gap: '3px',
                        px: 1,
                        py: '1rem',
                        mt: isMobile ? 8 : 0,
                    }}
                >
                    {isMobile && (
                        <ListItem sx={{px: 0.5}}>
                            <AppbarProfile user={user} />
                        </ListItem>
                    )}

                    {renderSectionHeading('پنل', ACCENTS.both)}
                    {renderSection(bothItems, bothGroups, ACCENTS.both)}

                    <Divider sx={{my: 2, borderColor: 'divider', opacity: 0.6}} />

                    {renderSectionHeading('دارینه', ACCENTS.darineh, darineLogo)}
                    {renderSection(darinehItems, darinehGroups, ACCENTS.darineh)}

                    <Divider sx={{my: 2, borderColor: 'divider', opacity: 0.6}} />

                    {renderSectionHeading('نقرینه', ACCENTS.silver, noghrineLogo)}
                    {renderSection(silverItems, silverGroups, ACCENTS.silver)}
                </List>
            </Drawer>
        </Stack>
    )
}

export const drawerWidth = 232