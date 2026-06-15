import {Box, Grid, Skeleton, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import {red} from '@mui/material/colors'
import {BarChart} from '@mui/x-charts/BarChart'
import {valueFormatter} from './sales'

interface Props {
    data?: {
        month: string
        sales: number
    }[]
    loading?: boolean
}

export default function SalesChart({data, loading}: Props) {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')
    const theme = useTheme()
    const chartHeight = mdScreen ? 450 : smScreen ? 350 : 280

    return (
        <Grid item xs={12}>
            <Stack
                bgcolor={'background.main'}
                borderRadius={3}
                px={{xs: 2, sm: 3}}
                py={3}
                width="100%"
            >
                {/* عنوان */}
                {loading ? (
                    <Skeleton variant="text" width={180} height={30} sx={{mb: 5}} />
                ) : (
                    <Typography
                        variant="h6"
                        sx={{fontSize: '17px !important', fontWeight: 'bold', mb: 5}}
                    >
                        آمار فروش ماهانه
                    </Typography>
                )}

                {loading ? (
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width="100%"
                        height={chartHeight}
                        sx={{borderRadius: 2}}
                    />
                ) : (
                    <Box sx={{overflowX: 'auto', width: '100%'}}>
                        <Box sx={{minWidth: '700px'}}>
                            <BarChart
                                dataset={data || []}
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
                                colors={[theme.palette.primary.main]}
                                sx={{
                                    '--Charts-categoryLabelFontSize': '16px',
                                    width: '100%',
                                }}
                                grid={{horizontal: true}}
                                height={chartHeight}
                            />
                        </Box>
                    </Box>
                )}
            </Stack>
        </Grid>
    )
}
