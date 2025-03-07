import {Grid, Stack, Typography, useMediaQuery} from '@mui/material'
import {BarChart} from '@mui/x-charts/BarChart'
import {dataset, valueFormatter} from './sales'
import {red} from '@mui/material/colors'

export default function SalesChart() {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')
    const xsScreen = useMediaQuery('(max-width:600px)')
    const chartSetting = {
        height: mdScreen ? 450 : smScreen ? 350 : xsScreen ? 280 : 100,
    }
    return (
        <Grid item xs={12} width="100%">
            <Stack
                bgcolor={'background.main'}
                borderRadius={3}
                px={{
                    xs: 2,
                    sm: 3,
                }}
                py={3}
                width="100%"
            >
                <Typography
                    variant="h6"
                    sx={{fontSize: '16px !important', fontWeight: 'bold', mb: 5}}
                >
                    آمار فروش ماهانه
                </Typography>
                <BarChart
                    dataset={dataset}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'month',
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'sales',
                            label: 'فروش ماهانه',
                            valueFormatter,
                        },
                    ]}
                    margin={{left: 100}}
                    layout="vertical"
                    colors={[red[700]]}
                    sx={{
                        width: '100% !important',
                        '--Charts-categoryLabelFontSize': '12px',
                    }}
                    grid={{horizontal: true}}
                    {...chartSetting}
                />
            </Stack>
        </Grid>
    )
}
