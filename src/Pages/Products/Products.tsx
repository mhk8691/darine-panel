import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CustomAutocomplete } from '../../Components/Input/CustomAutoComplete'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { DataProvider } from '../../Core/DataProvider'
import { PropertyType } from '../../Core/types'
import { CategoriesType } from '../Categories/Categories'
import { MethodType } from '../ConnectionMethod/Method'
import { ProductDetailType } from './Detail/ProductDetail'
import Options from './Options'
import Pictures from './Pictures'
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
    intro_video: string | File | null
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
    const productId = useParams().id
    const [connectionMethod, setConnectionMethod] = useState<{
        results: MethodType[]
    } | null>(null)
    const [categories, setCategories] = useState<{
        results: CategoriesType[]
    } | null>(null)

    const getCategories = async () => {
        try {
            const response = await DataProvider.get<{
                results: CategoriesType[]
            }>('category/')
            setCategories({ results: response.data.results })
        } catch (error: any) {
            console.log(error)
        }
    }
    const getConnectionMethods = async () => {
        try {
            const response = await DataProvider.get<{
                results: MethodType[]
            }>('account/base-accounts/')
            setConnectionMethod({ results: response.data.results })
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
        getConnectionMethods()
        console.log(product)
    }, [])

    const handleVideo = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setProduct({ ...product, intro_video: file })
        }
    }
    const handleChangeProductType = (event: SelectChangeEvent) => {
        setProduct((prev) => {
            return { ...prev, type: event.target.value as 'coins' | 'account' }
        })
    }
    const handleChangeVisible = (event: SelectChangeEvent) => {
        setProduct((prev) => {
            return { ...prev, visible: event.target.value as 'true' | 'false' }
        })
    }

    return (
        <Stack sx={{ marginBottom: '16px' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CustomTextField
                            key={product.id}
                            name="stock"
                            setData={setProduct}
                            resource={RESOURCE}
                            label={'تعداد موجودی'}
                            type="number"
                            value={product.stock ?? ''} 
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    stock: e.target.value === '' ? null : Number(e.target.value),
                                }))
                            }
                            disabled={product.stock === null || product.stock === ''} 
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={product.stock === null || product.stock === ''}
                                    onChange={(e) =>
                                        setProduct((prev) => ({
                                            ...prev,
                                            stock: e.target.checked ? '' : 0,
                                        }))
                                    }
                                />
                            }
                            label="نامحدود"
                        />
                    </div>
                </Grid>


                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        key={product.id}
                        options={categories?.results.map((category) => {
                            return { label: category.name, id: category.id }
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
                            return { label: method.title, id: method.id }
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
                        label={'قیمت پایه'}
                        defaultValue={product.base_price}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={product.id}
                        name="max_price"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'حداکثر قیمت'}
                        defaultValue={product.max_price}
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

                            value={product.visibl}
                            label="وضعیت"
                            onChange={handleChangeVisible}
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
                                value={'true'}
                            >
                                قابل مشاهده
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    fontSize: '15px !important',
                                }}
                                value={'false'}
                            >
                                غیر قابل مشاهده
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <Pictures
                        product={product}
                        getProduct={getProduct}
                        setProduct={setProduct}
                        editMode={editMode}
                    />
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
                            {product.intro_video ? 'ویرایش ویدئو' : 'انتخاب ویدئو'}
                        </Button>
                        <input
                            type="file"
                            accept="video/mp4, video/webm, video/ogg, video/x-matroska"
                            id="video"
                            onChange={handleVideo}
                            style={{ display: 'none', borderRadius: 2 }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {product.intro_video && (
                        <Box
                            component={'video'}
                            src={
                                typeof product.intro_video === 'string'
                                    ? product.intro_video
                                    : URL.createObjectURL(product.intro_video)
                            }
                            controls={true}
                            sx={{ width: '50%', }}
                        />
                    )}
                </Grid>

                <Properties
                    editMode={editMode}
                    product={product}
                    getProduct={getProduct}
                    setProduct={setProduct}
                    productId={productId}
                />

                <Options
                    editMode={editMode}
                    product={product}
                    getProduct={getProduct}
                    setProduct={setProduct}
                    productId={productId}
                />
            </Grid>
        </Stack>
    )
}
