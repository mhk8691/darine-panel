import React from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {FieldValues, useForm, UseFormGetValues} from 'react-hook-form'
import {DataProvider} from '../../Core/DataProvider'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {setUser} from '../../redux/user_slice'
import {Box, Button, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import APP_URL from '../../Core/APP_URL'
type AuthResponse = {
    data: {
        token: string
    }
}
interface Props {
    getValues?: UseFormGetValues<FieldValues>
    children: React.ReactNode
    phoneNumber?: string
    resource: string
}
export default function SubmitCode({getValues, children, phoneNumber, resource}: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        dispatch(setUtil({loading: true}))
        const newData = {
            phone_number: getValues ? getValues('phone_number') : phoneNumber,
            otp: data.otp,
        }
        try {
            const response = await axios.post<AuthResponse>(
                `https://api.ahmadshop1.com/api/auth/${resource}/otp-verify/`,
                newData,
            )
            dispatch(
                setUser({
                    token: response.data.data.token,
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
    const {register, handleSubmit} = useForm()
    return (
        <>
            <Box width={'100%'}>
            <Typography variant="body2" alignSelf={'flex-start'} sx={{my: 2, fontSize: '12px'}}>
                کد تایید برای شماره {getValues ? getValues('phone_number') : phoneNumber} ارسال شده
                است
            </Typography>
                <CustomTextField label={'کد تایید'} register={{...register('otp')}} name="otp" />
            </Box>
            <Box textAlign="center" width={'100%'} mt={3}>
                {children}
                <Button
                    variant="contained"
                    size="large"
                    sx={{fontSize: '16px', width: '100%'}}
                    onClick={handleSubmit(onSubmit)}
                >
                    تایید
                </Button>
            </Box>
        </>
    )
}
