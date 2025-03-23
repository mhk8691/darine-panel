import {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../../Components/Table/EditPage'
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {CustomTextField} from '../../../../Components/Input/CustomTextField'
import {FieldType} from '../../Method'

export function FieldEdit() {
    const id = useParams().accountId
    const RESOURCE = `account/base-accounts/${id}/fields`
    const state = useLocation().state as {row: FieldType}
    const [field, setField] = useState(state.row)
    const handleChange = (event: SelectChangeEvent) => {
        setField((prev) => {
            return {...prev, type: event.target.value as string} as FieldType
        })
    }
    const inputType = [
        {label: 'متن', value: 'text'},
        {label: 'شماره', value: 'number'},
        {label: 'ایمیل', value: 'email'},
        {label: 'رمز عبور', value: 'password'},
    ]
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش فیلد"
            formDetails={field}
            initialData={state.row}
            redirect={'base-accounts'}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="title"
                        setData={setField}
                        resource={RESOURCE}
                        value={field.title}
                        label={'عنوان اینپوت'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="description"
                        setData={setField}
                        resource={RESOURCE}
                        value={field.description}
                        label={'توضیحات'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <FormControl
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '54.56px !important',
                            },
                            '& .MuiSelect-select': {
                                fontSize: '15px !important',
                            },
                            '& .Mui-disabled': {
                                color: '#3f3f3f !important',
                            },
                        }}
                    >
                        <InputLabel
                            id="demo-simple-select-label"
                            sx={{
                                fontSize: '15px !important',
                            }}
                        >
                            تایپ اینپوت
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={field.type ?? ''}
                            label="تایپ اینپوت"
                            onChange={handleChange}
                            sx={{
                                '& .MuiAutocomplete-listbox': {
                                    fontSize: '15px',
                                },
                                '& .MuiAutocomplete-option': {
                                    py: '12px !important',
                                },
                            }}
                        >
                            {inputType.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
              
            </Grid>
        </EditPage>
    )
}
