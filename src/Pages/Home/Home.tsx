import React, {useEffect, useState} from 'react'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import {AppDrawer} from '../../Components/Drawer/AppDrawer'
import Box from '@mui/material/Box'
import {useSelector} from 'react-redux'
import {ServiceList} from '../Services/List/ServiceList'
import {ServiceEdit} from '../Services/Edit/ServiceEdit'
import {ServiceCreate} from '../Services/Create/ServiceCreate'

export function Home(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})

    // const user = useSelector((state) => state.user)
    // async function verify() {
    //     let data = await DataProvider.getOne('user/verify')
    //     if (!data || data.status != 200) {
    //         sessionStorage.removeItem('token')
    //         localStorage.removeItem('token')
    //         navigate('login')
    //     } else {
    //         data = data.data
    //         if (data.roles)
    //             sessionStorage.setItem('roles', JSON.stringify(data.roles.map((item) => item.code)))
    //         if (data.feature_list)
    //             sessionStorage.setItem(
    //                 'feature_list',
    //                 JSON.stringify(data.feature_list.map((item) => item.title)),
    //             )
    //         if (location.pathname == '/') navigate('order')
    //     }
    // }
    // const roles = JSON.parse(sessionStorage.getItem('roles'))

    // useEffect(() => {
    //     if (!localStorage.getItem('token') || (user && !user.login)) {
    //         navigate('/login')
    //     } else verify()
    // }, [user.login])
    return (
        <Box display="flex" height="100%">
            <AppDrawer />
            <Box
                flexGrow={1}
                height={'100%'}
                padding={!location.pathname.includes('dashboard') ? '30px' : 'unset'}
            >
                <Box
                    bgcolor={!location.pathname.includes('dashboard') ? 'white' : 'unset'}
                    borderRadius={'8px'}
                    style={{
                        boxShadow: !location.pathname.includes('dashboard')
                            ? `0px 0px 5.3px rgba(0, 0, 0, 0.04),
                                0px 0px 17.9px rgba(0, 0, 0, 0.06),
                                0px 0px 80px rgba(0, 0, 0, 0.1)`
                            : 'unset',
                    }}
                >
                    <Routes>
                        <Route
                            path="services/create"
                            element={<ServiceCreate data={data} setData={setData} />}
                        />
                        <Route path="services" element={<ServiceList />} />
                        <Route path="services/:id" element={<ServiceEdit />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
