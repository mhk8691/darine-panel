import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import FieldsTable from '../FieldsTable'
import {MethodType} from '../Method'

const RECOURCE = 'account/base-accounts'

export function MethodDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [method, setMethod] = useState<MethodType | null>()
    const getMethod = async () => {
        setLoading(true)
        let response = await DataProvider.get<MethodType>(`${RECOURCE}/${id}/`)
        if (response) {
            setMethod(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getMethod()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات روش اتصال
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
                    {method?.id}
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
                    عنوان:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {method?.title}
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
                    تعداد فیلد:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                    {method?.fields_count}
                </Typography>
            </Stack>
            <FieldsTable data={method?.fields || []} hasDetail={true} />
        </Stack>
    )
}
