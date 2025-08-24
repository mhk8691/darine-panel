import {Box, Grid, Stack, Typography, useMediaQuery} from '@mui/material'
import {red} from '@mui/material/colors'
import {BarChart} from '@mui/x-charts/BarChart'
import {valueFormatter} from './sales'

interface Props {
    data: {
        month: string
        sales: number
    }[]
}
export default function SalesChart({data}: Props) {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')
    const xsScreen = useMediaQuery('(max-width:600px)')
    const chartSetting = {
        height: mdScreen ? 450 : smScreen ? 350 : xsScreen ? 280 : 100,
    }
    return (
        <Grid item xs={12}>
            <Stack
                bgcolor={'background.main'}
                borderRadius={3}
                px={{xs: 2, sm: 3}}
                py={3}
                width="100%"
            >
                <Typography
                    variant="h6"
                    sx={{fontSize: '17px !important', fontWeight: 'bold', mb: 5}}
                >
                    آمار فروش ماهانه
                </Typography>

                <Box sx={{overflowX: 'auto', width: '100%'}}>
                    <Box sx={{minWidth: '700px'}}>
                        <BarChart
                            dataset={data}
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'month',
                                },
                            ]}
                            margin={{left: 87}}
                            series={[
                                {
                                    dataKey: 'sales',
                                    label: 'فروش ماهانه',
                                    valueFormatter,
                                },
                            ]}
                            layout="vertical"
                            colors={[red[700]]}
                            sx={{
                                '--Charts-categoryLabelFontSize': '16px',
                                width: '100%',
                            }}
                            grid={{horizontal: true}}
                            {...chartSetting}
                        />
                    </Box>
                </Box>
            </Stack>
        </Grid>
    )
}
