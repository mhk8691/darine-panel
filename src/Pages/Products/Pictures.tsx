import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {Box, Button, Grid, IconButton, Stack} from '@mui/material'
import React, {ChangeEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {BaseModal} from '../../Components/Modal/BaseModal'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'
import {ProductDetailType} from './Detail/ProductDetail'

interface Props {
    product: ProductDetailType
    setProduct: React.Dispatch<React.SetStateAction<ProductDetailType>>
    getProduct?: () => Promise<void>
    editMode?: boolean
}

export default React.memo(function Pictures({product, setProduct, getProduct, editMode}: Props) {
    const [files, setFiles] = useState<File[]>([])
    const [open, setOpen] = useState(false)
    const productId = useParams().id
    const dispatch = useDispatch()
    const handleDeletePicture = async (pictureId: number) => {
        if (editMode) {
            dispatch(setUtil({loading: true}))
            try {
                await DataProvider.delete(`product/${productId}/pictures/${pictureId}/`)
                if (getProduct) {
                    getProduct()
                }
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
            dispatch(setUtil({loading: false}))
        } else {
            setProduct((prev) => ({
                ...prev,
                pictures: prev.pictures.filter((image) => image.id !== pictureId),
            }))
        }
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
    const handleNewPicture = async () => {
        try {
            const formData = new FormData()
            files.forEach((file) => {
                formData.append('pictures', file)
            })
            await DataProvider.post(`product/${productId}/add_picture/`, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (getProduct) {
                getProduct()
                setFiles([])
            }
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
    }
    return (
        <>
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
                        product?.pictures?.map((image) => (
                            <Grid
                                item
                                xs={3}
                                sx={{
                                    position: 'relative',
                                }}
                            >
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
                                {editMode && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                        }}
                                    >
                                        <IconButton onClick={() => handleDeletePicture(image.id)}>
                                            <DeleteOutlineIcon
                                                color={'inherit'}
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    borderRadius: 1,
                                                    fontSize: '1.8rem',
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                )}
                            </Grid>
                        ))}
                </Grid>

                <Stack direction={'row'} spacing={2} mt={2}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            if (files.length > 0) {
                                if (!editMode) {
                                    setProduct((prev) => ({
                                        ...prev,
                                        pictures: [
                                            ...(prev.pictures || []),
                                            ...files.map((file) => {
                                                return file
                                            }),
                                        ],
                                    }))
                                    setFiles([])
                                } else {
                                    handleNewPicture()
                                }
                            }
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
        </>
    )
})
