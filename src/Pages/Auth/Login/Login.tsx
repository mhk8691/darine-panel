import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {setUser} from '../../../redux/user_slice'
import {useState} from 'react'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
export type LoginData = {
    username: string
    password: string
}
export type LoginResponse = {
    refresh: string
    access: string
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    phone_number: string | null
    profile_image: string | null
    role: string
}
export function Login(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()

    const [data, setData] = useState<LoginData>({
        username: '',
        password: '',
    })
    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(setUtil({loading: true}))
        try {
            let response = await DataProvider.post<LoginResponse>('auth/login/', {
                data,
            })
            dispatch(
                setUser({
                    id: response.data.id,
                    login: true,
                    token: response.data.access,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    phone_number: response.data.phone_number,
                    email: response.data.email,
                    profile_image: response.data.profile_image,
                    role: response.data.role,
                }),
            )
            navigate('/dashboard')
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                }),
            )
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack  justifyContent={'center'} alignItems="center" height="100%">
            <Box alignItems="center" justifyContent="center" marginBottom="20px">
                <Typography variant="subtitle1" fontWeight={700} marginRight="10px">
                    پنل مدیریت
                </Typography>
            </Box>
            <Box
                bgcolor="background.main"
                sx={{
                    width: {
                        xs: '80%',
                        sm: '62%',
                        md: '50%',
                        lg: '38%',
                    },
                }}
                borderRadius={3}
                px={5}
                py={7}
            >
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2.5}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="body1">ورود به حساب کاربری</Typography>
                    <Box width={'100%'}>
                        <CustomTextField
                            name="username"
                            setData={setData}
                            label={'نام کاربری'}
                            defaultValue={data.username}
                        />
                    </Box>
                    <Box width={'100%'}>
                        <CustomTextField
                            name="password"
                            setData={setData}
                            label={'رمز عبور'}
                            defaultValue={data.password}
                        />
                    </Box>
                    <Box textAlign="center" width={'100%'}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{fontSize: '20px', width: '100%'}}
                            type="submit"
                        >
                            ورود
                        </Button>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        آیا حساب کاربری ندارید؟{' '}
                        <Box
                            component={Link}
                            to={'/register'}
                            color={'primary.main'}
                            sx={{ml: 0.5}}
                        >
                            ثبت نام
                        </Box>
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 700,
    },
    logButton: {
        background: '#2A303B',
        width: '100%',
        borderRadius: '0px',
        fontSize: '20px',
        lineHeight: '24px',
        padding: '16px 0px',
        fontWeight: 700,
        color: 'white',
        '&:hover': {background: '#2A303B'},
    },
    fieldTitle: {
        color: '#778191',
        fontWeight: 700,
        marginBottom: '10px',
    },
    garageImage: {
        width: '60px',
        height: '60px',
        marginRight: '13px',
    },
    iconImage: {
        width: '80px',
        height: '80px',
        marginRight: '10px',
    },
    icon: {
        color: 'white',
        fontSize: '18px',
    },
    background: {
        flexGrow: 4,
        height: 'calc(100vh - 1px)',
    },
}))
