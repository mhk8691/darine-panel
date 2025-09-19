import {Box, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ImageZoom from '../../../Components/ImageZoom/ImageZoom'
import {DataProvider} from '../../../Core/DataProvider'
import {RequestsType} from '../Requests'
import { formatDate } from '../../../Core/FormatDate'

const RECOURCE = 'requests'

export function RequestsDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState<RequestsType | null>(null)
    const getRequests = async () => {
        setLoading(true)
        let response = await DataProvider.get<RequestsType>(`${RECOURCE}/${id}/`)
        if (response) {
            setRequests(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات درخواست
            </Typography>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {requests?.id}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    شماره تلفن:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {requests?.phone_number}
                </Typography>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    آیدی تلگرام:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {requests?.telegram_id}
                </Typography>
            </Stack>
            <Stack direction={'column'} spacing={1.5}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                    متن:
                </Typography>
                <Stack bgcolor={'background.light'} borderRadius={2} p={2}>
                    <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                        {requests?.text}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={{
                    xs: 1,
                    sm: 0.5,
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    تاریخ ایجاد:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {formatDate(requests?.created_at)}
                </Typography>
            </Stack>
        </Stack>
    )
}
