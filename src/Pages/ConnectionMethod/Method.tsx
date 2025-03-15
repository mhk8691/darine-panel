import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import {useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
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
    editMode,
}: {
    method: MethodType
    setMethod: React.Dispatch<React.SetStateAction<MethodType>>
    editMode: boolean
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
    const editField = (id: number) => {
        setNewField(method.fields.find((field) => field.id === id) as FieldType)
    }
    const saveChange = () => {
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: prevMethod.fields.map((field) => {
                console.log(prevMethod)
                if (field.id === newField.id) {
                    return newField as FieldType
                }
                return field
            }),
        }))
        setNewField({} as FieldType)
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
                ]}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={newField.name}
                        name="name"
                        resource={RESOURCE}
                        value={newField.name}
                        onChange={(e) => setNewField({...newField, name: e.target.value})}
                        label={'نام اینپوت'}
                        disabled={editMode && !newField.name ? true : false}
                        sx={{
                            '& .Mui-disabled': {
                                color: '#3f3f3f !important',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={newField.label}
                        name="label"
                        setData={setNewField}
                        resource={RESOURCE}
                        value={newField.label}
                        onChange={(e) => setNewField({...newField, label: e.target.value})}
                        label={'لیبل'}
                        disabled={editMode && !newField.label ? true : false}
                        sx={{
                            '& .Mui-disabled': {
                                color: '#3f3f3f !important',
                            },
                        }}
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
                        disabled={editMode && !newField.type ? true : false}
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
                    <Button
                        variant="outlined"
                        onClick={editMode ? saveChange : addField}
                        size="large"
                        sx={{py: 1.4}}
                    >
                        {editMode ? 'ذخیره' : 'افزودن'}
                    </Button>
                </Grid>
            </Grid>
            {method.fields?.length > 0 && (
                <FieldsTable
                    data={method.fields}
                    removeField={removeField}
                    editField={editField}
                    editMode={editMode}
                />
            )}
        </Stack>
    )
}
