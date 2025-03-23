import {Box, Button, Grid, Stack} from '@mui/material'
import {ChangeEvent, useEffect, useState} from 'react'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {PropertyType} from '../../Core/types'
import PropertiesTable from '../../Components/Table/PropertiesTable'
import {CategoriesType} from '../Categories/Categories'
import {DataProvider} from '../../Core/DataProvider'
import {BaseModal} from '../../Components/Modal/BaseModal'

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
    picture: string[] | File[]
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
}: {
    product: ProductsType
    setProduct: React.Dispatch<React.SetStateAction<ProductsType>>
}) {
    const [files, setFiles] = useState<File[]>([])

    const [open, setOpen] = useState(false)
    const [newProperty, setNewProperty] = useState<PropertyType>({} as PropertyType)
    const [categories, setCategories] = useState<{
        results: CategoriesType[]
    } | null>(null)
    const getCategories = async () => {
        try {
            const response = await DataProvider.get<{
                results: CategoriesType[]
            }>('category/')
            setCategories(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    const addProperty = () => {
        if (!newProperty.name || !newProperty.value) {
            return
        }

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

        setNewProperty({name: '', value: ''} as PropertyType)
    }

    const removeProperty = (id: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            properties: prevProduct.properties.filter((property) => property.id !== id),
        }))
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
    }
    const handleVideo = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setProduct({...product, video: file})
        }
    }
    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="name"
                        setData={setProduct}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={product.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        options={categories?.results.map((category) => {
                            return {label: category.name, id: category.id}
                        })}
                        name="category"
                        setData={setProduct}
                        defaultValue={product.category}
                        label={'دسته بندی'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        options={[
                            {label: 'فیسبوک', id: 1},
                            {label: 'اکتیویژن', id: 2},
                        ]}
                        name="connection_method"
                        setData={setProduct}
                        defaultValue={product.connectionMethod}
                        label={'روش اتصال'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="description"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'توضیحات'}
                        defaultValue={product.description}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="base_price"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'قیمت'}
                        defaultValue={product.base_price}
                    />
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
                        {product.picture ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
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
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={newProperty.name}
                        name="name"
                        resource={RESOURCE}
                        value={newProperty.name}
                        onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                        label={'نام'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={newProperty.value}
                        name="label"
                        setData={setNewProperty}
                        resource={RESOURCE}
                        value={newProperty.value}
                        onChange={(e) => setNewProperty({...newProperty, value: e.target.value})}
                        label={'مقدار'}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4} xl={3} item>
                    <Button
                        variant="outlined"
                        onClick={addProperty}
                        size="large"
                        sx={{height: '53px', borderRadius: '4px !important'}}
                        fullWidth
                    >
                        {'تایید'}
                    </Button>
                </Grid>
                {product.properties?.length > 0 && (
                    <Grid item xs={12}>
                        <PropertiesTable
                            data={product.properties}
                            editProperty={editProperty}
                            removeProperty={removeProperty}
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
                    {product?.picture &&
                        files.length === 0 &&
                        product?.picture?.map((image) => (
                            <Grid item xs={3}>
                                <Box
                                    component={'img'}
                                    src={
                                        typeof image === 'string'
                                            ? image
                                            : URL.createObjectURL(image)
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
                            setProduct((prev) => ({...prev, picture: files}))
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
        </Stack>
    )
}
