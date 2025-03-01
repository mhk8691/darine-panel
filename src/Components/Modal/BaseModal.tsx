import * as React from 'react'
import {makeStyles} from '@mui/styles'
import Modal from '@mui/material/Modal'
import {Box} from '@mui/material'
import {ModalHeader} from './ModalHeader'

export function BaseModal(props) {
    const {open, setOpen, title, onClose} = props
    const classes = useStyles()

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else {
            setOpen(false)
        }
    }
    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose} 
            style={{display: 'flex', justifyContent: 'center'}}
        >
            <Box className={classes.root}>
                <ModalHeader open={open} setOpen={setOpen} title={title} />
                <Box padding="10px">{props.children}</Box>
            </Box>
        </Modal>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    root: {
        width: '80%',
        background: 'white',
        alignSelf: 'flex-start',
        boxShadow: '0px 10px 20px -5px rgba(42, 48, 59, 0.2)',
        margin: '10px 0px',
        // position: 'absolute',
        // top: '50%',
        // msTransform: 'translateY(-50%)',
        // transform: 'translateY(-50%)',
        // paddingBottom: '24px',
        // boxSizing: 'border-box',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        borderRadius: '8px',
    },
}))