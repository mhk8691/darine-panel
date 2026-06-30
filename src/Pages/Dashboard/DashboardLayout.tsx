import {Box, Grid, Typography, Divider} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {DataProvider} from '../../Core/DataProvider'
import {formatPrice} from '../../Core/FormatPrice'
import {setUtil} from '../../redux/UtilSlice'

import Widgets from './Widgets'
import  { ChartData } from './StatsChart'
import ServerResourceCharts from './ServerResourceCharts.'
import DifferentChart, { BuySellChartData } from './DifferentChart'
import StatsChart from './StatsChart'

interface DashboardStatsType {
    users: number
    products: number
    gold_products: number
    silver_products: number
    orders: number
    silver_orders: number
    wallet_balance: number
}

// اصلاح شده: ساختار server با توجه به ریسپانس واقعی
interface AnalitycsType {
    users: number
    gold: {
        buy: number
        sell: number
    }
    silver: {
        buy: number
        sell: number
    }
    total_buy: number
    total_sell: number
    difference: number
    reports: {
        daily: number
        weekly: number
        monthly: number
    }
    wallets: {
        gold: number
        silver: number
    }
    server: {
        cpu: number
        ram: {
            total_gb: number
            used_gb: number
            free_gb: number
            percent: number
        }
        disk: {
            total_gb: number
            used_gb: number
            free_gb: number
            percent: number
        }
    }
}

export const CURRENT_YEAR = 1405
export interface FilterState {
    year: number
    month: string
}

function SectionHeader({title, color}: {title: string; color: string}) {
    return (
        <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mt: 4, mb: 1}}>
                <Divider sx={{flex: 1, borderColor: color, opacity: 0.4}} />
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: color,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        whiteSpace: 'nowrap',
                        px: 1,
                    }}
                >
                    {title}
                </Typography>
                <Divider sx={{flex: 1, borderColor: color, opacity: 0.4}} />
            </Box>
        </Grid>
    )
}

export default function DashboardLayout() {
    const [salesChartData,setSalesChartData] = useState<ChartData[]>([])
    const [buyChartData,setBuyChartData] = useState<ChartData[]>([])
    const [buySellData,setBuySellData] = useState<BuySellChartData[]>([])

    const [data, setData] = useState<DashboardStatsType | null>(null)
    
    const [analitycs, setAnalitycs] = useState<AnalitycsType>({} as AnalitycsType)
    const dispatch = useDispatch()
    const [salesFilter, setSalesFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })
    const [buyFilter, setBuyFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })
    
    const [differentFilter, setDifferentFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<DashboardStatsType>('dashboard/')
                setData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getData()
    }, [dispatch])

    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams();
            if (salesFilter.year) {
                query.append('year', salesFilter.year+'')
            }
            if (salesFilter.month) {
                query.append('month', salesFilter.month)
            }
            try {
                const response = await DataProvider.get<ChartData[]>(`analytics/chart/?${query.toString()}`)
                setSalesChartData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, salesFilter])

    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams();
            if (differentFilter.year) {
                query.append('year', differentFilter.year+'')
            }
            if (differentFilter.month) {
                query.append('month', differentFilter.month)
            }
            try {
                const response = await DataProvider.get<BuySellChartData[]>(`analytics/buy-sell-chart/?${query.toString()}`)
                setBuySellData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, differentFilter])

    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams();
            if (buyFilter.year) {
                query.append('year', buyFilter.year+'')
            }
            if (buyFilter.month) {
                query.append('month', buyFilter.month)
            }
            try {
                const response = await DataProvider.get<ChartData[]>(`analytics/purchase-chart/?${query.toString()}`)
                setBuyChartData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, buyFilter])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<AnalitycsType>('analytics/')
                setAnalitycs(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getData()
    }, [dispatch])

    const loading = !data

    // تابع کمکی برای تبدیل داده‌های server به فرمت مورد نیاز
    const getServerData = () => {
        if (!analitycs.server) {
            return {
                cpu: 0,
                ram: { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 },
                disk: { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 }
            }
        }
        
        // اگر server به فرمت قدیمی (ram و disk عددی) بود، تبدیل کن
        const server = analitycs.server as any;
        
        return {
            cpu: server.cpu || 0,
            ram: typeof server.ram === 'number' 
                ? { total_gb: 8, used_gb: server.ram, free_gb: 8 - server.ram, percent: (server.ram / 8) * 100 }
                : server.ram || { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 },
            disk: typeof server.disk === 'number'
                ? { total_gb: 8, used_gb: server.disk, free_gb: 8 - server.disk, percent: (server.disk / 8) * 100 }
                : server.disk || { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 }
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#0f0c08',
                color: '#fff',
            }}
        >
            <Box sx={{flex: 1, p: 3, display: 'flex'}}>
                <Grid container spacing={2} sx={{width: '100%', alignContent: 'flex-start'}}>
                    <SectionHeader title="آمار کلی" color="#aaaaaa" />
                    <Widgets
                        title="کاربران"
                        data={String(data?.users ?? 0)}
                        description={{title: 'کل کاربران سایت', status: 'increment'}}
                        icon="👤"
                        loading={loading}
                        link="/users"
                    />
                    <Widgets
                        title="کل محصولات"
                        data={String(data?.products ?? 0)}
                        description={{title: 'کل محصولات ثبت‌شده', status: 'increment'}}
                        icon="📦"
                        loading={loading}
                    />
                    <Widgets
                        title="مجموع خرید ها"
                        data={String(formatPrice(analitycs?.total_buy) ?? 0)}
                        description={{title: 'مجموع خرید های ثبت شده', status: 'increment'}}
                        icon="💸"
                        loading={loading}
                    />
                    <Widgets
                        title="مجموع فروش ها"
                        data={String(formatPrice(analitycs?.total_sell) ?? 0)}
                        description={{title: 'مجموع فروش های ثبت شده', status: 'increment'}}
                        icon="💵"
                        loading={loading}
                    />
                    <Widgets
                        title="اختلاف"
                        data={String(formatPrice(analitycs?.difference) ?? 0)}
                        description={{title: 'اختلاف خرید و فروش', status: 'increment'}}
                        icon="💵"
                        loading={loading}
                    />  

                    <SectionHeader title="🥇 طلا" color="#FFD700" />
                    <Widgets
                        title="محصولات طلا"
                        data={String(data?.gold_products ?? 0)}
                        description={{title: 'آمار محصولات طلا', status: 'increment'}}
                        icon="🥇"
                        loading={loading}
                        link="/products"
                    />
                    <Widgets
                        title="سفارشات طلا"
                        data={String(data?.orders ?? 0)}
                        description={{title: 'سفارشات ثبت شده طلا', status: 'increment'}}
                        icon="🛒"
                        loading={loading}
                        link="/orders"
                    />
                    <Widgets
                        title="خرید های طلا"
                        data={String(formatPrice(analitycs?.gold?.buy) ?? 0)}
                        description={{title: 'مجموع خرید های ثبت شده', status: 'increment'}}
                        icon="💸"
                        loading={loading}
                        link="/orders"
                    />
                    <Widgets
                        title="فروش های طلا"
                        data={String(formatPrice(analitycs?.gold?.sell) ?? 0)}
                        description={{title: 'مجموع فروش های ثبت شده', status: 'increment'}}
                        icon="💵"
                        loading={loading}
                        link="/orders"
                    />
                    <Widgets
                        title="کیف پول طلا"
                        data={formatPrice(analitycs?.wallets?.gold ?? 0)}
                        description={{title: 'موجودی کل سیستم', status: 'increment'}}
                        icon="💎"
                        loading={loading}
                    />

                    <SectionHeader title="🥈 نقره" color="#C0C0C0" />
                    <Widgets
                        title="محصولات نقره"
                        data={String(data?.silver_products ?? 0)}
                        description={{title: 'آمار محصولات نقره', status: 'increment'}}
                        icon="🥈"
                        loading={loading}
                        link="/silver-products"
                    />
                    <Widgets
                        title="سفارشات نقره"
                        data={String(data?.silver_orders ?? 0)}
                        description={{title: 'سفارشات ثبت شده نقره', status: 'increment'}}
                        icon="📑"
                        loading={loading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="خرید های نقره"
                        data={String(formatPrice(analitycs?.silver?.buy) ?? 0)}
                        description={{title: 'مجموع خرید های ثبت شده', status: 'increment'}}
                        icon="💸"
                        loading={loading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="فروش های نقره"
                        data={String(formatPrice(analitycs?.silver?.sell) ?? 0)}
                        description={{title: 'مجموع فروش های ثبت شده', status: 'increment'}}
                        icon="💵"
                        loading={loading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="کیف پول نقره"
                        data={formatPrice(analitycs?.wallets?.silver ?? 0)}
                        description={{title: 'موجودی کل سیستم', status: 'increment'}}
                        icon="💎"
                        loading={loading}
                    />

                    <SectionHeader title="🖥️ سرور" color="#64B5F6" />
                    <Grid item xs={12}>
                        <ServerResourceCharts data={getServerData()} />
                    </Grid>

                    <SectionHeader title="📊 نمودار فروش" color="#81C784" />
                    <Grid xs={12} item>
                        <StatsChart data={salesChartData} filter={salesFilter} setFilter={setSalesFilter} label='فروش' />
                    </Grid>

                    <SectionHeader title="📊 نمودار خرید" color="#81C784" />
                    <Grid xs={12} item>
                        <StatsChart data={buyChartData} filter={buyFilter} setFilter={setBuyFilter} label='خرید' />
                    </Grid>

                    <SectionHeader title="📊 نمودار اختلاف" color="#81C784" />
                    <Grid xs={12} item>
                        <DifferentChart data={buySellData} filter={differentFilter} setFilter={setDifferentFilter} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}