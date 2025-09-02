import {Button, Stack} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'
import {DataProvider} from '../../Core/DataProvider'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

export type CategoriesType = {
    id: number
    name: string
    thumbnail: string | File
    parent: number
    children_count: string
    products_count: string
}
const RESOURCE = 'category'

export function Categories({
    category,
    setCategory,
}: {
    category: CategoriesType
    setCategory: React.Dispatch<React.SetStateAction<CategoriesType>>
}) {
    const [open, setOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState('')
    const [parentCategory, setParentCategory] = useState<{
        results: CategoriesType[]
    }>({results: []})
    async function getCategory() {
        try {
            const response = await DataProvider.get<{
                results: CategoriesType[]
            }>(`${RESOURCE}/`)
            setParentCategory({
                results: response.data.results,
            })
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
    console.log(
        'defaultValue:',
        parentCategory.results
            .map((item) => ({label: item.name, id: item.id}))
            .find((option) => option.id === category.parent),
    )
    return (
        <Stack>
            {category && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        <CustomTextField
                            name="name"
                            setData={setCategory}
                            resource={RESOURCE}
                            label={'نام'}
                            defaultValue={category.name}
                        />,
                        <CustomAutocomplete
                            key={category.parent} // می‌تونی حتی اینو هم حذف کنی
                            options={parentCategory.results.map((item) => ({
                                label: item.name,
                                id: item.id,
                            }))}
                            name="parent"
                            setData={setCategory}
                            value={
                                parentCategory.results
                                    .map((item) => ({
                                        label: item.name,
                                        id: item.id,
                                    }))
                                    .find((option) => option.id === category.parent) || null
                            }
                            label={'دسته بندی والد'}
                        />,
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpen(true)}
                            size="large"
                            fullWidth
                            sx={{height: '53px', borderRadius: '4px !important'}}
                        >
                            {category.thumbnail ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                        </Button>,
                    ]}
                />
            )}
            <ImageUploader
                imageName="thumbnail"
                data={category}
                open={open}
                setOpen={setOpen}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setData={setCategory}
            />
        </Stack>
    )
}
