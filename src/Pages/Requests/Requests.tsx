import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'
import {DataProvider} from '../../Core/DataProvider'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

export type RequestsType = {
    id: number
    phone_number: string
    telegram_id: string
    user_id: number
    text: string
    status: 'pending' | 'done'
    created_at: string
}
const RESOURCE = 'requests'

export function Requests({
    requests,
    setRequests,
}: {
    requests: RequestsType
    setRequests: React.Dispatch<React.SetStateAction<RequestsType>>
}) {
    const handleChangeProductType = (event: SelectChangeEvent) => {
        setRequests((prev) => {
            return {...prev, status: event.target.value as 'pending' | 'done'}
        })
    }
    return (
        <Stack width={'35%'}>
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
                        onChange={handleChangeProductType}
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
        </Stack>
    )
}
