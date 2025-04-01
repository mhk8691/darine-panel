import {Box, Stack, Typography} from '@mui/material'
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
        first_name: 'ali',
        last_name: 'mmdi',
        phone_number: '09126320520',
        role: 'admin',
        profile_picture:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
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
            <Stack direction={'column'} spacing={1}>
                <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                    تصویر پروفایل:
                </Typography>
                <Box
                    component={'img'}
                    sx={{
                        width: '75px',
                        height: '75px',
                        borderRadius: 2,
                        objectFit: 'cover',
                    }}
                    src={typeof user?.profile_picture === 'string' ? user?.profile_picture : ''}
                    borderRadius={2}
                />
            </Stack>
        </Stack>
    )
}
