import {Box, Grid, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {ProductsType} from '../Products'

const RECOURCE = 'product'

export function ProductDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<ProductsType | null>({
        id: 1,
        name: 'ali',
        introduction: 'mmdi',
        connectionMethod: 'ali',
        description: 'ali@gmail.com',
        price: 300000,
        category: 'clash of clans',
        properties: [
            {id: 2, name: 'زمان شارژ', value: '۱۰ دقیقه'},
            {id:1, name: 'زمان شارژ', value: '۱۰ دقیقه'},
        ],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
    })
    const getProduct = async () => {
        setLoading(true)
        let response = await DataProvider.get<ProductsType>(`${RECOURCE}/${id}/`)
        if (response) {
            setProduct(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات محصول
            </Typography>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.id}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    نام محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.name}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    معرفی محصول:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.introduction}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    دسته بندی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.category}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    نوع اتصال:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.connectionMethod}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    توضیحات:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.description}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    قیمت:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {product?.price}
                </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    ویژگی ها:
                </Typography>
                <Stack direction={'column'} spacing={1.5}>
                    {product?.properties.map((item, index) => (
                        <Grid container spacing={2} sx={{alignItems: 'center'}} key={index}>
                            <Grid xs={12} sm={1.8} md={1.3} lg={1}>
                                <Stack>
                                    <Typography variant="body2" fontSize={16}>
                                        {item.name}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={12} sm={10.2} md={10.7} lg={11}>
                                <Stack bgcolor={'background.paper'} borderRadius={2} p={1.2}>
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
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    تصویر:
                </Typography>

                <Box
                    component={'img'}
                    sx={{
                        width: '75px',
                        height: '75px',
                        borderRadius: 2,
                        objectFit: 'cover',
                    }}
                    src={typeof product?.image === 'string' ? product?.image : ''}
                    borderRadius={2}
                />
            </Stack>
        </Stack>
    )
}
