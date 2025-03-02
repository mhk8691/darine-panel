import CategoryIcon from '@mui/icons-material/Category'
import GamepadIcon from '@mui/icons-material/Gamepad'
import GroupIcon from '@mui/icons-material/Group'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import DashboardIcon from '@mui/icons-material/Dashboard'
export const DrawerItems = [
    {
        title: 'پیشخوان',
        link: '',
        icon: (
            <DashboardIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'مدیریت کاربران',
        link: 'users',
        icon: (
            <GroupIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'مدیریت محصولات',
        link: 'products',
        icon: (
            <LocalMallIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'دسته بندی محصولات',
        link: 'poruducts-category',
        icon: (
            <CategoryIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'اکانت های بازی',
        link: 'game-accounts',
        icon: (
            <SportsEsportsIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'دسته بندی اکانت ها',
        link: 'accounts-category',
        icon: (
            <GamepadIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
]
