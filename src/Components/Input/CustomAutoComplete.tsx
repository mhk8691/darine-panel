import {Autocomplete} from '@mui/material'
import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {CustomTextField} from './CustomTextField'

export function CustomAutocomplete(props) {
    const {options, defaultValue, label, name, setData, optionValue} = props
    const [inputValue, setInputValue] = useState(defaultValue)
    async function changeField(value) {
        if (value) {
            setData((prev) => {
                return {...prev, [name]: optionValue ? value[optionValue] : value.label}
            })
            setInputValue(value)
        }
    }

    return (
        <Autocomplete
            value={inputValue}
            options={options ? options : []}
            onChange={(e, value) => changeField(value)}
            popupIcon={<ExpandMoreIcon color="disabled" />}
            renderInput={(params) => <CustomTextField label={label} {...params} />}
        />
    )
}