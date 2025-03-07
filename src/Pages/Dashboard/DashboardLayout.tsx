import {Container, Grid} from '@mui/material'
import Widgets from './Widgets'
import SalesChart from './SalesChart'

export default function DashboardLayout() {
    return (
        <Container maxWidth="xl" >
            <Grid container spacing={2} rowSpacing={3} sx={{marginTop: '1rem'}}>
                <Widgets
                    title="فروش هفتگی"
                    data="10000000 تومان"
                    description={{
                        title: '60% افزایش یافته است',
                        status: 'increment',
                    }}
                />
                <Widgets
                    title="سفارشات هفتگی"
                    data="45223"
                    description={{
                        title: '10% کاهش یافته است',
                        status: 'decrement',
                    }}
                />
                <Widgets
                    title="بازدیدکنندگان هفتگی"
                    data="32000"
                    description={{
                        title: '30% افزایش یافته است',
                        status: 'increment',
                    }}
                />
                <SalesChart/>
            </Grid>
        </Container>
    )
}
