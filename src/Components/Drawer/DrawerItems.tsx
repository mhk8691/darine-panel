import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
export const drawerItems = [
    // both
    {
        title: 'پیشخوان',
        link: '',
        role: 'all',
        section: 'both',
        icon: <DashboardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'کاربران',
        link: 'users',
        role: 'admin',
        section: 'both',
        icon: <GroupIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'دسته بندی',
        link: 'category',
        role: 'all',
        section: 'both',
        icon: <CategoryIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    // {
    //     title: 'حساب کاربری',
    //     link: 'profile',
    //     role: 'all',
    //     section: 'both',
    //     icon: <AccountCircleIcon sx={{fontSize: '1.9rem !important'}} />,
    // },

    // darineh
 
    {
        title: 'محصولات دارینه',
        link: 'product',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingBasketIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'سفارشات',
        link: 'orders',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingBagIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'کارت های بانکی',
        link: 'gold-card',
        role: 'all',
        section: 'darineh',
        icon: <CreditCardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'کارت هدیه',
        link: 'gift-cards',
        role: 'all',
        section: 'darineh',
        icon: <CardGiftcardIcon sx={{fontSize: '1.9rem !important'}} />,
    },

    // silver
    {
        title: 'محصولات نقرینه',
        link: 'silver-product',
        role: 'all',
        section: 'silver',
        icon: <ShoppingBasketIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'سفارشات',
        link: 'silver-orders',
        role: 'all',
        section: 'silver',
        icon: <ShoppingBagIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'کارت های بانکی',
        link: 'silver-card',
        role: 'all',
        section: 'silver',
        icon: <CreditCardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
]