import {Box, Grid, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Progress from '../../../Components/Progress/Progress'
import {DataProvider} from '../../../Core/DataProvider'
import {OptionType, PropertyType} from '../../../Core/types'

const RECOURCE = 'product'
export interface ProductDetailType {
    id: number
    name: string
    short_introduction: string
    base_price: number
    max_price: number
    category: {
        id: number
        name: string
        thumbnail: any | null
    }
    connection_method: {
        id: number
        title: string
    }
    type: string
    created_at: string
    pictures: any
    options: OptionType[]
    properties: PropertyType[]
    video?: any
}
export function ProductDetail() {
    const productId = useParams().id
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<ProductDetailType>({} as ProductDetailType)
    const getProduct = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<ProductDetailType>(`${RECOURCE}/${productId}/`)
            if (response) {
                setProduct(response.data)
            }
        } catch {}
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [productId])

    return (
        <>
            {loading ? (
                <Progress />
            ) : (
                <Stack p={4} direction={'column'} spacing={2.5}>
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        sx={{fontSize: '18px !important', mb: 1}}
                    >
                        جزئیات محصول
                    </Typography>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            آیدی:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {product?.id || '--'}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            نام محصول:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {product?.name || '--'}
                        </Typography>
                    </Stack>
                    <Stack direction={'column'} spacing={1.5}>
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            معرفی کوتاه:
                        </Typography>
                        <Stack bgcolor={'background.light'} borderRadius={2} p={2}>
                            <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                                {product?.short_introduction || '--'}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            دسته بندی:
                        </Typography>
                        <Typography
                            component={Link}
                            to={`/category/detail/${product.category?.id}`}
                            variant="body1"
                            sx={{fontWeight: '400', fontSize: '16px', color: 'primary.main'}}
                        >
                            {product?.category?.name || '--'}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            نوع اتصال:
                        </Typography>
                        <Typography
                            component={Link}
                            to={`/base-accounts/detail/${product.connection_method?.id}`}
                            variant="body1"
                            sx={{fontWeight: '400', fontSize: '16px', color: 'primary.main'}}
                        >
                            {product?.connection_method?.title || '--'}
                        </Typography>
                    </Stack>

                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            قیمت پایه:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {product?.base_price || '--'}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            حداکثر قیمت:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {product?.max_price || '--'}
                        </Typography>
                    </Stack>
                    <Stack direction={'column'} spacing={3}>
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            ویژگی ها:
                        </Typography>
                        <Stack direction={'column'} spacing={1.5}>
                            {product?.properties?.map((item, index) => (
                                <Grid container spacing={2} sx={{alignItems: 'center'}} key={index}>
                                    <Grid xs={1.8} sm={1.8} md={1.3} lg={1}>
                                        <Stack>
                                            <Typography variant="body2" fontSize={16}>
                                                {item.name}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={10.2} sm={10.2} md={10.7} lg={11}>
                                        <Stack
                                            bgcolor={'background.light'}
                                            borderRadius={2}
                                            p={1.2}
                                        >
                                            <Typography variant="body2" fontSize={15}>
                                                {item.value}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack direction={'column'} spacing={1}>
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            تصاویر:
                        </Typography>
                        <Grid
                            container
                            spacing={{
                                xs: 0.5,
                                sm: 1.5,
                            }}
                        >
                            {product?.pictures?.map((item) => (
                                <Grid
                                    item
                                    xs={12 / 5}
                                    sm={12 / 7}
                                    md={12 / 8}
                                    lg={12 / 10}
                                    xl={12 / 13}
                                >
                                    <Box
                                        component={'img'}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 2,
                                            objectFit: 'cover',
                                        }}
                                        src={item.picture}
                                        borderRadius={2}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
            )}
        </>
    )
}
