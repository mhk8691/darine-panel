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
import { LineChart } from '@mui/x-charts/LineChart'
import { Dispatch, SetStateAction } from 'react'
import { FilterState } from './DashboardLayout'

const MONTHS = [
    { label: 'همه ماه‌ها', value: '' },
    { label: 'فروردین', value: '01' },
    { label: 'اردیبهشت', value: '02' },
    { label: 'خرداد', value: '03' },
    { label: 'تیر', value: '04' },
    { label: 'مرداد', value: '05' },
    { label: 'شهریور', value: '06' },
    { label: 'مهر', value: '07' },
    { label: 'آبان', value: '08' },
    { label: 'آذر', value: '09' },
    { label: 'دی', value: '10' },
    { label: 'بهمن', value: '11' },
    { label: 'اسفند', value: '12' },
]

const YEARS = Array.from({ length: 5 }, (_, i) => 1405 - i)

export interface BuySellChartData {
    month?: string
    day?: number
    buy: number
    sell: number
}

interface Props {
    data: BuySellChartData[]
    loading?: boolean
    filter: FilterState
    setFilter: Dispatch<SetStateAction<FilterState>>
}

const valueFormatter = (value: number | null) => {
    if (value == null) return ''
    return new Intl.NumberFormat('fa-IR').format(value)
}

export default function BuySellChart({
    data,
    loading,
    filter,
    setFilter,
}: Props) {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')

    const chartHeight = mdScreen ? 450 : smScreen ? 350 : 280

    const isDailyData = filter.month !== ''

    const normalizedData = data.map((item) => ({
        label: isDailyData ? String(item.day) : item.month,
        buy: item.buy,
        sell: item.sell,
    }))

    const title = isDailyData
        ? 'نمودار خرید و فروش روزانه'
        : 'نمودار خرید و فروش ماهانه'

    const handleYearChange = (e: SelectChangeEvent<number>) => {
        const updated = {
            ...filter,
            year: Number(e.target.value),
        }

        setFilter(updated)
    }

    const handleMonthChange = (e: SelectChangeEvent<string>) => {
        const updated = {
            ...filter,
            month: e.target.value,
        }

        setFilter(updated)
    }

    return (
        <Grid item xs={12}>
            <Stack
                bgcolor="background.main"
                borderRadius={3}
                px={{ xs: 2, sm: 3 }}
                py={3}
                width="100%"
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                    gap={2}
                    mb={5}
                >
                    {loading ? (
                        <Skeleton
                            variant="text"
                            width={220}
                            height={30}
                        />
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '17px !important',
                                fontWeight: 'bold',
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    <Stack
                        direction="row"
                        gap={1.5}
                        flexWrap="wrap"
                    >
                        {loading ? (
                            <>
                                <Skeleton
                                    variant="rectangular"
                                    width={110}
                                    height={40}
                                    sx={{ borderRadius: 1 }}
                                />

                                <Skeleton
                                    variant="rectangular"
                                    width={150}
                                    height={40}
                                    sx={{ borderRadius: 1 }}
                                />
                            </>
                        ) : (
                            <>
                                <Select
                                    size="small"
                                    value={filter.year}
                                    onChange={handleYearChange}
                                    sx={{ minWidth: 110 }}
                                >
                                    {YEARS.map((year) => (
                                        <MenuItem
                                            key={year}
                                            value={year}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <Select
                                    size="small"
                                    value={filter.month}
                                    onChange={handleMonthChange}
                                    sx={{ minWidth: 150 }}
                                    displayEmpty
                                >
                                    {MONTHS.map((month) => (
                                        <MenuItem
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
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
                        sx={{ borderRadius: 2 }}
                    />
                ) : (
                    <Box
                        sx={{
                            overflowX: 'auto',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: isDailyData ? '900px' : '700px',
                            }}
                        >
                            <LineChart
                                dataset={normalizedData}
                                xAxis={[
                                    {
                                        scaleType: 'point',
                                        dataKey: 'label',
                                    },
                                ]}
                                series={[
                                    {
                                        dataKey: 'buy',
                                        label: 'خرید',
                                        showMark: true,
                                        valueFormatter,
                                    },
                                    {
                                        dataKey: 'sell',
                                        label: 'فروش',
                                        showMark: true,
                                        valueFormatter,
                                    },
                                ]}
                                colors={[
                                    '#4CAF50',
                                    '#F44336',
                                ]}
                                grid={{
                                    horizontal: true,
                                    vertical: false,
                                }}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    bottom: 30,
                                    left: 70,
                                }}
                                height={chartHeight}
                            />
                        </Box>
                    </Box>
                )}
            </Stack>
        </Grid>
    )
}