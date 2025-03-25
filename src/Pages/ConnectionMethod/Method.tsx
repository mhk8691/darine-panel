import {
    Button,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material'
import {useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import FieldsTable from './FieldsTable'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {DataProvider} from '../../Core/DataProvider'
import {useParams} from 'react-router-dom'
import {BaseModal} from '../../Components/Modal/BaseModal'
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
}

export type MethodType = {
    id: number
    title: string
    fields: FieldType[]
    fields_count: string
    choices: {
        id: number
        title: string
    }[]
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
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const [newChoice, setNewChoice] = useState<{id: number; title: string}>(
        {} as {id: number; title: string},
    )
    const dispatch = useDispatch()
    const inputType = [
        {label: 'متن', value: 'text'},
        {label: 'شماره', value: 'number'},
        {label: 'ایمیل', value: 'email'},
        {label: 'رمز عبور', value: 'password'},
    ]
    const methodId = useParams().id
    const getMethod = async () => {
        try {
            const res = await DataProvider.get<MethodType>(`${RESOURCE}/${methodId}/`)
            setMethod(res.data)
        } catch (error: any) {
            console.log(error)
        }
        dispatch(setUtil({loading: false}))
    }
    const addField = async () => {
        if (!newField.title || !newField.description || !newField.type) {
            return
        }
        if (editMode) {
            try {
                let res = await DataProvider.post<FieldType>(`${RESOURCE}/${methodId}/add_field/`, {
                    data: newField,
                })
                dispatch(setUtil({open: true, message: res.message, severity: 'success'}))
                getMethod()
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        } else {
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
                        choices: newField.choices,
                    },
                ],
            }))
        }
        setNewField({
            title: '',
            description: '',
            type: '',
            choices: [] as {id: number; title: string}[],
        } as FieldType)
    }

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
        setOpen(false)
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
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={12}>
                    <Typography variant="body2" fontSize={16} fontWeight={700} sx={{mb: 1}}>
                        افزودن فیلد
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="title"
                        resource={RESOURCE}
                        value={newField.title}
                        onChange={(e) => setNewField({...newField, title: e.target.value})}
                        label={'نام اینپوت'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="description"
                        setData={setNewField}
                        resource={RESOURCE}
                        value={newField.description}
                        onChange={(e) => setNewField({...newField, description: e.target.value})}
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
                        {editMode ? 'ذخیره' : 'افزودن'}
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{mt: 2}} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" fontSize={16} fontWeight={700} sx={{mb: 1}}>
                        افزودن گزینه
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="choices"
                        resource={RESOURCE}
                        value={newChoice.title}
                        onChange={(e) => setNewChoice({title: e.target.value, id: Date.now()})}
                        label={'عنوان'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setNewField((prev) => ({
                                ...prev,
                                choices: [...(prev.choices || []), newChoice],
                            }))
                            setNewChoice({title: '', id: Date.now()})
                        }}
                        size="large"
                        sx={{py: 1.4}}
                    >
                        {editMode ? 'ذخیره' : 'افزودن'}
                    </Button>
                </Grid>
            </Grid>
            {newField?.choices?.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" mt={2} key={newField.id}>
                    {newField?.choices?.map((item) => (
                        <Chip label={item.title} variant="outlined" sx={{minWidth: '5%'}} />
                    ))}
                </Stack>
            )}
            {method.fields?.length > 0 && (
                <FieldsTable
                    hasDetail={false}
                    data={method.fields}
                    editMode={editMode}
                    setOpen={setOpen}
                    setDeleteId={setDeleteId}
                />
            )}
            <BaseModal open={open} setOpen={setOpen} title="توجه!" style={{maxWidth: 'sm'}}>
                <Typography mb="1rem" variant="body2" fontSize={'17px'}>
                    آیا از انجام این عمل مطمئن هستید؟
                </Typography>
                <Stack direction={'row'} spacing={2} mt={2.5}>
                    <Button
                        variant="contained"
                        onClick={() => removeField(deleteId || 0)}
                        size="large"
                    >
                        بله
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setOpen(false)}
                        size="large"
                    >
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
        </Stack>
    )
}
