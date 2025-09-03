import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { FieldValues, useForm, UseFormGetValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { setUtil } from '../../redux/UtilSlice'
import { setUser } from '../../redux/user_slice'
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
export default function SubmitCode({ getValues, children, phoneNumber, resource }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        dispatch(setUtil({ loading: true }))
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
            dispatch(setUtil({ loading: false }))
        }
    }
    const { register, handleSubmit } = useForm()
    return (
        <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} width={'100%'}>
            <Box width={'100%'}>
                <Typography variant="body2" alignSelf={'flex-start'} sx={{ my: 2, fontSize: '12px' }}>
                    کد تایید برای شماره {getValues ? getValues('phone_number') : phoneNumber} ارسال
                    شده است
                </Typography>
                <CustomTextField label={'کد تایید'} register={{ ...register('otp') }} name="otp" />
            </Box>
            <Box textAlign="center" width={'100%'} mt={3} >
                {children}
                <Button
                    variant="contained"
                    size="large"
                    sx={{ fontSize: '16px', width: '100%' }}
                    type='submit'
                >
                    تایید
                </Button>
            </Box>
        </Stack>
    )
}
