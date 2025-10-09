import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {Box, Button, Card, CardContent, CardMedia, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {BaseModal} from '../../../Components/Modal/BaseModal'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import {setUtil} from '../../../redux/UtilSlice'
import {ProductsListType} from './ProductsList'

export default function ProductCard({
    item,
    getList,
}: {
    item: ProductsListType
    getList: () => Promise<void>
}) {
    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    async function handleDelete() {
        dispatch(setUtil({loading: true}))
        try {
            await DataProvider.delete(`product/${item.id}/`)
            getList()
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        dispatch(setUtil({loading: false}))
        setOpenModal(false)
    }
    const navigate = useNavigate()
    return (
        <>
            <Card
                component={'div'}
                onClick={() => navigate(`/product/${item.id}`)}
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
                    cursor: 'pointer',
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
                </Box>

                <CardContent sx={{flexGrow: 1}}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                        minHeight={75}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{fontSize: '18px !important'}}
                        >
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{width: '100%', my: 1}}
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenModal(true)
                        }}
                    >
                        حذف محصول
                    </Button>
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
            <BaseModal
                open={openModal}
                setOpen={setOpenModal}
                title="توجه!"
                style={{maxWidth: 'sm'}}
            >
                <Typography mb="1rem" variant="body2" fontSize={'17px'}>
                    آیا از انجام این عمل مطمئن هستید؟
                </Typography>
                <Stack direction={'row'} spacing={2} mt={2.5}>
                    <Button variant="contained" onClick={handleDelete} size="large">
                        بله
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setOpenModal(false)}
                        size="large"
                    >
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
        </>
    )
}
