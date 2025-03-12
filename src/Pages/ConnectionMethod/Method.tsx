import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {useState} from 'react'
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
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: [
                ...prevMethod.fields,
                {
                    id: Date.now(),
                    label: newField?.label,
                    name: newField?.name,
                    type: newField?.type,
                    value: newField.type === 'number' ? 0 : '',
                },
            ],
        }))
    }

    // حذف یک input بر اساس id
    const removeField = (id: number) => {
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: prevMethod.fields.filter((field) => field.id !== id),
        }))
    }
    const handleChange = (event: SelectChangeEvent) => {
        setNewField((prev) => {
            return {...prev, type: event.target.value as string || 'text'}
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
                    <CustomTextField
                        name="input_name"
                        setData={setMethod}
                        resource={RESOURCE}
                        defaultValue={newField.name}
                        label={'نام اینپوت'}
                    />,
                    <CustomTextField
                        name="name"
                        setData={setMethod}
                        resource={RESOURCE}
                        defaultValue={newField.label}
                        label={'لیبل'}
                    />,
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newField.type}
                            label="تایپ اینپوت"
                            onChange={handleChange}
                        >
                            {inputType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>,

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
        </Stack>
    )
}
