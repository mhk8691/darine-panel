import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import {Button, Menu, MenuItem, Stack, Typography} from '@mui/material'
import {Dispatch, SetStateAction, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {BaseModal} from '../../../Components/Modal/BaseModal'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {ProductsListType} from './ProductsList'
const options = [
    {
        name: 'مشاهده جزئیات',
        icon: <InfoIcon />,
        href: '/profile',
    },
    {
        name: 'ویرایش مخصول',
        icon: <EditIcon />,
        href: '/profile/orders',
    },
    {
        name: 'حذف محصول',
        icon: <DeleteIcon />,
        href: '/profile/comments',
    },
]
export default function ProductMenu({
    item,
    anchorEl,
    setAnchorEl,
    getList,
}: {
    item: ProductsListType
    anchorEl: HTMLElement | null
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
    getList: () => Promise<void>
}) {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const open = Boolean(anchorEl)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleDetail = () => {
        navigate(`/product/detail/${item.id}`)
        handleMenuClose()
    }
    const handleEdit = () => {
        navigate(`/product/${item.id}`)
        handleMenuClose()
    }

    async function handleDelete() {
        dispatch(setUtil({loading: true}))
        try {
            await DataProvider.delete(`product/${item.id}/`)
            getList()
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        dispatch(setUtil({loading: false}))
        setOpenModal(false)
    }
    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                sx={{'& .MuiMenu-paper': {minWidth: 160}}}
            >
                <MenuItem
                    onClick={handleDetail}
                    sx={{
                        p: 0,
                    }}
                >
                    <Stack
                        direction={'row'}
                        gap={1.5}
                        alignItems={'center'}
                        width={'100%'}
                        p={1.2}
                        component={'div'}
                    >
                        <Stack>
                            <InfoIcon />
                        </Stack>
                        <Typography variant="body1" sx={{fontWeight: 400, fontSize: '13px'}}>
                            مشاهده جزئیات
                        </Typography>
                    </Stack>
                </MenuItem>
                <MenuItem
                    onClick={handleEdit}
                    sx={{
                        p: 0,
                    }}
                >
                    <Stack
                        direction={'row'}
                        gap={1.5}
                        alignItems={'center'}
                        width={'100%'}
                        p={1.2}
                        component={'div'}
                    >
                        <Stack>
                            <EditIcon />
                        </Stack>
                        <Typography variant="body1" sx={{fontWeight: 400, fontSize: '13px'}}>
                            ویرایش محصول
                        </Typography>
                    </Stack>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setOpenModal(true)
                        setAnchorEl(null)
                    }}
                    sx={{
                        p: 0,
                    }}
                >
                    <Stack
                        direction={'row'}
                        gap={1.5}
                        alignItems={'center'}
                        width={'100%'}
                        p={1.2}
                        component={'div'}
                    >
                        <Stack>
                            <DeleteIcon />
                        </Stack>
                        <Typography variant="body1" sx={{fontWeight: 400, fontSize: '13px'}}>
                            حذف محصول
                        </Typography>
                    </Stack>
                </MenuItem>
            </Menu>
            <BaseModal
                open={openModal}
                setOpen={setOpenModal}
                title="توجه!"
                style={{maxWidth: 'sm'}}
            >
                <Typography mb="1rem" variant="body2" fontSize={'17px'}>
                    آیا از انجام این عمل مطمئن هستید؟
                </Typography>
                <Stack direction={'row'} spacing={2} mt={2.5}>
                    <Button variant="contained" onClick={handleDelete} size="large">
                        بله
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setOpenModal(false)}
                        size="large"
                    >
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
        </>
    )
}
