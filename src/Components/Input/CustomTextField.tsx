import React from 'react'
import {alpha, styled} from '@mui/material/styles'
import {TextField, TextFieldProps, Theme} from '@mui/material'

type CustomTextFieldProps = {setData?: any; change?: any} & TextFieldProps
export function CustomTextField(props: CustomTextFieldProps) {
    const {setData, change} = props
    async function changeField(event) {
        if (!change && setData) {
            setData((prev) => {
                return {...prev, [event.target.name]: event.target.value}
            })
        } else if (change) {
            change(event)
        }
    }
    return (
        <Custom
            onChange={changeField}
            InputProps={{disableUnderline: true}}
            variant="filled"
            fullWidth
            {...props}
        />
    )
}

const Custom = styled(TextField)(({theme}) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}))
