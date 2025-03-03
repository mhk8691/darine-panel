import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'
import {useAppSelector} from '../../redux/store'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserDetail} from '../Users/Detail/UserDetail'
import { UsersList } from '../Users/List/UsersList'
import { UserEdit } from '../Users/Edit/UserEdit'

export function Home(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})
    const isLogin = useAppSelector((state) => state.user.login)

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
        if (location.pathname === '/') {
            navigate('/dashboard')
        }
    }, [isLogin, navigate])

    return (
        <MainLayout>
            <Box
                flexGrow={1}
                mt="4.5rem"
                padding={!location.pathname.includes('dashboard') ? '30px' : 'unset'}
            >
                <Box
                    bgcolor={
                        !location.pathname.includes('dashboard') ? 'background.paper' : 'unset'
                    }
                    borderRadius={'12px'}
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
                            path="users/create"
                            element={<UserCreate data={data} setData={setData} />}
                        />
                        <Route path="users" element={<UsersList />} />
                        <Route path="users/:id" element={<UserEdit />} />
                        <Route path="users/detail/:id" element={<UserDetail />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
