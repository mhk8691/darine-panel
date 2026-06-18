import {Box, Grid, Stack, Typography} from '@mui/material'
import {PieChart} from '@mui/x-charts/PieChart'
import {useTheme} from '@mui/material/styles'

interface ServerResources {
    cpu: number
    ram: number
    disk: number
}

interface Props {
    data: ServerResources
    total?: number
}

const RESOURCE_CONFIG = [
    {key: 'cpu' as const, label: 'CPU', unit: 'GB'},
    {key: 'ram' as const, label: 'RAM', unit: 'GB'},
    {key: 'disk' as const, label: 'Disk', unit: 'GB'},
]

export default function ServerResourceCharts({data, total = 8}: Props) {
    const theme = useTheme()

    const colors = [
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.error.main,
    ]

    return (
        <Grid container spacing={2}>
            {RESOURCE_CONFIG.map((resource, index) => {
                const used = data[resource.key]
                const free = Math.max(0, total - used)
                const pct = ((used / total) * 100).toFixed(1)

                return (
                    <Grid item xs={12} sm={4} key={resource.key}>
                        <Stack
                            bgcolor="background.main"
                            borderRadius={3}
                            px={3}
                            py={3}
                            alignItems="center"
                            gap={1}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 'bold',
                                    letterSpacing: '0.06em',
                                    color: 'text.secondary',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {resource.label}
                            </Typography>

                            <Box sx={{position: 'relative', width: 150, height: 150}}>
                                <PieChart
                                    width={150}
                                    height={150}
                                    series={[
                                        {
                                            data: [
                                                {
                                                    id: 'used',
                                                    value: used,
                                                    label: 'استفاده شده',
                                                    color: colors[index],
                                                },
                                                {
                                                    id: 'free',
                                                    value: free,
                                                    label: 'آزاد',
                                                    color: theme.palette.action.hover,
                                                },
                                            ],
                                            innerRadius: 52,
                                            outerRadius: 70,
                                            paddingAngle: 2,
                                            cornerRadius: 4,
                                        },
                                    ]}
                                    slotProps={{legend: {hidden: true}}}
                                    margin={{top: 0, bottom: 0, left: 0, right: 0}}
                                />

                                {/* مقدار مرکز دایره */}
                                <Stack
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        alignItems: 'center',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Typography variant="h6" sx={{fontWeight: 'bold', lineHeight: 1}}>
                                        {used}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {resource.unit}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Typography variant="body2" color="text.secondary">
                                {pct}٪ از {total} {resource.unit}
                            </Typography>
                        </Stack>
                    </Grid>
                )
            })}
        </Grid>
    )
}