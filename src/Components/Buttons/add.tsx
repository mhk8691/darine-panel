import React from 'react'
import Button from '@mui/material/Button'
import {makeStyles} from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
function AddButton(props) {
    const classes = useStyles()
    return (
        <Button
            href={props.href}
            // size="large"
            variant="outlined"
            startIcon={!props.noIcon && <AddIcon style={{marginLeft: '8px'}} />}
            className={classes.addButton}
            {...props}
        >
            {props.text}
        </Button>
    )
}

const useStyles = makeStyles((theme) => ({
    addButton: {
        padding: '4px 8px 5px 16px',
        fontSize: '20px',
        fontWeight: 700,
    },
}))

export default AddButton
