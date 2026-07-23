import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ImageIcon from '@mui/icons-material/Image';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import { CardMembershipRounded, CurrencyExchange, SupportAgent, WorkspacePremium } from '@mui/icons-material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CampaignIcon from '@mui/icons-material/Campaign';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

    {
        title: 'تیکت ها',
        link: 'tickets',
        role: 'all',
        section: 'both',
        icon: <SupportAgent sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'دسته بندی تیکت ها',
        link: 'ticket-categories',
        role: 'all',
        section: 'both',
        icon: <CategoryIcon sx={{fontSize: '1.9rem !important'}} />,
    },
     
      {
        title: 'درخواست همکاری',
        link: 'partners',
        role: 'all',
        section: 'both',
        icon: <HandshakeIcon sx={{fontSize: '1.9rem !important'}} />,
    },
        {
        title: 'لاگ',
        link: 'logs',
        role: 'all',
        section: 'both',
        icon: <AssignmentIcon sx={{fontSize: '1.9rem !important'}} />,
    },
           {
        title: 'قیمت لحظه ای',
        link: 'live-price',
        role: 'all',
        section: 'both',
        icon: <CurrencyExchange sx={{fontSize: '1.9rem !important'}} />,
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
        link: 'products',
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
        title: 'سفارشات طلای آب شده',
        link: 'gold-transactions',
        role: 'all',
        section: 'darineh',
        icon: <DiamondIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'سفارش تعهدی',
        link: 'gold-short-orders',
        role: 'all',
        section: 'darineh',
        icon: <VerifiedUserIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'سفارش با قیمت',
        link: 'gold-limit-orders',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingCartIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'طرح های تضمین قیمت',
        link: 'gold-guarantee-plans',
        role: 'all',
        section: 'darineh',
        icon: <CardMembershipRounded sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'تضمین قیمت',
        link: 'gold-guarantees',
        role: 'all',
        section: 'darineh',
        icon: <WorkspacePremium sx={{fontSize: '1.9rem !important'}} />,
    },
     {
        title: 'واریز',
        link: 'OrderDeposit',
        role: 'all',
        section: 'darineh',
        icon: <CallReceivedIcon sx={{fontSize: '1.9rem !important'}} />,
    },
      {
        title: 'برداشت',
        link: 'OrderWithdraw',
        role: 'all',
        section: 'darineh',
        icon: <CallMadeIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'کارت های بانکی',
        link: 'gold-bank',
        role: 'all',
        section: 'darineh',
        icon: <CreditCardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
     {
        title: 'قیمت طلا',
        link: 'market/gold/offset',
        role: 'all',
        section: 'darineh',
        icon: <AttachMoneyIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'کارت هدیه',
        link: 'gift-cards',
        role: 'all',
        section: 'darineh',
        icon: <CardGiftcardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
      {
        title: 'بنر ها',
        link: 'gold-banners',
        role: 'all',
        section: 'darineh',
        icon: <ImageIcon sx={{fontSize: '1.9rem !important'}} />,
    },
          {
        title: 'اطلاعیه ها',
        link: 'gold-announcements',
        role: 'all',
        section: 'darineh',
        icon: <CampaignIcon sx={{fontSize: '1.9rem !important'}} />,
    },

    // silver
    {
        title: 'محصولات نقرینه',
        link: 'silver-products',
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
        title: 'سفارشات نقره آب شده',
        link: 'silver-transactions',
        role: 'all',
        section: 'silver',
        icon: <DiamondIcon sx={{fontSize: '1.9rem !important'}} />,
    },
       {
        title: 'سفارش با قیمت',
        link: 'silver-limit-orders',
        role: 'all',
        section: 'silver',
        icon: <ShoppingCartIcon sx={{fontSize: '1.9rem !important'}} />,
    },

      {
        title: 'واریز',
        link: 'silver-OrderDeposit',
        role: 'all',
        section: 'silver',
        icon: <CallReceivedIcon sx={{fontSize: '1.9rem !important'}} />,
    },
      {
        title: 'برداشت',
        link: 'silver-OrderWithdraw',
        role: 'all',
        section: 'silver',
        icon: <CallMadeIcon sx={{fontSize: '1.9rem !important'}} />,
    },
    {
        title: 'کارت های بانکی',
        link: 'silver-bank',
        role: 'all',
        section: 'silver',
        icon: <CreditCardIcon sx={{fontSize: '1.9rem !important'}} />,
    },
      {
        title: 'قیمت نقره',
        link: 'market/silver/offset',
        role: 'all',
        section: 'silver',
        icon: <AttachMoneyIcon sx={{fontSize: '1.9rem !important'}} />,
    },
          {
        title: 'بنر ها',
        link: 'silver-banners',
        role: 'all',
        section: 'silver',
        icon: <ImageIcon sx={{fontSize: '1.9rem !important'}} />,
    },
          {
        title: 'اطلاعیه ها',
        link: 'silver-announcements',
        role: 'all',
        section: 'silver',
        icon: <CampaignIcon sx={{fontSize: '1.9rem !important'}} />,
    },
]