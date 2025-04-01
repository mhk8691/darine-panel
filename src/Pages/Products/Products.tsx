import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material'
import {ChangeEvent, useEffect, useState} from 'react'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {PropertyType} from '../../Core/types'
import PropertiesTable from '../../Components/Table/PropertiesTable'
import {CategoriesType} from '../Categories/Categories'
import {DataProvider} from '../../Core/DataProvider'
import {BaseModal} from '../../Components/Modal/BaseModal'
import {MethodType} from '../ConnectionMethod/Method'
import {ProductDetailType} from './Detail/ProductDetail'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {ElevatorSharp} from '@mui/icons-material'
import Properties from './Properties'

export type ProductsType = {
    id: number
    name: string
    short_introduction: string
    description: string
    base_price: number
    max_price: number
    connectionMethod: number
    type: 'coins' | 'account'
    category: number
    picture: any
    options?: {
        tittle: string
        price: number
    }[]
    video: string | File | null
    properties: PropertyType[]
}

const RESOURCE = 'product'

export function Products({
    product,
    setProduct,
    editMode = false,
    getProduct,
}: {
    product: ProductDetailType
    setProduct: React.Dispatch<React.SetStateAction<ProductDetailType>>
    editMode?: boolean
    getProduct?: () => Promise<void>
}) {
    const [files, setFiles] = useState<File[]>([])
    const productId = useParams().id
    const [open, setOpen] = useState(false)
    const [deletModal, setDeleteModal] = useState(false)

    const [newProperty, setNewProperty] = useState<PropertyType>({} as PropertyType)
    const [connectionMethod, setConnectionMethod] = useState<{
        results: MethodType[]
    } | null>(null)
    const [categories, setCategories] = useState<{
        results: CategoriesType[]
    } | null>(null)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const dispatch = useDispatch()
    const getCategories = async () => {
        try {
            const response = await DataProvider.get<{
                results: CategoriesType[]
            }>('category/')
            setCategories({results: response.data.results})
        } catch (error: any) {
            console.log(error)
        }
    }
    const getConnectionMethods = async () => {
        try {
            const response = await DataProvider.get<{
                results: MethodType[]
            }>('account/base-accounts/')
            setConnectionMethod({results: response.data.results})
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
        getConnectionMethods()
        console.log(product)
    }, [])
    const addProperty = async () => {
        if (!newProperty.name || !newProperty.value) {
            return
        }

        if (editMode) {
            try {
                let res = await DataProvider.post<ProductDetailType>(
                    `${RESOURCE}/${productId}/add_property/`,
                    {
                        data: {
                            name: newProperty.name,
                            value: newProperty.value,
                        },
                    },
                )
                dispatch(setUtil({open: true, message: res.message, severity: 'success'}))
                getProduct && getProduct()
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        } else {
            setProduct((prevProduct) => {
                const existingPropertyIndex = prevProduct.properties?.findIndex(
                    (property) => property.id === newProperty.id,
                )

                let updatedProperties
                if (existingPropertyIndex !== -1 && existingPropertyIndex !== undefined) {
                    updatedProperties = prevProduct.properties?.map((property) =>
                        property.id === newProperty.id ? newProperty : property,
                    )
                } else {
                    updatedProperties = [
                        ...(prevProduct.properties || []),
                        {
                            id: Date.now(),
                            name: newProperty.name,
                            value: newProperty.value,
                        },
                    ]
                }

                return {
                    ...prevProduct,
                    properties: updatedProperties,
                }
            })
        }
        setNewProperty({name: '', value: ''} as PropertyType)
    }

    const removeProperty = async (id: number) => {
        if (editMode) {
            try {
                dispatch(setUtil({loading: true}))
                const res = await DataProvider.delete(`${RESOURCE}/${productId}/properties/${id}/`)
                getProduct && getProduct()
                dispatch(setUtil({open: true, message: res.message, severity: 'success'}))
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
            dispatch(setUtil({loading: false}))
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                properties: prevProduct.properties.filter((property) => property.id !== id),
            }))
        }
        setDeleteModal(false)
    }
    const editProperty = (id: number) => {
        setNewProperty(product.properties.find((property) => property.id === id) as PropertyType)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(event.target.files || [])
        if (file) {
            setFiles(file)
        }
    }
    const handleDelete = () => {
        setOpen(false)
        setFiles([])
        console.log(product.pictures)
    }
    const handleVideo = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setProduct({...product, video: file})
        }
    }
    const handleChangeProductType = (event: SelectChangeEvent) => {
        setProduct((prev) => {
            return {...prev, type: event.target.value as 'coins' | 'account'}
        })
    }

    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={product.id}
                        name="name"
                        setData={setProduct}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={product.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        key={product.id}
                        options={categories?.results.map((category) => {
                            return {label: category.name, id: category.id}
                        })}
                        name="category"
                        setData={setProduct}
                        defaultValue={product.category?.name}
                        label={'دسته بندی'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        key={product.id}
                        options={connectionMethod?.results.map((method) => {
                            return {label: method.title, id: method.id}
                        })}
                        name="connection_method"
                        setData={setProduct}
                        defaultValue={product.connection_method?.title}
                        label={'روش اتصال'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={product.id}
                        name="base_price"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'قیمت'}
                        defaultValue={product.base_price}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
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
                            تایپ محصول
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={product.type ?? ''}
                            label="تایپ اینپوت"
                            onChange={handleChangeProductType}
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
                                value={'coins'}
                            >
                                سکه
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    fontSize: '15px !important',
                                }}
                                value={'account'}
                            >
                                {'اکانت'}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {product.pictures ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        key={product.id}
                        name="short_introduction"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'معرفی محصول'}
                        defaultValue={product.short_introduction}
                        multiline={true}
                        rows={7}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Stack
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Button
                            component="label"
                            htmlFor="video"
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{
                                py: 1.2,
                                width: {
                                    xs: '100%',
                                    sm: '60%',
                                    md: '50%',
                                },
                                mt: 1,
                                borderRadius: '4px !important',
                            }}
                        >
                            {product.video ? 'ویرایش ویدئو' : 'انتخاب ویدئو'}
                        </Button>
                        <input
                            type="file"
                            accept="video/mp4, video/webm, video/ogg, video/x-matroska"
                            id="video"
                            onChange={handleVideo}
                            style={{display: 'none', borderRadius: 2}}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {product.video && (
                        <Box
                            component={'video'}
                            src={
                                typeof product.video === 'string'
                                    ? product.video
                                    : URL.createObjectURL(product.video)
                            }
                            controls={true}
                            sx={{width: '100%', height: '100%'}}
                        />
                    )}
                </Grid>
                <Properties
                    addProperty={addProperty}
                    newProperty={newProperty}
                    setNewProperty={setNewProperty}
                />

                {product.properties?.length > 0 && (
                    <Grid item xs={12}>
                        <PropertiesTable
                            data={product.properties}
                            editProperty={editProperty}
                            removeProperty={removeProperty}
                            url={`/product/${productId}/properties/`}
                            editMode={editMode}
                            setDeleteId={setDeleteId}
                            setDeleteModal={setDeleteModal}
                        />
                    </Grid>
                )}
            </Grid>
            <BaseModal
                open={open}
                setOpen={setOpen}
                title="انتخاب تصویر"
                onClose={handleDelete}
                style={{maxWidth: 700}}
            >
                <input
                    name="name"
                    type="file"
                    onChange={handleChange}
                    multiple
                    style={{
                        marginBottom: '16px',
                        border: '1px solid #525252',
                        width: '100%',
                        padding: '12px',
                        borderRadius: '4px',
                    }}
                />

                <Grid container spacing={2}>
                    {files.length > 0 &&
                        files &&
                        files.map((file) => (
                            <Grid item xs={3}>
                                <Box
                                    component={'img'}
                                    src={URL.createObjectURL(file)}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 2,
                                    }}
                                />
                            </Grid>
                        ))}
                    {product?.pictures &&
                        files.length === 0 &&
                        product?.pictures?.map((image) => (
                            <Grid item xs={3}>
                                <Box
                                    component={'img'}
                                    src={
                                        typeof image.picture === 'string'
                                            ? image.picture
                                            : URL.createObjectURL(image.picture || image)
                                    }
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 2,
                                    }}
                                />
                            </Grid>
                        ))}
                </Grid>

                <Stack direction={'row'} spacing={2} mt={2}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            setProduct((prev) => ({
                                ...prev,
                                pictures: files.map((file) => {
                                    return file
                                }),
                            }))
                            setOpen(false)
                        }}
                        disabled={!files}
                    >
                        تایید
                    </Button>
                    <Button variant="outlined" color="primary" size="large" onClick={handleDelete}>
                        لغو
                    </Button>
                </Stack>
            </BaseModal>
            <BaseModal
                open={deletModal}
                setOpen={setDeleteModal}
                title="توجه!"
                style={{maxWidth: 'sm'}}
            >
                <Typography mb="1rem" variant="body2" fontSize={'17px'}>
                    آیا از انجام این عمل مطمئن هستید؟
                </Typography>
                <Stack direction={'row'} spacing={2} mt={2.5}>
                    <Button
                        variant="contained"
                        onClick={() => removeProperty(deleteId || 0)}
                        size="large"
                    >
                        بله
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setDeleteModal(false)}
                        size="large"
                    >
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
        </Stack>
    )
}
