import CategoryIcon from '@mui/icons-material/Category'
import GamepadIcon from '@mui/icons-material/Gamepad'
import GroupIcon from '@mui/icons-material/Group'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CableIcon from '@mui/icons-material/Cable'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
export const drawerItems = [
    {
        title: 'پیشخوان',
        link: '',
        role: 'all',
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
        role: 'admin',
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
        role: 'admin',
        link: 'products',
        icon: (
            <ShoppingBasketIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'دسته بندی محصولات',
        role: 'admin',
        link: 'product-category',
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
        role: 'admin',
        link: 'accounts',
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
        role: 'admin',
        link: 'account-category',
        icon: (
            <GamepadIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },

    {
        title: 'روش های اتصال',
        link: 'connection-methods',
        role: 'admin',
        icon: (
            <CableIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'سفارشات',
        link: 'orders',
        role: 'admin',
        icon: (
            <ShoppingBagIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },

    {
        title: 'حساب کاربری',
        link: 'profile',
        role: 'all',
        icon: (
            <AccountCircleIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
]
