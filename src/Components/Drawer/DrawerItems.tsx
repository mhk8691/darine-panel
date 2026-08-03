import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import HandshakeIcon from '@mui/icons-material/Handshake'
import ImageIcon from '@mui/icons-material/Image'
import CallReceivedIcon from '@mui/icons-material/CallReceived'
import CallMadeIcon from '@mui/icons-material/CallMade'
import AssignmentIcon from '@mui/icons-material/Assignment'
import {
    CardMembershipRounded,
    CurrencyExchange,
    SupportAgent,
    WorkspacePremium,
} from '@mui/icons-material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CampaignIcon from '@mui/icons-material/Campaign'
import DiamondIcon from '@mui/icons-material/Diamond'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {ReactNode} from 'react'

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export type DrawerSection = 'both' | 'darineh' | 'silver'

export type DrawerItemType = {
    title: string
    link: string
    role: string
    section: DrawerSection
    icon: ReactNode
    // when present, the item is rendered nested inside a collapsible
    // group instead of as a standalone top-level entry
    groupId?: string
}

export type DrawerGroupType = {
    id: string
    title: string
    icon: ReactNode
    section: DrawerSection
}

const iconStyle = {fontSize: '1.9rem !important'}
const groupIconStyle = {fontSize: '1.6rem !important'}

// ----------------------------------------------------------------------
// Groups (collapsible headers).
//
// Grouping rule: each group only holds pages that are directly the same
// kind of thing (e.g. the different order types traded against the gold
// price, or the plan + its resulting instance), not just "similar topic".
// Anything that doesn't have a tight sibling stays a standalone item
// (e.g. "قیمت طلا" — the live market price — isn't an order or a
// transaction, so it isn't forced into either group).
// ----------------------------------------------------------------------

export const drawerGroups: DrawerGroupType[] = [
    // both
    {
        id: 'both-categories',
        title: 'دسته‌بندی‌ها',
        icon: <CategoryIcon sx={groupIconStyle} />,
        section: 'both',
    },
    // darineh (gold)
    {
        id: 'darineh-store',
        title: 'فروشگاه دارینه',
        icon: <StorefrontIcon sx={groupIconStyle} />,
        section: 'darineh',
    },
    {
        id: 'darineh-orders',
        title: 'سفارش‌های طلا',
        icon: <DiamondIcon sx={groupIconStyle} />,
        section: 'darineh',
    },
    {
        id: 'darineh-guarantee',
        title: 'تضمین قیمت',
        icon: <WorkspacePremium sx={groupIconStyle} />,
        section: 'darineh',
    },
    {
        id: 'darineh-investment',
        title: 'سرمایه‌گذاری طلا',
        icon: <TrendingUpIcon sx={groupIconStyle} />,
        section: 'darineh',
    },
    {
        id: 'darineh-finance',
        title: 'واریز و برداشت',
        icon: <CreditCardIcon sx={groupIconStyle} />,
        section: 'darineh',
    },
    {
        id: 'darineh-content',
        title: 'محتوا و اطلاع‌رسانی',
        icon: <CampaignIcon sx={groupIconStyle} />,
        section: 'darineh',
    },
    // silver
    {
        id: 'silver-store',
        title: 'فروشگاه نقرینه',
        icon: <StorefrontIcon sx={groupIconStyle} />,
        section: 'silver',
    },
    {
        id: 'silver-orders',
        title: 'سفارش‌های نقره',
        icon: <DiamondIcon sx={groupIconStyle} />,
        section: 'silver',
    },
    {
        id: 'silver-finance',
        title: 'واریز و برداشت',
        icon: <CreditCardIcon sx={groupIconStyle} />,
        section: 'silver',
    },
    {
        id: 'silver-content',
        title: 'محتوا و اطلاع‌رسانی',
        icon: <CampaignIcon sx={groupIconStyle} />,
        section: 'silver',
    },
]

// ----------------------------------------------------------------------
// Items
// ----------------------------------------------------------------------

export const drawerItems: DrawerItemType[] = [
    // both (standalone, ungrouped)
    {
        title: 'پیشخوان',
        link: '',
        role: 'all',
        section: 'both',
        icon: <DashboardIcon sx={iconStyle} />,
    },
    {
        title: 'کاربران',
        link: 'users',
        role: 'admin',
        section: 'both',
        icon: <GroupIcon sx={iconStyle} />,
    },
    {
        title: 'تیکت ها',
        link: 'tickets',
        role: 'all',
        section: 'both',
        icon: <SupportAgent sx={iconStyle} />,
    },
    {
        title: 'دسته بندی',
        link: 'category',
        role: 'all',
        section: 'both',
        icon: <CategoryIcon sx={iconStyle} />,
        groupId: 'both-categories',
    },
    {
        title: 'دسته بندی تیکت ها',
        link: 'ticket-categories',
        role: 'all',
        section: 'both',
        icon: <CategoryIcon sx={iconStyle} />,
        groupId: 'both-categories',
    },
    {
        title: 'درخواست همکاری',
        link: 'partners',
        role: 'all',
        section: 'both',
        icon: <HandshakeIcon sx={iconStyle} />,
    },
    {
        title: 'لاگ',
        link: 'logs',
        role: 'all',
        section: 'both',
        icon: <AssignmentIcon sx={iconStyle} />,
    },
    {
        title: 'قیمت لحظه ای',
        link: 'live-price',
        role: 'all',
        section: 'both',
        icon: <CurrencyExchange sx={iconStyle} />,
    },
    // {
    //     title: 'حساب کاربری',
    //     link: 'profile',
    //     role: 'all',
    //     section: 'both',
    //     icon: <AccountCircleIcon sx={iconStyle} />,
    // },

    // darineh -> فروشگاه دارینه (product catalog + what customers buy with it)
    {
        title: 'محصولات دارینه',
        link: 'products',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingBasketIcon sx={iconStyle} />,
        groupId: 'darineh-store',
    },
    {
        title: 'سفارشات',
        link: 'orders',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingBagIcon sx={iconStyle} />,
        groupId: 'darineh-store',
    },
    {
        title: 'کارت هدیه',
        link: 'gift-cards',
        role: 'all',
        section: 'darineh',
        icon: <CardGiftcardIcon sx={iconStyle} />,
        groupId: 'darineh-store',
    },

    // darineh -> سفارش‌های طلا (the different order types traded against gold)
    {
        title: 'سفارشات طلای آب شده',
        link: 'gold-transactions',
        role: 'all',
        section: 'darineh',
        icon: <DiamondIcon sx={iconStyle} />,
        groupId: 'darineh-orders',
    },
    {
        title: 'سفارش تعهدی',
        link: 'gold-short-orders',
        role: 'all',
        section: 'darineh',
        icon: <VerifiedUserIcon sx={iconStyle} />,
        groupId: 'darineh-orders',
    },
    {
        title: 'سفارش با قیمت',
        link: 'gold-limit-orders',
        role: 'all',
        section: 'darineh',
        icon: <ShoppingCartIcon sx={iconStyle} />,
        groupId: 'darineh-orders',
    },

    // darineh -> تضمین قیمت (the plan, and the guarantees issued from it)
    {
        title: 'طرح های تضمین قیمت',
        link: 'gold-guarantee-plans',
        role: 'all',
        section: 'darineh',
        icon: <CardMembershipRounded sx={iconStyle} />,
        groupId: 'darineh-guarantee',
    },
    {
        title: 'تضمین قیمت',
        link: 'gold-guarantees',
        role: 'all',
        section: 'darineh',
        icon: <WorkspacePremium sx={iconStyle} />,
        groupId: 'darineh-guarantee',
    },

    // darineh -> سرمایه‌گذاری طلا (the plan, and the investments made against it)
    {
        title: 'طرح های سرمایه گذاری',
        link: 'gold-investment-plans',
        role: 'all',
        section: 'darineh',
        icon: <CardMembershipRounded sx={iconStyle} />,
        groupId: 'darineh-investment',
    },
    {
        title: 'سرمایه‌گذاری‌ها',
        link: 'gold-investments',
        role: 'all',
        section: 'darineh',
        icon: <TrendingUpIcon sx={iconStyle} />,
        groupId: 'darineh-investment',
    },

    // darineh -> واریز و برداشت (moving money in/out, and the cards used to do it)
    {
        title: 'واریز',
        link: 'OrderDeposit',
        role: 'all',
        section: 'darineh',
        icon: <CallReceivedIcon sx={iconStyle} />,
        groupId: 'darineh-finance',
    },
    {
        title: 'برداشت',
        link: 'OrderWithdraw',
        role: 'all',
        section: 'darineh',
        icon: <CallMadeIcon sx={iconStyle} />,
        groupId: 'darineh-finance',
    },
    {
        title: 'کارت های بانکی',
        link: 'gold-bank',
        role: 'all',
        section: 'darineh',
        icon: <CreditCardIcon sx={iconStyle} />,
        groupId: 'darineh-finance',
    },

    // darineh -> standalone: the live market price isn't an order or a
    // transaction, it's reference data — doesn't belong in either group
    {
        title: 'قیمت طلا',
        link: 'market/gold/offset',
        role: 'all',
        section: 'darineh',
        icon: <AttachMoneyIcon sx={iconStyle} />,
    },

    // darineh -> محتوا و اطلاع‌رسانی (what customers see on the storefront)
    {
        title: 'بنر ها',
        link: 'gold-banners',
        role: 'all',
        section: 'darineh',
        icon: <ImageIcon sx={iconStyle} />,
        groupId: 'darineh-content',
    },
    {
        title: 'اطلاعیه ها',
        link: 'gold-announcements',
        role: 'all',
        section: 'darineh',
        icon: <CampaignIcon sx={iconStyle} />,
        groupId: 'darineh-content',
    },

    // silver -> فروشگاه نقرینه
    {
        title: 'محصولات نقرینه',
        link: 'silver-products',
        role: 'all',
        section: 'silver',
        icon: <ShoppingBasketIcon sx={iconStyle} />,
        groupId: 'silver-store',
    },
    {
        title: 'سفارشات',
        link: 'silver-orders',
        role: 'all',
        section: 'silver',
        icon: <ShoppingBagIcon sx={iconStyle} />,
        groupId: 'silver-store',
    },

    // silver -> سفارش‌های نقره
    {
        title: 'سفارشات نقره آب شده',
        link: 'silver-transactions',
        role: 'all',
        section: 'silver',
        icon: <DiamondIcon sx={iconStyle} />,
        groupId: 'silver-orders',
    },
    {
        title: 'سفارش با قیمت',
        link: 'silver-limit-orders',
        role: 'all',
        section: 'silver',
        icon: <ShoppingCartIcon sx={iconStyle} />,
        groupId: 'silver-orders',
    },

    // silver -> واریز و برداشت
    {
        title: 'واریز',
        link: 'silver-OrderDeposit',
        role: 'all',
        section: 'silver',
        icon: <CallReceivedIcon sx={iconStyle} />,
        groupId: 'silver-finance',
    },
    {
        title: 'برداشت',
        link: 'silver-OrderWithdraw',
        role: 'all',
        section: 'silver',
        icon: <CallMadeIcon sx={iconStyle} />,
        groupId: 'silver-finance',
    },
    {
        title: 'کارت های بانکی',
        link: 'silver-bank',
        role: 'all',
        section: 'silver',
        icon: <CreditCardIcon sx={iconStyle} />,
        groupId: 'silver-finance',
    },

    // silver -> standalone: live market price, same reasoning as gold
    {
        title: 'قیمت نقره',
        link: 'market/silver/offset',
        role: 'all',
        section: 'silver',
        icon: <AttachMoneyIcon sx={iconStyle} />,
    },

    // silver -> محتوا و اطلاع‌رسانی
    {
        title: 'بنر ها',
        link: 'silver-banners',
        role: 'all',
        section: 'silver',
        icon: <ImageIcon sx={iconStyle} />,
        groupId: 'silver-content',
    },
    {
        title: 'اطلاعیه ها',
        link: 'silver-announcements',
        role: 'all',
        section: 'silver',
        icon: <CampaignIcon sx={iconStyle} />,
        groupId: 'silver-content',
    },
]
