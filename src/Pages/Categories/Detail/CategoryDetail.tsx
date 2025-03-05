import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {CategoriesType} from '../Categories'

const RECOURCE = 'poruduct-category'

export function CategoryDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<CategoriesType | null>({
        id: 1,
        name: 'category 1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
    })
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
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {category?.id}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {category?.name}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    تصویر:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {typeof category?.image === 'string' ? category?.image : category?.image?.name}
                </Typography>
            </Stack>
        </Stack>
    )
}
