import {Box, Grid} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {DataProvider} from '../../Core/DataProvider'
import {formatPrice} from '../../Core/FormatPrice'
import {setUtil} from '../../redux/UtilSlice'

import Widgets from './Widgets'

interface DashboardType {
    users: number
    products: number
    gold_products: number
    silver_products: number
    orders: number
    silver_orders: number
    wallet_balance: number
}

export default function DashboardLayout() {
    const [data, setData] = useState<DashboardType | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<DashboardType>('dashboard/')
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

    const loading = !data

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#0f0c08', // luxury gold dark background
                color: '#fff',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        alignContent: 'flex-start',
                    }}
                >
                    <Widgets
                        title="کاربران"
                        data={String(data?.users ?? 0)}
                        description={{title: 'کل کاربران سایت', status: 'increment'}}
                        icon="👤"
                        loading={loading}
                        link='/users'
                    />

                    <Widgets
                        title="کل محصولات"
                        data={String(data?.products ?? 0)}
                        description={{title: 'کل محصولات ثبت‌شده', status: 'increment'}}
                        icon="📦"
                        loading={loading}
                    />
                    <Widgets
                        title="محصولات طلا"
                        data={String(data?.gold_products ?? 0)}
                        description={{title: 'آمار محصولات طلا', status: 'increment'}}
                        icon="🥇"
                        loading={loading}
                        link='/product'
                    />

                    <Widgets
                        title="محصولات نقره"
                        data={String(data?.silver_products ?? 0)}
                        description={{title: 'آمار محصولات نقره', status: 'increment'}}
                        icon="🥈"
                        loading={loading}
                        link='/silver-product'
                    />

                    <Widgets
                        title="سفارشات طلا"
                        data={String(data?.orders ?? 0)}
                        description={{title: ' سفارشات ثبت شده طلا', status: 'increment'}}
                        icon="🛒"
                        loading={loading}
                        link='/orders'
                    />

                    <Widgets
                        title="سفارشات نقره"
                        data={String(data?.silver_orders ?? 0)}
                        description={{title: 'سفارشات ثبت شده نقره', status: 'increment'}}
                        icon="📑"
                        loading={loading}
                        link='/silver-orders'
                    />

                    <Widgets
                        title="کیف پول سایت"
                        data={formatPrice(data?.wallet_balance ?? 0)}
                        description={{title: 'موجودی کل سیستم', status: 'increment'}}
                        icon="💎"
                        loading={loading}
                    />
                </Grid>
            </Box>
        </Box>
    )
}