import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'
import {useAppSelector} from '../../redux/store'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserDetail} from '../Users/Detail/UserDetail'
import { UsersList } from '../Users/List/UsersList'
import { UserEdit } from '../Users/Edit/UserEdit'
import { ProductCreate } from '../Products/Create/ProductCreate'
import { ProductsList } from '../Products/List/ProductsList'
import { ProductEdit } from '../Products/Edit/ProductEdit'
import { ProductDetail } from '../Products/Detail/ProductDetail'
import { CategoryCreate } from '../Categories/Create/CategoryCreate'
import { CategoriesList } from '../Categories/List/CategoriesList'
import { CategoryEdit } from '../Categories/Edit/CategoryEdit'
import { CategoryDetail } from '../Categories/Detail/CategoryDetail'
import DashboardLayout from '../Dashboard/DashboardLayout'

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
                            path="dashboard"
                            element={<DashboardLayout  />}
                        />
                        {/* users section */}
                        <Route
                            path="users/create"
                            element={<UserCreate data={data} setData={setData} />}
                        />
                        <Route path="users" element={<UsersList />} />
                        <Route path="users/:id" element={<UserEdit />} />
                        <Route path="users/detail/:id" element={<UserDetail />} />
                        {/* procuts section */}
                        <Route
                            path="products/create"
                            element={<ProductCreate data={data} setData={setData} />}
                        />
                        <Route path="products" element={<ProductsList />} />
                        <Route path="products/:id" element={<ProductEdit />} />
                        <Route path="products/detail/:id" element={<ProductDetail />} />
                        {/* categories section */}
                        <Route
                            path="poruduct-category/create"
                            element={<CategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="poruduct-category" element={<CategoriesList />} />
                        <Route path="poruduct-category/:id" element={<CategoryEdit />} />
                        <Route path="poruduct-category/detail/:id" element={<CategoryDetail />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
