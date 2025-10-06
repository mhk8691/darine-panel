import {TextField, TextFieldProps} from '@mui/material'
import {styled} from '@mui/material/styles'

type CustomTextFieldProps = {
    setData?: any
    change?: any
    register?: any
    endIcon?: any
} & TextFieldProps
export function CustomTextField(props: CustomTextFieldProps) {
    const {setData, change, register, endIcon} = props
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
            InputProps={{disableUnderline: true, endAdornment: endIcon}}
            variant="outlined"
            fullWidth
            {...register}
            {...props}
        />
    )
}

const Custom = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.6,
        },
    },
    '& .MuiOutlinedInput-input': {
        fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
        fontSize: 15,
        '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            opacity: 0.7,
        },
    },
}))
