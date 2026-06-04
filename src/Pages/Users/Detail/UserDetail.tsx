import {Box, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import userImage from '../../../Images/user.png'
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
                direction={{
                    xs: 'column-reverse',
                    sm: 'row',
                }}
                alignItems={'center'}
                justifyContent={{
                    xs: 'center',
                    sm: 'space-between',
                }}
                mt={2.5}
                gap={2}
            >
                <Stack spacing={2.5} alignSelf={'flex-start'}>
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
                            {user?.mobile}
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
                <Stack
                    direction={'column'}
                    spacing={1}
                    pr={{
                        xs: 0,
                        sm: 10,
                    }}
                >
                    <Box
                        component={'img'}
                        sx={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                        src={
                            typeof user?.profile_picture === 'string'
                                ? user?.profile_picture
                                : userImage
                        }
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}
