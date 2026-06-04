import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CableIcon from '@mui/icons-material/Cable'
import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ImageIcon from '@mui/icons-material/Image'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CreditCardIcon from '@mui/icons-material/CreditCard'
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
        role: 'all',
        link: 'product',
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
        title: 'دسته بندی',
        role: 'all',
        link: 'category',
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
        title: 'روش های اتصال',
        link: 'base-accounts',
        role: 'all',
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
        title: 'بنر',
        link: 'banners',
        role: 'all',
        icon: (
            <ImageIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'دیدگاه ها',
        link: 'comments',
        role: 'all',
        icon: (
            <InsertCommentIcon
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
        role: 'all',
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
        title: 'درخواست ها',
        link: 'requests',
        role: 'all',
        icon: (
            <AssignmentIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
    {
        title: 'کارت های بانکی',
        link: 'gold-card',
        role: 'all',
        icon: (
            <CreditCardIcon
                fontSize="large"
                sx={{
                    fontSize: '1.9rem !important',
                }}
            />
        ),
    },
      {
        title: 'کارت های بانکی 2',
        link: 'silver-card',
        role: 'all',
        icon: (
            <CreditCardIcon
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
