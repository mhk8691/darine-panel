import {Button, Grid, Stack, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {BaseModal} from '../../Components/Modal/BaseModal'
import PropertiesTable from '../../Components/Table/PropertiesTable'
import {DataProvider} from '../../Core/DataProvider'
import {PropertyType} from '../../Core/types'
import {setUtil} from '../../redux/UtilSlice'
import {ProductDetailType} from './Detail/ProductDetail'
interface Props {
    productId: string | undefined
    getProduct: (() => Promise<void>) | undefined
    setProduct: React.Dispatch<React.SetStateAction<ProductDetailType>>
    product: ProductDetailType
    editMode: boolean
}
const RESOURCE = 'product'
export default function Properties({productId, getProduct, setProduct, product, editMode}: Props) {
    const [newProperty, setNewProperty] = useState<PropertyType>({} as PropertyType)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const dispatch = useDispatch()
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

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="body2" fontSize={'15px'} sx={{fontWeight: '600'}}>
                    افزودن properties
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newProperty.id}
                    name="name"
                    resource={RESOURCE}
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                    label={'نام'}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newProperty.id}
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
                        url={`/product/${productId}/properties/`}
                        editMode={editMode}
                        setDeleteId={setDeleteId}
                        setDeleteModal={setDeleteModal}
                    />
                </Grid>
            )}
            <BaseModal
                open={deleteModal}
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
        </>
    )
}
