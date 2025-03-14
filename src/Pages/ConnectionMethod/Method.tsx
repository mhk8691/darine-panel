import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {useState} from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FieldsTable from './FieldsTable'
type InputType = {
    type: 'text' | 'number' | 'email' | 'password'
}
export type FieldType = {
    id: number
    label: string
    name: string
    type: string
}

export type MethodType = {
    id: number
    name: string
    fields: FieldType[]
}

const RESOURCE = 'connection_method'

export function ConnectionMethod({
    method,
    setMethod,
}: {
    method: MethodType
    setMethod: React.Dispatch<React.SetStateAction<MethodType>>
}) {
    const [newField, setNewField] = useState<FieldType>({} as FieldType)
    const inputType = [
        {label: 'متن', value: 'text'},
        {label: 'شماره', value: 'number'},
        {label: 'ایمیل', value: 'email'},
        {label: 'رمز عبور', value: 'password'},
    ]
    const addField = () => {
        if (!newField.name || !newField.label || !newField.type) {
            return
        }
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: [
                ...(prevMethod.fields || []),
                {
                    id: Date.now(),
                    label: newField?.label,
                    name: newField?.name,
                    type: newField?.type,
                },
            ],
        }))
        setNewField({
            name: '',
            label: '',
            type: '',
        } as FieldType)
    }

    // حذف یک input بر اساس id
    const removeField = (id: number) => {
        console.log('clicked')
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: prevMethod.fields.filter((field) => field.id !== id),
        }))
    }
    const handleChange = (event: SelectChangeEvent) => {
        setNewField((prev) => {
            return {...prev, type: event.target.value as string} as FieldType
        })
    }
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="name"
                        setData={setMethod}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={method.name}
                    />,

                    // ...method.fields.map((item) => (
                    //     <CustomTextField
                    //         key={item.id}
                    //         name={item.label}
                    //         resource={RESOURCE}
                    //         label={item.label}
                    //         value={item.value}
                    //         type={item.type}
                    //         disabled
                    //     />
                    // )),
                ]}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        resource={RESOURCE}
                        value={newField.name}
                        onChange={(e) => setNewField({...newField, name: e.target.value})}
                        label={'نام اینپوت'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="label"
                        setData={setNewField}
                        resource={RESOURCE}
                        value={newField.label}
                        onChange={(e) => setNewField({...newField, label: e.target.value})}
                        defaultValue={newField.label}
                        label={'لیبل'}
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
                            value={newField.type ?? ''}
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
                <Grid item>
                    <Button variant="outlined" onClick={addField} size="large" sx={{py: 1.4}}>
                        افزودن فیلد
                    </Button>
                </Grid>
            </Grid>
            {method.fields?.length > 0 && (
                <FieldsTable data={method.fields} removeField={removeField} />
            )}
        </Stack>
    )
}
