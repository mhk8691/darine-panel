import { Box, Card, Stack, Typography } from '@mui/material'
import { formatPrice } from '../../Core/FormatPrice'
import { fmtPercent, relativeTime } from './GoldPriceDashboard'

export interface MarketData {
    market_price?: number
    intrinsic_price: number
    bubble_amount?: number
    bubble_percent: number
    is_positive: boolean
}

export interface PlatformPrice {
    platform_code: string
    platform_name: string
    price: number | null
    change_24h: number | null
    max_24h: number | null
    min_24h: number | null
    last_updated: string | null
    error?: string
}

export interface GoldPriceData {
    market_data: MarketData
    platform_prices: PlatformPrice[]
    last_updated: string
}

export interface SilverPriceData {
    market_data: MarketData
    last_updated?: string
}

export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
}

interface Props {
    platform: PlatformPrice
}

export default function PlatformPriceCard({ platform }: Props) {
    const failed = platform.price === null
    const changeFlat = platform.change_24h === 0
    const changeUp = (platform.change_24h ?? 0) > 0

    const hasRange =
        !failed &&
        platform.min_24h !== null &&
        platform.max_24h !== null &&
        platform.max_24h > platform.min_24h

    const rangePos = hasRange
        ? ((platform.price! - platform.min_24h!) / (platform.max_24h! - platform.min_24h!)) * 100
        : null

    return (
        <Card
            variant="outlined"
            sx={{
                position: 'relative',
                bgcolor: 'background.main',
                borderColor: 'background.light',
                borderRadius: '14px',
                overflow: 'hidden',
                opacity: failed ? 0.72 : 1,
                transition: 'border-color .2s ease, transform .2s ease',
                '&:hover': failed
                    ? undefined
                    : { borderColor: 'rgba(252,213,53,0.4)', transform: 'translateY(-2px)' },
            }}
        >
            {/* --- header: platform info --- */}
            <Box sx={{ p: 2, pb: 1.75 }}>
                <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mb: 1.5 }}>
                    <Box
                        sx={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            flex: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 800,
                            color: failed ? 'text.secondary' : 'primary.contrastText',
                            background: failed
                                ? (theme) => theme.palette.background.light
                                : 'radial-gradient(circle at 30% 30%, #FFE985, #FCD535 70%)',
                        }}
                    >
                        {platform.platform_name.trim().charAt(0)}
                    </Box>
                    <Box>
                        <Typography variant="titleSm" component="div">
                            {platform.platform_name}
                        </Typography>
                        <Typography
                            variant="labelSm"
                            sx={{ color: 'text.secondary', letterSpacing: '.05em' }}
                        >
                            {platform.platform_code}
                        </Typography>
                    </Box>
                </Stack>

                {failed ? (
                    <Typography variant="bodyMd" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {platform.error ?? 'قیمت در دسترس نیست'}
                    </Typography>
                ) : (
                    <>
                        <Typography variant="headLineSm" sx={{ color: 'primary.main', fontWeight: 800 }}>
                            {formatPrice(platform.price!)}{' '}
                            <Typography
                                component="span"
                                variant="labelMd"
                                sx={{ color: 'text.secondary' }}
                            >
                                تومان
                            </Typography>
                        </Typography>
                        <Typography
                            variant="labelLg"
                            sx={{
                                display: 'block',
                                mt: 1,
                                fontWeight: 700,
                                color: changeFlat ? 'text.secondary' : changeUp ? '#8FE3B7' : '#FF9A93',
                            }}
                        >
                            {changeFlat ? '—' : changeUp ? '▲' : '▼'} {fmtPercent(platform.change_24h)}٪
                            (۲۴ ساعت)
                        </Typography>
                    </>
                )}
            </Box>

            {/* --- range & details --- */}
            {!failed && (
                <>
                    <Box
                        sx={{
                            height: 0,
                            mx: '2px',
                            position: 'relative',
                            borderTop: '1.5px dashed',
                            borderColor: 'background.light',
                            '&::before, &::after': {
                                content: '""',
                                position: 'absolute',
                                top: -7,
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                bgcolor: 'background.main',
                                border: '1px solid',
                                borderColor: 'background.light',
                            },
                            '&::before': { right: -9 },
                            '&::after': { left: -9 },
                        }}
                    />

                    <Box sx={{ p: 2, pt: 1.5 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                            <Typography variant="xSmall" sx={{ color: 'text.secondary' }}>
                                کف: {platform.min_24h !== null ? formatPrice(platform.min_24h) : '-'}
                            </Typography>
                            <Typography variant="xSmall" sx={{ color: 'text.secondary' }}>
                                سقف: {platform.max_24h !== null ? formatPrice(platform.max_24h) : '-'}
                            </Typography>
                        </Stack>

                        <Box
                            sx={{
                                height: 5,
                                borderRadius: 999,
                                bgcolor: 'background.light',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {hasRange ? (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 999,
                                        width: `${rangePos}%`,
                                        background: 'linear-gradient(90deg, #C9A93F, #FCD535)',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 999,
                                        bgcolor: 'text.secondary',
                                        opacity: 0.35,
                                    }}
                                />
                            )}
                        </Box>

                        <Typography
                            variant="xSmall"
                            sx={{ color: 'text.disabled', textAlign: 'left', display: 'block', mt: 1 }}
                        >
                            {platform.last_updated ? relativeTime(platform.last_updated) : '-'}
                        </Typography>
                    </Box>
                </>
            )}

            {/* --- stamp for failed platforms --- */}
            {failed && (
                <>
                    <Box sx={{ height: 14 }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                border: '2.5px solid',
                                borderColor: 'error.main',
                                opacity: 0.6,
                                color: '#FF7A6E',
                                fontWeight: 800,
                                fontSize: 13,
                                letterSpacing: '.05em',
                                px: 1.75,
                                py: 0.6,
                                borderRadius: '8px',
                                transform: 'rotate(-11deg)',
                                bgcolor: 'rgba(20,20,20,.35)',
                            }}
                        >
                            باطل شد
                        </Box>
                    </Box>
                </>
            )}
        </Card>
    )
}