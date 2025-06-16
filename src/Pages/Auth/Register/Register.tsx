import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
export type RegisterData = {
    username: string
    email: string
    password: string
    phone_number?: string
    first_name?: string
    last_name?: string
    profile_image?: any
}

export default function Register() {
    const [errors, setErrors] = useState({username: false, email: false, password: false})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const [data, setData] = useState<RegisterData>({
        username: '',
        password: '',
        email: '',
    })
    const validateFields = (data: RegisterData) => {
        const newErrors = {
            username: !data.username.trim(),
            email: !data.email.trim(),
            password: !data.password.trim(),
        }
        setErrors(newErrors)

        return !Object.values(newErrors).includes(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateFields(data)) {
            return
        }

        dispatch(setUtil({loading: true}))
        try {
            const response = await DataProvider.post('auth/register/', {data})
            dispatch(setUtil({open: true, message: response.message, severity: 'success'}))
            navigate('/login')
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack justifyContent="center" alignItems="center" height="100%">
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
                        sm: '60%',
                        md: '43%',
                        lg: '33%',
                    },
                    height: '66vh',
                }}
                borderRadius={3}
                px={5}
                py={5}
            >
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2.5}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="body1">ثبت نام</Typography>
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
                            name="email"
                            setData={setData}
                            label={'ایمیل'}
                            defaultValue={data.email}
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
                            sx={{fontSize: '16px', width: '100%'}}
                            type="submit"
                        >
                            ثبت نام
                        </Button>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        آیا از قبل ثبت نام کرده اید؟
                        <Box component={Link} to={'/login'} color={'primary.main'} sx={{ml: 0.5}}>
                            ورود
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
