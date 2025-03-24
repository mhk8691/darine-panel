import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'

export type BannersType = {
    id: number
    title: string
    subtitle: string
    image: string | File
    url: string
    active: boolean
}
const RESOURCE = 'banners'

export function Banners({
    banner,
    setBanner,
}: {
    banner: BannersType
    setBanner: React.Dispatch<React.SetStateAction<BannersType>>
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
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'عنوان'}
                        defaultValue={banner.title}
                    />,
                    <CustomTextField
                        name="name"
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'ساب تایتل'}
                        defaultValue={banner.subtitle}
                    />,
                    <CustomTextField
                        name="name"
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'لینک'}
                        defaultValue={banner.url}
                    />,

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {banner.image ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>,
                ]}
            />
            <ImageUploader
                imageName="image"
                data={banner}
                open={open}
                setOpen={setOpen}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setData={setBanner}
            />
        </Stack>
    )
}
