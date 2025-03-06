import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CategoriesType = {
    id: number
    name: string
    image: string | File
}
const RESOURCE = 'poruduct-category'

export function Categories({
    category,
    setCategory,
}: {
    category: CategoriesType
    setCategory: React.Dispatch<React.SetStateAction<CategoriesType>>
}) {
    const [open, setOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState('')

    return (
        <Stack>
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
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {category.image ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>,
                ]}
            />
            <ImageUploader
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
