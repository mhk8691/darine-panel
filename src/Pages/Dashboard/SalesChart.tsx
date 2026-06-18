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
    useTheme,
} from '@mui/material'
import {BarChart} from '@mui/x-charts/BarChart'
import {useState} from 'react'
import {valueFormatter} from './sales'

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

const CURRENT_YEAR = 1404
const YEARS = Array.from({length: 5}, (_, i) => CURRENT_YEAR - i)

interface FilterState {
    year: number
    month: string
}

interface Props {
    data?: {
        month: string
        sales: number
    }[]
    loading?: boolean
    onFilterChange?: (filter: FilterState) => void
}

export default function SalesChart({data, loading, onFilterChange}: Props) {
    const mdScreen = useMediaQuery('(min-width:900px)')
    const smScreen = useMediaQuery('(min-width:600px)')
    const theme = useTheme()
    const chartHeight = mdScreen ? 450 : smScreen ? 350 : 280

    const [filter, setFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })

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
                            آمار فروش ماهانه
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
                        <Box sx={{minWidth: '700px'}}>
                            <BarChart
                                dataset={data || []}
                                xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                                margin={{left: 87}}
                                series={[
                                    {
                                        dataKey: 'sales',
                                        label: 'فروش ماهانه',
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