// import {Box, Button, Stack, TextField, Typography} from '@mui/material'
// import {makeStyles} from '@mui/styles'
// import {useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {Link, useNavigate} from 'react-router-dom'
// import {DataProvider} from '../../../Core/DataProvider'
// import {setUtil} from '../../../redux/UtilSlice'
// import {RegisterData} from '../../../types'
// import {useForm} from 'react-hook-form'

// export default function Register() {
//     const [errors, setErrors] = useState({username: false, email: false, password: false})
//     const {register, handleSubmit} = useForm<RegisterData>()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const classes = useStyles()

//     const validateFields = (data: RegisterData) => {
//         const newErrors = {
//             username: !data.username.trim(),
//             email: !data.email.trim(),
//             password: !data.password.trim(),
//         }
//         setErrors(newErrors)

//         return !Object.values(newErrors).includes(true)
//     }

//     const onSubmit = async (data: RegisterData) => {
//         if (!validateFields(data)) {
//             return
//         }

//         dispatch(setUtil({loading: true}))
//         try {
//             const response = await DataProvider.post('auth/register/', {data})
//             dispatch(setUtil({open: true, message: response.message, severity: 'success'}))
//             navigate('/login')
//         } catch (error: any) {
//             dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
//         } finally {
//             dispatch(setUtil({loading: false}))
//         }
//     }

//     return (
//         <Stack bgcolor="#F5F7FA" justifyContent="center" alignItems="center" height="100%">
//             <Box alignItems="center" justifyContent="center" marginBottom="20px">
//                 <Typography variant="subtitle1" fontWeight={700} marginRight="10px">
//                     پنل مدیریت
//                 </Typography>
//             </Box>
//             <Box
//                 bgcolor="#F5F7FA"
//                 border="1px solid #CAD0DB"
//                 width="380px"
//                 boxShadow="0px 10px 20px -5px rgba(182, 191, 207, 0.3)"
//                 padding="40px"
//             >
//                 <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//                     <Box sx={{display: 'grid', gridTemplateColumns: '1fr ', columnGap: '20px'}}>
//                         <Box marginBottom="20px">
//                             <Typography
//                                 className={classes.fieldTitle}
//                                 sx={{fontSize: '15px', mb: 0.5}}
//                             >
//                                 نام کاربری
//                             </Typography>
//                             <TextField
//                                 {...register('username')}
//                                 fullWidth
//                                 error={errors.username}
//                                 placeholder="نام کاربری"
//                             />
//                         </Box>
//                         <Box marginBottom="20px">
//                             <Typography
//                                 className={classes.fieldTitle}
//                                 sx={{fontSize: '15px', mb: 0.5}}
//                             >
//                                 ایمیل
//                             </Typography>
//                             <TextField
//                                 {...register('email')}
//                                 fullWidth
//                                 error={errors.email}
//                                 placeholder="ایمیل"
//                             />
//                         </Box>
//                         <Box marginBottom="20px">
//                             <Typography
//                                 className={classes.fieldTitle}
//                                 sx={{fontSize: '15px', mb: 0.5}}
//                             >
//                                 رمز عبور
//                             </Typography>
//                             <TextField
//                                 {...register('password')}
//                                 fullWidth
//                                 type="password"
//                                 error={errors.password}
//                                 placeholder="رمز عبور"
//                             />
//                         </Box>
//                     </Box>
//                     <Box textAlign="center">
//                         <Button
//                             variant="contained"
//                             size="large"
//                             sx={{fontSize: '20px', width: '100%'}}
//                             type="submit"
//                         >
//                             ثبت نام
//                         </Button>
//                     </Box>
//                 </Box>
//                 <Link to="/login">
//                     <Typography variant="body2" sx={{textAlign: 'center', mt: 2, fontSize: '14px'}}>
//                         ورود
//                     </Typography>
//                 </Link>
//             </Box>
//         </Stack>
//     )
// }

// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontWeight: 700,
//     },
//     logButton: {
//         background: '#2A303B',
//         width: '100%',
//         borderRadius: '0px',
//         fontSize: '20px',
//         lineHeight: '24px',
//         padding: '16px 0px',
//         fontWeight: 700,
//         color: 'white',
//         '&:hover': {background: '#2A303B'},
//     },
//     fieldTitle: {
//         color: '#778191',
//         fontWeight: 700,
//         marginBottom: '10px',
//     },
//     garageImage: {
//         width: '60px',
//         height: '60px',
//         marginRight: '13px',
//     },
//     iconImage: {
//         width: '80px',
//         height: '80px',
//         marginRight: '10px',
//     },
//     icon: {
//         color: 'white',
//         fontSize: '18px',
//     },
//     background: {
//         flexGrow: 4,
//         height: 'calc(100vh - 1px)',
//     },
// }))
import React from 'react'

export default function Register() {
  return (
    <div>Register</div>
  )
}
