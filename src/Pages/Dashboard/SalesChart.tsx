import {
    Box,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import {BarChart} from '@mui/x-charts/BarChart'
import {Dispatch, SetStateAction} from 'react'
import {valueFormatter} from './sales'
import {FilterState} from './DashboardLayout'

const MONTHS = [
    {label: 'همه ماه‌ها', value: ''},
    {label: 'فروردین', value: '01'},
    {label: 'اردیبهشت', value: '02'},
    {label: 'خرداد', value: '03'},
    {label: 'تیر', value: '04'},
    {label: 'مرداد', value: '05'},
    {label: 'شهریور', value: '06'},
    {label: 'مهر', value: '07'},
    {label: 'آبان', value: '08'},
    {label: 'آذر', value: '09'},
    {label: 'دی', value: '10'},
    {label: 'بهمن', value: '11'},
    {label: 'اسفند', value: '12'},
]

const YEARS = Array.from({length: 5}, (_, i) => 1405 - i)

export interface ChartData {
    month?: string
    day?: number
    sales: number
}

interface Props {
    data: ChartData[]
    loading?: boolean
    onFilterChange?: (filter: FilterState) => void
    filter: FilterState
    setFilter: Dispatch<SetStateAction<FilterState>>
}

export default function SalesChart({data, loading, onFilterChange, filter, setFilter}: Props) {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')
    const chartHeight = mdScreen ? 450 : smScreen ? 350 : 280

    // تشخیص اینکه داده روزانه است یا ماهانه
    const isDailyData = filter.month !== ''

    // نرمال‌سازی داده برای چارت
    const normalizedData = data.map((item) => ({
        label: isDailyData ? String(item.day) : item.month,
        sales: item.sales,
    }))

    const chartLabel = isDailyData ? 'فروش روزانه' : 'فروش ماهانه'
    const title = isDailyData ? 'آمار فروش روزانه' : 'آمار فروش ماهانه'

    const handleYearChange = (e: SelectChangeEvent<number>) => {
        const updated = {...filter, year: Number(e.target.value)}
        setFilter(updated)
        onFilterChange?.(updated)
    }

    const handleMonthChange = (e: SelectChangeEvent<string>) => {
        const updated = {...filter, month: e.target.value}
        setFilter(updated)
        onFilterChange?.(updated)
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
                {/* هدر با فیلتر */}
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    alignItems={{xs: 'flex-start', sm: 'center'}}
                    justifyContent="space-between"
                    gap={2}
                    mb={5}
                >
                    {loading ? (
                        <Skeleton variant="text" width={180} height={30} />
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{fontSize: '17px !important', fontWeight: 'bold'}}
                        >
                            {title}
                        </Typography>
                    )}

                    <Stack direction="row" gap={1.5} flexWrap="wrap">
                        {loading ? (
                            <>
                                <Skeleton variant="rectangular" width={110} height={40} sx={{borderRadius: 1}} />
                                <Skeleton variant="rectangular" width={150} height={40} sx={{borderRadius: 1}} />
                            </>
                        ) : (
                            <>
                                <Select
                                    size="small"
                                    value={filter.year}
                                    onChange={handleYearChange}
                                    sx={{minWidth: 110}}
                                >
                                    {YEARS.map((y) => (
                                        <MenuItem key={y} value={y}>
                                            {y}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <Select
                                    size="small"
                                    value={filter.month}
                                    onChange={handleMonthChange}
                                    sx={{minWidth: 150}}
                                    displayEmpty
                                >
                                    {MONTHS.map((m) => (
                                        <MenuItem key={m.value} value={m.value}>
                                            {m.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    </Stack>
                </Stack>

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
                        <Box sx={{minWidth: isDailyData ? '900px' : '700px'}}>
                            <BarChart
                                dataset={normalizedData}
                                xAxis={[{scaleType: 'band', dataKey: 'label'}]}
                                margin={{left: 87}}
                                series={[
                                    {
                                        dataKey: 'sales',
                                        label: chartLabel,
                                        valueFormatter,
                                    },
                                ]}
                                layout="vertical"
                                colors={['#D4AF37']}
                                sx={{'--Charts-categoryLabelFontSize': '16px', width: '100%'}}
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