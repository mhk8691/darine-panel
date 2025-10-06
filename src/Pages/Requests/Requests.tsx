import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {formatDate} from '../../Core/FormatDate'

export type RequestsType = {
    id: number
    phone_number: string
    telegram_id: string
    user_id: number
    user_full_name: string
    text: string
    status: 'pending' | 'done'
    created_at: string
}

export function Requests({
    requests,
    setRequests,
}: {
    requests: RequestsType
    setRequests: React.Dispatch<React.SetStateAction<RequestsType>>
}) {
    const handleChangerequestsType = (event: SelectChangeEvent) => {
        setRequests((prev) => {
            return {...prev, status: event.target.value as 'pending' | 'done'}
        })
    }
    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        key={requests.id}
                        name="id"
                        disabled={true}
                        label={'آیدی'}
                        defaultValue={requests.id}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        disabled={true}
                        key={requests.id}
                        name="telegram_id"
                        label={'أیدی تلگرام'}
                        defaultValue={requests.telegram_id}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        disabled={true}
                        key={requests.id}
                        name="text"
                        label={'متن'}
                        defaultValue={requests.text}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        disabled={true}
                        key={requests.id}
                        name="created_at"
                        label={'تاریخ درخواست'}
                        defaultValue={formatDate(requests.created_at)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    {requests && (
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
                                وضعیت سفارش
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={requests.status ?? ''}
                                label="وضعیت سفارش"
                                onChange={handleChangerequestsType}
                                sx={{
                                    '& .MuiAutocomplete-listbox': {
                                        fontSize: '15px',
                                    },
                                    '& .MuiAutocomplete-option': {
                                        py: '12px !important',
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'pending'}
                                >
                                    در انتظار
                                </MenuItem>

                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'done'}
                                >
                                    بررسی شده
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </Grid>
            </Grid>
        </Stack>
    )
}
