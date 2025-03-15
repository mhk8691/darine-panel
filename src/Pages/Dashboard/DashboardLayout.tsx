import {Container, Grid} from '@mui/material'
import Widgets from './Widgets'
import SalesChart from './SalesChart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
export default function DashboardLayout() {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} rowSpacing={3} sx={{marginTop: '1rem'}}>
                <Widgets
                    title="درآمد ماهانه"
                    data="100000000 تومان"
                    description={{
                        title: '60% افزایش یافته است',
                        status: 'increment',
                    }}
                    icon={<AttachMoneyIcon fontSize={'large'} />}
                />
                <Widgets
                    title="سفارشات ماهانه"
                    data="45223"
                    description={{
                        title: '10% کاهش یافته است',
                        status: 'decrement',
                    }}
                    icon={<ShoppingCartOutlinedIcon fontSize={'large'} />}
                />
                <Widgets
                    title="کاربران جدید"
                    data="32000"
                    description={{
                        title: '30% افزایش یافته است',
                        status: 'increment',
                    }}
                    icon={<PersonAddAltOutlinedIcon fontSize={'large'} />}
                />
                <SalesChart />
            </Grid>
        </Container>
    )
}
