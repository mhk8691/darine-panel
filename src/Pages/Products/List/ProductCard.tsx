import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { formatDate } from '../../../Core/FormatDate'
import { formatPrice } from '../../../Core/FormatPrice'
import ProductMenu from './Menu'
import { ProductsListType } from './ProductsList'

export default function ProductCard({
    item,
    getList,
}: {
    item: ProductsListType
    getList: () => Promise<void>
}) {
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

            <ProductMenu
                item={item}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                getList={getList}
            />

            <CardContent sx={{flexGrow: 1}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                    minHeight={75}
                >
                    <Typography variant="h6" fontWeight="bold" sx={{fontSize: '22px !important'}}>
                        {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                    </Typography>

                    {item.visible ? (
                        <VisibilityIcon color="success" />
                    ) : (
                        <VisibilityOffIcon color="primary" />
                    )}
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" mb={1}>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                        {formatPrice(item.base_price)}
                    </Typography>
                </Stack>

                {/* Product type & category */}
                <Stack direction="row" spacing={1} mb={2}>
                    {/* Product type */}
                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            border: '1px solid',
                            borderColor: item.type === 'coins' ? '#FFDD57' : 'info.main',
                            color: item.type === 'coins' ? 'gold' : 'info.main',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: 12,
                            boxShadow: 1,
                        }}
                    >
                        {item.type === 'coins' ? '🪙' : '👤'} {item.type}
                    </Box>

                    {/* Category */}
                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            border: '1px solid',
                            borderColor: 'grey.400',
                            color: 'text.primary',
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        {item.category}
                    </Box>
                </Stack>

                {/* Created at */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{display: 'block', textAlign: 'right', fontSize: '13px !important'}}
                >
                    {formatDate(item.created_at)}
                </Typography>
            </CardContent>
        </Card>
    )
}
