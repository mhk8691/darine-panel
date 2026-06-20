import {Box, Grid, Typography, Divider} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {DataProvider} from '../../Core/DataProvider'
import {formatPrice} from '../../Core/FormatPrice'
import {setUtil} from '../../redux/UtilSlice'

import Widgets from './Widgets'
import SalesChart, { ChartData } from './SalesChart'
import ServerResourceCharts from './ServerResourceCharts.'

interface DashboardStatsType {
    users: number
    products: number
    gold_products: number
    silver_products: number
    orders: number
    silver_orders: number
    wallet_balance: number
}

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
        ram: number
        disk: number
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
    const [chartData,setChartData] = useState<ChartData[]>([])
    const [data, setData] = useState<DashboardStatsType | null>(null)
    const [analitycs, setAnalitycs] = useState<AnalitycsType>({} as AnalitycsType)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState<FilterState>({
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
            if (filter.year) {
                query.append('year',filter.year+'')
            }
            if (filter.month) {
                query.append('month',filter.month)
            }
            try {
                const response = await DataProvider.get<ChartData[]>(`analytics/chart/?${query.toString()}`)
                setChartData(response.data)
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
    }, [dispatch,filter])
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
console.log(analitycs)
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
    <ServerResourceCharts
        data={analitycs?.server ?? {cpu: 0, ram: 0, disk: 0}}
        total={8}
    />
</Grid>

<SectionHeader title="📊 نمودار فروش" color="#81C784" />
<Grid xs={12} item>
    <SalesChart data={chartData} filter={filter} setFilter={setFilter} />
</Grid>

                </Grid>
            </Box>
        </Box>
    )
}