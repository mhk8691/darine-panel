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
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {DataProvider} from '../../Core/DataProvider'
import {useParams} from 'react-router-dom'
type InputType = {
    type: 'text' | 'number' | 'email' | 'password'
}
export type FieldType = {
    id: number
    title: string
    description: string
    type: string
    type_display: string
    choices: {
        id: number
        title: string
    }[]
    choices_ids: number[]
}

export type MethodType = {
    id: number
    title: string
    fields: FieldType[]
    fields_count: string
}

const RESOURCE = 'account/base-accounts'

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
    const dispatch = useDispatch()
    const inputType = [
        {label: 'متن', value: 'text'},
        {label: 'شماره', value: 'number'},
        {label: 'ایمیل', value: 'email'},
        {label: 'رمز عبور', value: 'password'},
    ]
    const methodId = useParams().id
    const addField = () => {
        if (!newField.title || !newField.description || !newField.type) {
            return
        }
        setMethod((prevMethod) => ({
            ...prevMethod,
            fields: [
                ...(prevMethod.fields || []),
                {
                    id: Date.now(),
                    description: newField?.description,
                    title: newField?.title,
                    type: newField?.type,
                    type_display: '1',
                    choices: [
                        {
                            id: Date.now(),
                            title: 'choice 1',
                        },
                    ],
                    choices_ids: [Date.now()],
                },
            ],
        }))
        setNewField({
            title: '',
            description: '',
            type: '',
            choices: [
                {
                    id: Date.now(),
                    title: 'choice 1',
                },
            ],
            choices_ids: [Date.now()],
        } as FieldType)
    }
    const getMethod = async ()=>{
        try {
            const res = await DataProvider.get<MethodType>(`${RESOURCE}/${methodId}/`)
            setMethod(res.data)
        } catch (error: any) {
            console.log(error)
        }
        dispatch(setUtil({loading: false}))
    }
    // حذف یک input بر اساس id
    const removeField = async (id: number) => {
        if (editMode) {
            try {
                dispatch(setUtil({loading: true}))
                const res = await DataProvider.delete(`${RESOURCE}/${methodId}/fields/${id}/`)
                getMethod()
                dispatch(setUtil({open: true, message: res.message, severity: 'success'}))

            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
            dispatch(setUtil({loading: false}))
        } else {
            setMethod((prevMethod) => ({
                ...prevMethod,
                fields: prevMethod.fields.filter((field) => field.id !== id),
            }))
        }
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
                        name="title"
                        setData={setMethod}
                        resource={RESOURCE}
                        label={'عنوان'}
                        defaultValue={method.title}
                    />,
                ]}
            />
            {!editMode && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                        <CustomTextField
                            key={newField.id}
                            name="title"
                            resource={RESOURCE}
                            value={newField.title}
                            onChange={(e) => setNewField({...newField, title: e.target.value})}
                            label={'نام اینپوت'}
                            // disabled={editMode && !newField.title ? true : false}
                            sx={{
                                '& .Mui-disabled': {
                                    color: '#3f3f3f !important',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                        <CustomTextField
                            key={newField.id}
                            name="description"
                            setData={setNewField}
                            resource={RESOURCE}
                            value={newField.description}
                            onChange={(e) =>
                                setNewField({...newField, description: e.target.value})
                            }
                            label={'توضیحات'}
                            // disabled={editMode && !newField.description ? true : false}
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
            )}
            {method.fields?.length > 0 && (
                <FieldsTable
                    hasDetail={false}
                    data={method.fields}
                    removeField={removeField}
                    editMode={editMode}
                />
            )}
        </Stack>
    )
}
