import {Box, Stack} from '@mui/material'
import {useState} from 'react'
import Appbar from './Appbar/Appbar'
import {AppDrawer, drawerWidth} from './Drawer/AppDrawer'

const MainLayout = ({children}: {children: React.ReactNode}) => {
    const [selectedTitle, setSelectedTitle] = useState<string>('')
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <Stack direction="row" minHeight="100vh">
            <AppDrawer
                setSelectedTitle={setSelectedTitle}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
            <Box
                component="main"
                flexGrow={1}
                sx={{
                    ml: {xs: 0, md: `${drawerWidth}px`},
                    width: {xs: '100%', md: `calc(100% - ${drawerWidth}px)`},
                }}
            >
                <Appbar
                    selectedTitle={selectedTitle}
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                />
                <Box sx={{p: 1}}>{children}</Box>
            </Box>
        </Stack>
    )
}

export default MainLayout
