import {Grid, Stack, Typography, Skeleton} from '@mui/material'
import {ReactNode} from 'react'

interface Props {
    title: string
    data: string
    description: {title: string; status: 'increment' | 'decrement'}
    icon: ReactNode
    loading?: boolean
}

export default function Widgets({title, data, description, icon, loading}: Props) {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'background.main'}
                borderRadius={3}
                px={3}
                pr={0}
                gap={1}
                height="100%"
            >
                <Stack spacing={{xs: 4, sm: 3, md: 1.5}} py={3} direction={'column'}>
                    {loading ? (
                        <Skeleton variant="text" width={120} height={25} />
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{fontSize: '17px !important', fontWeight: 'bold'}}
                        >
                            {title}
                        </Typography>
                    )}

                    {loading ? (
                        <Skeleton variant="text" width={80} height={30} />
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: {
                                    xs: '18px !important',
                                    sm: '17px !important',
                                    lg: '20px !important',
                                },
                                fontWeight: '400',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {data}
                        </Typography>
                    )}

                    {loading ? (
                        <Skeleton variant="text" width={100} height={20} />
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '14px !important',
                                color:
                                    description.status === 'increment'
                                        ? 'success.main'
                                        : 'primary.main',
                            }}
                        >
                            {description.title}
                        </Typography>
                    )}
                </Stack>

                <Stack
                    sx={{
                        bgcolor: 'rgba(255,255,255,.1)',
                        width: {xs: '25%', sm: '35%', lg: '30%'},
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        px: 2,
                        borderStartStartRadius: '50%',
                        borderEndStartRadius: '50%',
                        borderEndEndRadius: 3 * 4,
                        borderStartEndRadius: 3 * 4,
                    }}
                >
                    {loading ? <Skeleton variant="circular" width={40} height={40} /> : icon}
                </Stack>
            </Stack>
        </Grid>
    )
}
