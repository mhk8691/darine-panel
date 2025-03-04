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
            variant="outlined"
            fullWidth
            {...props}
        />
    )
}

const Custom = styled(TextField)(({theme}) => ({
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: 10,
    },
    '& .MuiOutlinedInput-input ': {
        fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
        fontSize: 15,
        
    },
}))
