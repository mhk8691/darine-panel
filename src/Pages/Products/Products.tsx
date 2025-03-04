import {Stack, Grid, Box} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

export type ProductsType = {
    id: number
    name: string
    introduction: string
    connectionMethod: string
    description: string
    price: number
    category: string
    image: string
}

const RESOURCE = 'products'

export function Products({
    product,
    setProduct,
}: {
    product: ProductsType
    setProduct: React.Dispatch<React.SetStateAction<ProductsType>>
}) {
    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2}>
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
                        options={[
                            {label: 'کلش آف کلنز', id: 'clash_of_clans'},
                            {label: 'کالاف دیوتی موبایل', id: 'codm'},
                        ]}
                        name="category"
                        setData={setProduct}
                        defaultValue={product.category}
                        label={'دسته بندی'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        options={[
                            {label: 'فیسبوک', id: 'facebook'},
                            {label: 'اکتیویژن', id: 'activision'},
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
                        name="price"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'قیمت'}
                        defaultValue={product.price}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        type="file"
                        name="image"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'تصویر'}
                    />
                    {product.image && (
                        <Box
                            component={'img'}
                            src={product.image}
                            sx={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 2,
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        name="introduction"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'معرفی محصول'}
                        defaultValue={product.introduction}
                        multiline={true}
                        rows={5}
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}
