import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {UsersType} from '../Users'

const RECOURCE = 'user'

export function UserDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UsersType | null>({
        id: 1,
        firstName: 'ali',
        lastName: 'mmdi',
        username: 'ali',
        email: 'ali@gmail.com',
        phoneNumber: '09126320520',
    })
    const getUser = async () => {
        setLoading(true)
        let response = await DataProvider.get<UsersType>(`${RECOURCE}/${id}/`)
        if (response) {
            setUser(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Stack p={4} direction={'column'} spacing={2.5}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات کاربر
            </Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    آیدی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.id}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.firstName}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام خانوادگی:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.lastName}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    ایمیل:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.email}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    نام کاربری:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.username}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" sx={{fontWeight: '600'}}>
                    شماره تلفن:
                </Typography>
                <Typography variant="body1" sx={{fontWeight: '400', fontSize: '17px'}}>
                    {user?.phoneNumber}
                </Typography>
            </Stack>
        </Stack>
    )
}
