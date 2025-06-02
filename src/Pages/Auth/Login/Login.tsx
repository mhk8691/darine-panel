import {Box, Button, Stack, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {setUtil} from '../../../redux/UtilSlice'

import axios from 'axios'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import SubmitCode from '../SubmitCode'
export type LoginData = {
    username: string
    password: string
}

export function Login(props) {
    const [isSubmit, setIsSubmit] = useState(false)
    const {register, handleSubmit, getValues} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()

    async function onSubmit(data) {
        dispatch(setUtil({loading: true}))
        try {
            await axios.post(`http://localhost:8000/api/auth/login/otp-request/`, data)
            setIsSubmit(true)
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
        <Stack justifyContent={'center'} alignItems="center" height="100%">
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
                py={7}
            >
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2.5}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="body1" sx={{marginBottom: '1rem !important'}}>
                        ورود به حساب کاربری
                    </Typography>
                    {isSubmit ? (
                        <SubmitCode getValues={getValues} />
                    ) : (
                        <>
                            <Box width={'100%'}>
                                <CustomTextField
                                    label={'شماره تلفن'}
                                    register={{...register('phone_number')}}
                                    name="phone_number"
                                />
                            </Box>

                            <Box textAlign="center" width={'100%'} mt={3}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{fontSize: '18px', width: '100%'}}
                                    type="submit"
                                >
                                    ورود
                                </Button>
                            </Box>
                        </>
                    )}

                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '14px',
                            marginTop: '1.5rem !important',
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
