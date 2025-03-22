import {Box, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {CategoriesType} from '../Categories'

const RECOURCE = 'category'

export function CategoryDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<CategoriesType | null>(null)
    const getCategory = async () => {
        setLoading(true)
        let response = await DataProvider.get<CategoriesType>(`${RECOURCE}/${id}/`)
        if (response) {
            setCategory(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات دسته بندی
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
                    {category?.id}
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
                    نام:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {category?.name}
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
                    والد دسته بندی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {category?.parent || '--'}
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
                    تعداد زیر دسته بندی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {category?.children_count}
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
                    تعداد محصولات:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {category?.products_count}
                </Typography>
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
                    src={typeof category?.thumbnail === 'string' ? category?.thumbnail : ''}
                    borderRadius={2}
                />
            </Stack>
        </Stack>
    )
}
