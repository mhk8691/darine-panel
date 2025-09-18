import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import productImage from '../../../Images/1.webp'
import {ProductsListType} from './ProductsList'
import ProductMenu from './Menu'
import {useState} from 'react'

export default function ProductCard({item}: {item: ProductsListType}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                border: '1px solid #BCBCBC',
            }}
        >
            {/* Image */}
            <Box sx={{position: 'relative'}}>
                <CardMedia
                    component="img"
                    image={item.picture}
                    alt="تصویر محصول"
                    sx={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        width: '100%',
                        height: 220,
                        objectFit: 'cover',
                    }}
                />

                <IconButton
                    size="medium"
                    onClick={handleMenuOpen}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <MoreVertIcon fontSize="medium" />
                </IconButton>
            </Box>
            <ProductMenu item={item} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <CardContent sx={{flexGrow: 1}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        {item.name}
                    </Typography>

                    {item.visible ? (
                        <VisibilityIcon color="success" />
                    ) : (
                        <VisibilityOffIcon color="primary" />
                    )}
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" mb={2}>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                        {formatPrice(item.base_price)}
                    </Typography>
                </Stack>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{display: 'block', textAlign: 'right'}}
                >
                    {formatDate(item.created_at)}
                </Typography>
            </CardContent>
        </Card>
    )
}
