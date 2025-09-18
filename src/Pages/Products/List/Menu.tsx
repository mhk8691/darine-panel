import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import {Menu, MenuItem, Stack, Typography} from '@mui/material'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {useNavigate} from 'react-router-dom'
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
}: {
    item: ProductsListType
    anchorEl: HTMLElement | null
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}) {
    const navigate = useNavigate()

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

    const handleDelete = () => {
        console.log('حذف:', item)
        handleMenuClose()
    }
    return (
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
                onClick={handleDelete}
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
    )
}
