import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom'
import {AppTheme} from './Theme'
import {ThemeProvider} from '@mui/material/styles'
import {CustomizedSnackbars} from './Components/Snackbar/Snackbar'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {QueryParamProvider} from 'use-query-params'
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6'
import {LoadingBackdrop} from './Components/Backdrop/Backdrop'
import {Home} from './Pages/Home/Home'
import {Login} from './Pages/Login/Login'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {RTL} from './RTL'

function App() {
    const RouteAdapter = ({children}) => {
        const navigate = useNavigate()
        const location = useLocation()

        const adaptedHistory = React.useMemo(
            () => ({
                replace(location) {
                    navigate(location, {replace: true, state: location.state})
                },
                push(location) {
                    navigate(location, {replace: false, state: location.state})
                },
            }),
            [navigate],
        )
        return children({history: adaptedHistory, location})
    }
    return (
        <RTL>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <Provider store={store}>
                            <CustomizedSnackbars />
                            <LoadingBackdrop />
                            <QueryParamProvider adapter={ReactRouter6Adapter}>
                                <Routes>
                                    <Route path="/*" element={<Home />} />
                                    <Route path="login" element={<Login />} />
                                </Routes>
                            </QueryParamProvider>
                        </Provider>
                    </ThemeProvider>
                </BrowserRouter>
            </LocalizationProvider>
        </RTL>
    )
}

export default App
