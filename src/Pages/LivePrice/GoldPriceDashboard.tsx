import { Box, Grid } from '@mui/material'
import PlatformPriceCard, { GoldPriceData } from './PlatformPriceCard'

interface Props {
    data: GoldPriceData
}

export function relativeTime(iso: string): string {
    if (!iso) return '-'
    const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
    if (isNaN(diffMin)) return '-'
    if (diffMin <= 0) return 'همین حالا'
    if (diffMin < 60) return `${diffMin.toLocaleString('fa-IR')} دقیقه پیش`
    const h = Math.round(diffMin / 60)
    return `${h.toLocaleString('fa-IR')} ساعت پیش`
}

export function fmtPercent(n: number | null): string {
    if (n === null || n === undefined) return '۰'
    return Math.abs(n).toLocaleString('fa-IR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}

export default function GoldPriceDashboard({ data }: Props) {
    if (!data) return null

    return (
        <Box sx={{ pl: 2, pr: 2, py: { xs: 3.5, sm: 4 } }}>
       

            {data.platform_prices && data.platform_prices.length > 0 && (
                <Grid container gap={{ xs: 1.75, sm: 2, mdl: 2.25 }}>
                    {data.platform_prices.map((platform) => (
                        <Grid key={platform.platform_code} xs={12} sm={6} mdl={3.9}>
                            <PlatformPriceCard platform={platform} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}