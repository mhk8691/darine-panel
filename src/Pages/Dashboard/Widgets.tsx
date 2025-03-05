import {Grid, Stack, Typography} from '@mui/material'

interface Props {
    title: string
    data: string
    description: {
        title: string
        status: 'increment' | 'decrement'
    }
}
export default function Widgets({title, data, description}: Props) {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Stack
                bgcolor={'background.paper'}
                borderRadius={3}
                px={3}
                py={5}
                spacing={{
                    xs: 4,
                    sm: 3,
                    md: 1.5,
                }}
                direction={'column'}
            >
                <Typography variant="h6" sx={{fontSize: '16px !important', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{fontSize: '20px !important', fontWeight: '400'}}>
                    {data}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '13px !important',
                        color: description.status === 'increment' ? 'success.main' : 'primary.main',
                    }}
                >
                    {description.title}
                </Typography>
            </Stack>
        </Grid>
    )
}
