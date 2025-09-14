import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import {Container, Grid} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {DataProvider} from '../../Core/DataProvider'
import {formatPrice} from '../../Core/FormatPrice'
import {setUtil} from '../../redux/UtilSlice'
import SalesChart from './SalesChart'
import Widgets from './Widgets'
interface GrowthData {
    current_month: number
    percentage_change: number
}
interface DashboardType {
    monthly_growth: {
        users: GrowthData
        orders: GrowthData
        revenue: GrowthData
    }
    annual_sales_overview: {
        month: string
        sales: number
    }[]
}
export default function DashboardLayout() {
    const [data, setData] = useState<DashboardType>({} as DashboardType)
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<DashboardType>('dashboard/stats/')
                setData(response.data)
                console.log(response.data)
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        }
        getData()
    }, [dispatch])
    const calculateChange: (percentageChange: number) => {
        title: string
        status: 'increment' | 'decrement'
    } = (percentageChange: number) => {
        if (percentageChange >= 0) {
            return {title: `${percentageChange}%  افزایش یافته است`, status: 'increment'}
        } else {
            return {title: `${percentageChange}% کاهش یافته است`, status: 'decrement'}
        }
    }
    const formatMonth = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fa-IR', {
            month: 'long',
        }).format(date)
    }
    const loading = !data?.monthly_growth

    const sortPersianMonths = (data: {month: string; sales: number}[]) => {
        return data.sort((a, b) => {
            const aMonth = new Date(a.month).getMonth() + 1 // 1 تا 12
            const bMonth = new Date(b.month).getMonth() + 1

            const shift = 4
            const aPersianOrder = (aMonth - shift + 12) % 12
            const bPersianOrder = (bMonth - shift + 12) % 12

            return aPersianOrder - bPersianOrder
        })
    }
    const salesData = sortPersianMonths(data?.annual_sales_overview || []).map((item) => ({
        month: formatMonth(item.month),
        sales: item.sales,
    }))
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} rowSpacing={3} sx={{marginTop: '1rem'}}>
                <Widgets
                    title="درآمد ماهانه"
                    data={formatPrice(data?.monthly_growth?.revenue?.current_month || 0)}
                    description={calculateChange(
                        data?.monthly_growth?.revenue?.percentage_change || 0,
                    )}
                    icon={<AttachMoneyIcon fontSize={'large'} />}
                    loading={loading}
                />

                <Widgets
                    title="سفارشات ماهانه"
                    data={String(data?.monthly_growth?.orders?.current_month || 0)}
                    description={calculateChange(
                        data?.monthly_growth?.orders?.percentage_change || 0,
                    )}
                    icon={<ShoppingCartOutlinedIcon fontSize={'large'} />}
                    loading={loading}
                />

                <Widgets
                    title="کاربران جدید"
                    data={String(data?.monthly_growth?.users?.current_month || 0)}
                    description={calculateChange(
                        data?.monthly_growth?.users?.percentage_change || 0,
                    )}
                    icon={<PersonAddAltOutlinedIcon fontSize={'large'} />}
                    loading={loading}
                />

                <SalesChart data={salesData} loading={!salesData || salesData.length === 0} />
            </Grid>
        </Container>
    )
}
