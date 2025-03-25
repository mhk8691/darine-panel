import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
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
    active: boolean | string
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
    const handleChange = (event: SelectChangeEvent) => {
        setBanner((prev) => {
            return {...prev, active: event.target.value === 'فعال' ? true : false}
        })
    }
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="title"
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'عنوان'}
                        defaultValue={banner.title}
                    />,
                    <CustomTextField
                        name="subtitle"
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'ساب تایتل'}
                        defaultValue={banner.subtitle}
                    />,
                    <CustomTextField
                        name="url"
                        setData={setBanner}
                        resource={RESOURCE}
                        label={'لینک'}
                        defaultValue={banner.url}
                        sx={{
                            '& .MuiInputBase-input': {
                                direction: 'rtl !important',
                            },
                        }}
                    />,
                    <FormControl
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '54.56px !important',
                            },
                            '& .MuiSelect-select': {
                                fontSize: '15px !important',
                            },
                            '& .Mui-disabled': {
                                color: '#3f3f3f !important',
                            },
                        }}
                    >
                        <InputLabel
                            id="demo-simple-select-label"
                            sx={{
                                fontSize: '15px !important',
                            }}
                        >
                            وضعیت
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={banner.active ? 'فعال' : 'غیر فعال'}
                            label="وضعیت"
                            onChange={handleChange}
                            sx={{
                                '& .MuiAutocomplete-listbox': {
                                    fontSize: '15px',
                                },
                                '& .MuiAutocomplete-option': {
                                    py: '12px !important',
                                },
                            }}
                        >
                            <MenuItem
                                sx={{
                                    fontSize: '15px !important',
                                }}
                                value={'فعال'}
                            >
                                فعال
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    fontSize: '15px !important',
                                }}
                                value={'غیر فعال'}
                            >
                                غیر فعال
                            </MenuItem>
                        </Select>
                    </FormControl>,

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
