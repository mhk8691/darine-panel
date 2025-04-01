import {Button, Grid, Stack, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {BaseModal} from '../../Components/Modal/BaseModal'
import OptionsTable from '../../Components/Table/OptionsTable'
import {DataProvider} from '../../Core/DataProvider'
import {OptionType} from '../../Core/types'
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
export default function Options({productId, getProduct, setProduct, product, editMode}: Props) {
    const [newOption, setNewOption] = useState<OptionType>({} as OptionType)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const dispatch = useDispatch()
    const addOption = async () => {
        if (!newOption.title || !newOption.price) {
            return
        }

        if (editMode) {
            try {
                let res = await DataProvider.post<ProductDetailType>(
                    `${RESOURCE}/${productId}/add_option/`,
                    {
                        data: {
                            title: newOption.title,
                            price: newOption.price,
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
                const existingOptionIndex = prevProduct.options?.findIndex(
                    (option) => option.id === newOption.id,
                )

                let updatedOptions
                if (existingOptionIndex !== -1 && existingOptionIndex !== undefined) {
                    updatedOptions = prevProduct.options?.map((option) =>
                        option.id === newOption.id ? newOption : option,
                    )
                } else {
                    updatedOptions = [
                        ...(prevProduct.options || []),
                        {
                            id: Date.now(),
                            title: newOption.title,
                            price: newOption.price,
                        },
                    ]
                }

                return {
                    ...prevProduct,
                    options: updatedOptions,
                }
            })
        }
        setNewOption({title: '', price: undefined} as OptionType)
    }

    const removeOption = async (id: number) => {
        if (editMode) {
            try {
                dispatch(setUtil({loading: true}))
                const res = await DataProvider.delete(`${RESOURCE}/${productId}/options/${id}/`)
                getProduct && getProduct()
                dispatch(setUtil({open: true, message: res.message, severity: 'success'}))
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
            dispatch(setUtil({loading: false}))
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                options: prevProduct.options.filter((option) => option.id !== id),
            }))
        }
        setDeleteModal(false)
    }
    const editOption = (id: number) => {
        setNewOption(product.options.find((option) => option.id === id) as OptionType)
    }

    return (
        <>
            <Grid item xs={12} sx={{mt: 3}}>
                <Typography variant="body2" fontSize={'15px'} sx={{fontWeight: '600'}}>
                    افزودن آپشن
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newOption.id}
                    name="title"
                    resource={RESOURCE}
                    value={newOption.title}
                    onChange={(e) => setNewOption({...newOption, title: e.target.value})}
                    label={'عنوان'}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newOption.id}
                    name="price"
                    setData={setNewOption}
                    resource={RESOURCE}
                    value={newOption.price || ''}
                    onChange={(e) => setNewOption({...newOption, price: Number(e.target.value)})}
                    label={'قیمت'}
                />
            </Grid>
            <Grid xs={12} sm={6} md={4} xl={3} item>
                <Button
                    variant="outlined"
                    onClick={addOption}
                    size="large"
                    sx={{height: '53px', borderRadius: '4px !important'}}
                    fullWidth
                >
                    {'تایید'}
                </Button>
            </Grid>
            {product.options?.length > 0 && (
                <Grid item xs={12}>
                    <OptionsTable
                        data={product.options}
                        editProperty={editOption}
                        url={`/product/${productId}/options/`}
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
                        onClick={() => removeOption(deleteId || 0)}
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
