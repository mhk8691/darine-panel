import React from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {FieldValues, useForm, UseFormGetValues} from 'react-hook-form'
import {DataProvider} from '../../Core/DataProvider'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {setUser} from '../../redux/user_slice'
import {Box, Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import APP_URL from '../../Core/APP_URL'
type AuthResponse = {
    data: {
        token: string
    }
}
interface Props {
    getValues: UseFormGetValues<FieldValues>
}
export default function SubmitCode({getValues}: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        dispatch(setUtil({loading: true}))
        const newData = {
            phone_number: getValues('phone_number'),
            otp: data.otp,
        }
        try {
            const response = await axios.post<AuthResponse>(
                `http://localhost:8000/api/auth/login/otp-verify/`,
                newData,
            )
            console.log(response?.data.data.token)
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
                <CustomTextField label={'کد تایید'} register={{...register('otp')}} name="otp" />
            </Box>

            <Box textAlign="center" width={'100%'} mt={3}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{fontSize: '20px', width: '100%'}}
                    onClick={handleSubmit(onSubmit)}
                >
                    تایید
                </Button>
            </Box>
        </>
    )
}
