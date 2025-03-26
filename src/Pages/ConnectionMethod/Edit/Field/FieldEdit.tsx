import {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../../Components/Table/EditPage'
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
import {CustomTextField} from '../../../../Components/Input/CustomTextField'
import {FieldType} from '../../Method'

export function FieldEdit() {
    const id = useParams().accountId
    const RESOURCE = `account/base-accounts/${id}/fields`
    const state = useLocation().state as {row: FieldType}
    const [field, setField] = useState(state.row)
    const [newChoice, setNewChoice] = useState({title: '', id: Date.now()})
    const handleChange = (event: SelectChangeEvent) => {
        setField((prev) => {
            return {...prev, type: event.target.value as string} as FieldType
        })
    }
    const inputType = [
        {label: 'متن', value: 'text'},
        {label: 'فیلد انتخابی', value: 'choice'},
    ]
    const handleSaveChoice = () => {
        setField((prev) => {
            const existingIndex = prev.choices.findIndex((item) => item.id === newChoice.id)
            if (existingIndex > -1) {
                // Edit existing choice
                const updatedChoices = [...prev.choices]
                updatedChoices[existingIndex] = {...newChoice}
                return {...prev, choices: updatedChoices}
            } else {
                // Add new choice
                return {...prev, choices: [...prev.choices, {...newChoice}]}
            }
        })
        setNewChoice({title: '', id: Date.now()})
    }
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش فیلد"
            formDetails={{
                title: field?.title,
                description: field?.description,
                type: field?.type,
                choices: field?.choices?.map((item) => {
                    return item.title
                }),
            }}
            initialData={{
                title: state.row?.title,
                description: state.row?.description,
                type: state.row?.type,
                choices: state?.row?.choices?.map((item) => {
                    return item.title
                }),
            }}
            redirect={`base-accounts/${id}`}
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
            {field.type === 'choice' && (
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
                            onChange={(e) => setNewChoice({...newChoice, title: e.target.value})}
                            label={'عنوان'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                        <Button
                            variant="outlined"
                            onClick={handleSaveChoice}
                            size="large"
                            sx={{py: 1.4}}
                        >
                            ذخیره
                        </Button>
                    </Grid>
                </Grid>
            )}

            {field.choices?.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                    {field?.choices?.map((item) => (
                        <Chip
                            label={item.title}
                            variant="outlined"
                            sx={{minWidth: '5%'}}
                            onClick={() => setNewChoice(item)}
                        />
                    ))}
                </Stack>
            )}
        </EditPage>
    )
}
