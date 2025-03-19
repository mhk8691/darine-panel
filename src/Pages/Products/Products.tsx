import {Button, Grid, Stack} from '@mui/material'
import {useState} from 'react'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import { PropertyType } from '../../Core/types'
import PropertiesTable from '../../Components/Table/PropertiesTable'

export type ProductsType = {
    id: number
    name: string
    introduction: string
    connectionMethod: string
    description: string
    price: number
    category: string
    image: string | File
    properties:PropertyType[]
}

const RESOURCE = 'products'

export function Products({
    product,
    setProduct,
}: {
    product: ProductsType
    setProduct: React.Dispatch<React.SetStateAction<ProductsType>>
}) {
    const [imagePreview, setImagePreview] = useState('')
    const [open, setOpen] = useState(false)
    const [newProperty, setNewProperty] = useState<PropertyType>({} as PropertyType)

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
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {product.image ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        name="introduction"
                        resource={RESOURCE}
                        setData={setProduct}
                        label={'معرفی محصول'}
                        defaultValue={product.introduction}
                        multiline={true}
                        rows={7}
                    />
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
            <ImageUploader
                key={'products'}
                data={product}
                open={open}
                setOpen={setOpen}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setData={setProduct}
            />
        </Stack>
    )
}
