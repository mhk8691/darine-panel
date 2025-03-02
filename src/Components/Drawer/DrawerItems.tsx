import CategoryIcon from '@mui/icons-material/Category'
import GamepadIcon from '@mui/icons-material/Gamepad'
import GroupIcon from '@mui/icons-material/Group'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
export const DrawerItems = [
    {title: 'مدیریت کاربران', link: 'users', icon: <GroupIcon fontSize="large" />},
    {title: 'مدیریت محصولات', link: 'products', icon: <LocalMallIcon fontSize="large" />},
    {
        title: 'دسته بندی محصولات',
        link: 'poruducts-category',
        icon: <CategoryIcon fontSize="large" />,
    },
    {title: 'اکانت های بازی', link: 'game-accounts', icon: <SportsEsportsIcon fontSize="large" />},
    {
        title: 'دسته بندی اکانت ها',
        link: 'accounts-category',
        icon: <GamepadIcon fontSize="large" />,
    },
]
