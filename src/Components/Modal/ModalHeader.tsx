import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {Divider, IconButton, Stack, Typography} from '@mui/material'

export function ModalHeader(props: {open: boolean; setOpen: any; title: string}) {
    const {setOpen, title} = props
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Stack position="sticky" top={0} zIndex={10}>
            <Stack direction="row" alignItems="center" padding="12px" spacing={2} bgcolor="white">
                <IconButton onClick={handleClose}>
                    <CloseIcon style={{color: '#B6BFCF'}} />
                </IconButton>
                <Typography variant="subtitle1" fontWeight={700}>
                    {title}
                </Typography>
            </Stack>
            <Divider />
        </Stack>
    )
}