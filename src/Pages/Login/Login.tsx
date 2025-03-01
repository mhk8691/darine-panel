import {Box, Button, Divider, Stack, TextField, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import logo from '../../Images/mainLogo.png'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {setUser} from '../../redux/user_slice'
import {useState} from 'react'
import { DataProvider } from '../../Core/DataProvider'

interface LoginData {
    username: string
    password: string
}

export function Login(props) {
    const [loginData, setLoginData] = useState<LoginData>({username: '', password: ''})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const t = props.t
    const classes = useStyles()

    // async function check() {
    //     let admin = JSON.parse(sessionStorage.getItem('admin'))
    //     if (admin && admin.id) {
    //         let data = await DataProvider.sendInformation('auth/login/admin', {
    //             data: {
    //                 username: admin.username,
    //                 password: admin.password,
    //                 garage_id: admin.garage_id,
    //             },
    //         })
    //         if (data && data.data && data.data.tokens) {
    //             let token = data.data.tokens.accessToken
    //             let id = data.data.user._id
    //             sessionStorage.setItem('token', token)
    //             localStorage.setItem('id', id)
    //             localStorage.setItem('lang', 'en')
    //             navigate('/')
    //         }
    //     } else if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    //         navigate('/')
    //     }
    // }

    // useEffect(() => {
    //     check()
    // }, [])

    function onChangeTextfields(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setLoginData((prev) => ({...prev, [event.target.name]: event.target.value}))
    }

    async function handleClick() {
        dispatch(setUtil({loading: true}))
        let data = await DataProvider.post('user/signin', {
            data: {
                username: loginData.username,
                password: loginData.password,
            },
        })
        // if (data && data.status === 200) {
        //     data = data.data
        //     try {
        //         let token = data.tokens.accessToken
        //         let id = data.user._id
        //         localStorage.setItem('token', token)

        //         // localStorage.setItem('id', id)
        //         // if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en')
        //         dispatch(setUser({login: true, token: token, id: id}))
        //         navigate('/')
        //     } catch (error) {
        //         console.log('error', error)
        //     }
        // }
        dispatch(setUtil({loading: false}))
    }
    function enterToLogin(event) {
        if (event.key === 'Enter') {
            handleClick()
        }
    }
    return (
        <Stack bgcolor="#F5F7FA" justifyContent={'center'} alignItems="center" height="100%">
            <Box alignItems="center" justifyContent="center" marginBottom="20px">
                <img className={classes.iconImage} src={logo} width="500" height="500" />
                <Typography variant="subtitle1" fontWeight={700} marginRight="10px">
                    پنل مدیریت
                </Typography>
            </Box>
            <Box
                bgcolor="#F5F7FA"
                border="1px solid #CAD0DB"
                marginBottom="60px"
                width="380px"
                boxShadow="0px 10px 20px -5px rgba(182, 191, 207, 0.3)"
                padding="40px"
            >
                <Box marginBottom="24px">
                    <Typography className={classes.fieldTitle}>نام کاربری</Typography>
                    <TextField
                        name="username"
                        onChange={onChangeTextfields}
                        fullWidth
                        onKeyUp={enterToLogin}
                        placeholder="Username"
                    />
                </Box>
                <Box marginBottom="40px">
                    <Typography className={classes.fieldTitle}>رمز عبور</Typography>
                    <TextField
                        name="password"
                        onChange={onChangeTextfields}
                        fullWidth
                        onKeyUp={enterToLogin}
                        type="password"
                        placeholder="Password"
                    />
                </Box>

                <Box textAlign="center">
                    <Button
                        variant="contained"
                        size="large"
                        sx={{fontSize: '20px', width: '100%'}}
                        onClick={handleClick}
                    >
                        ورود
                    </Button>
                </Box>
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
