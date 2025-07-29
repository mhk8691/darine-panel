import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import logoImage from '../../../Images/logo.png'
import axios from 'axios'
import SubmitCode from '../SubmitCode'
import {formatTime} from '../Login/Login'

export type RegisterData = {
    // username: string
    // email: string
    // password: string
    phone_number: string
    first_name: string
    last_name: string
    profile_image?: any
}

export default function Register() {
    const [errors, setErrors] = useState({first_name: false, last_name: false, phone_number: false})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const [time, setTime] = useState(0)
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState<RegisterData>({
        first_name: '',
        phone_number: '',
        last_name: '',
    })
    const validateFields = (data: RegisterData) => {
        const newErrors = {
            first_name: !data.first_name.trim(),
            last_name: !data.last_name.trim(),
            phone_number: !data.phone_number.trim(),
        }
        setErrors(newErrors)

        return !Object.values(newErrors).includes(true)
    }
    useEffect(() => {
        if (time === 0) return

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [time])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateFields(data)) {
            return
        }

        dispatch(setUtil({loading: true}))
        try {
            const response = await axios.post(
                `http://api.ahmadshop1.com/api/auth/register/otp-request/`,
                data,
            )
            setIsSubmit(true)
            setTime(120)
            // dispatch(setUtil({open: true, message: response?.message, severity: 'success'}))
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
                    <Link to={'/'}>
                        <Box
                            component={'img'}
                            src={logoImage}
                            sx={{
                                width: '120px',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Link>
                    <Stack flexDirection={'row'} width={'100%'} justifyContent={'flex-start'}>
                        <Typography variant="body1">ثبت نام</Typography>
                    </Stack>
                    {isSubmit ? (
                        <SubmitCode phoneNumber={data.phone_number} resource="register">
                            {time > 0 ? (
                                <Typography variant="body2" sx={{fontSize: '13px', mb: 1.5}}>
                                    {formatTime(time)} مانده تا دریافت مجدد کد
                                </Typography>
                            ) : (
                                <Button
                                    variant="text"
                                    type="submit"
                                    disableRipple
                                    disableElevation
                                    onSubmit={handleSubmit}
                                    sx={{
                                        ':hover': {
                                            backgroundColor: 'transparent',
                                        },
                                        ':active': {
                                            backgroundColor: 'transparent',
                                        },
                                        ':focus': {
                                            backgroundColor: 'transparent',
                                        },
                                        fontSize: '14px',
                                        mb: 1.5,
                                    }}
                                >
                                    دریافت مجدد کد
                                </Button>
                            )}
                        </SubmitCode>
                    ) : (
                        <>
                            <Box width={'100%'}>
                                <CustomTextField
                                    name="first_name"
                                    setData={setData}
                                    label={'نام'}
                                    defaultValue={data.first_name}
                                />
                            </Box>
                            <Box width={'100%'}>
                                <CustomTextField
                                    name="last_name"
                                    setData={setData}
                                    label={'نام خانوادگی'}
                                    defaultValue={data.last_name}
                                />
                            </Box>
                            <Box width={'100%'}>
                                <CustomTextField
                                    name="phone_number"
                                    setData={setData}
                                    label={'شماره تلفن'}
                                    defaultValue={data.phone_number}
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
                                <Box
                                    component={Link}
                                    to={'/login'}
                                    color={'primary.main'}
                                    sx={{ml: 0.5}}
                                >
                                    ورود
                                </Box>
                            </Typography>
                        </>
                    )}
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
