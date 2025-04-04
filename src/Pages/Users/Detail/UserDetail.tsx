import {Box, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {UsersType} from '../Users'

const RECOURCE = 'users'

export function UserDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UsersType | null>({} as UsersType)
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
        <Stack p={4} direction={'column'}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات کاربر
            </Typography>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={2.5}
            >
                <Stack spacing={2.5}>
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
                            {user?.id}
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
                            نام:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {user?.first_name}
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
                            نام خانوادگی:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {user?.last_name}
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
                            {user?.phone_number}
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
                            نقش کاربر:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {user?.role}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={'column'} spacing={1} pr={10}>
                    <Box
                        component={'img'}
                        sx={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                        src={typeof user?.profile_picture === 'string' ? user?.profile_picture : ''}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}
