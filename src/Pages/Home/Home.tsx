import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'
import {useAppSelector} from '../../redux/store'

import axios from 'axios'
import {BannerCreate} from '../Banners/Create/BannerCreate'
import {BannerDetail} from '../Banners/Detail/BannerDetail'
import {BannerEdit} from '../Banners/Edit/BannerEdit'
import {BannersList} from '../Banners/List/BannersList'
import {CategoryCreate} from '../Categories/Create/CategoryCreate'
import {CategoryDetail} from '../Categories/Detail/CategoryDetail'
import {CategoryEdit} from '../Categories/Edit/CategoryEdit'
import {CategoriesList} from '../Categories/List/CategoriesList'
import {CommentDetail} from '../Comments/Detail/CommentDetail'
import {CommentEdit} from '../Comments/Edit/CommentEdit'
import {CommentsList} from '../Comments/List/CommentsList'
import {MethodCreate} from '../ConnectionMethod/Create/MethodCreate'
import {MethodDetail} from '../ConnectionMethod/Detail/MethodDetail'
import {FieldEdit} from '../ConnectionMethod/Edit/Field/FieldEdit'
import {MethodEdit} from '../ConnectionMethod/Edit/MethodEdit'
import {MethodsList} from '../ConnectionMethod/List/MethodsList'
import DashboardLayout from '../Dashboard/DashboardLayout'
import {OrderDetail} from '../Orders/Detail/OrderDetail'
import {OrderEdit} from '../Orders/Edit/OrderEdit'
import {OrdersList} from '../Orders/List/OrdersList'
import {ProductCreate} from '../Products/Create/ProductCreate'
import {ProductDetail} from '../Products/Detail/ProductDetail'
import {OptionsEdit} from '../Products/Edit/Options/OptionsEdit'
import {ProductEdit} from '../Products/Edit/ProductEdit'
import {PropertiesEdit} from '../Products/Edit/Properties/PropertiesEdit'
import {ProductsList} from '../Products/List/ProductsList'
import Profile from '../Profile/Profile'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserDetail} from '../Users/Detail/UserDetail'
import {UserEdit} from '../Users/Edit/UserEdit'
import {UsersList} from '../Users/List/UsersList'
import {UsersType} from '../Users/Users'
import { RequestsList } from '../Requests/List/RequestsList'
import { RequestsEdit } from '../Requests/Edit/RequestsEdit'
import { RequestsDetail } from '../Requests/Detail/RequestsDetail'

export function Home(props) {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})
    const isLogin = useAppSelector((state) => state.user)
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get<{
                    data: UsersType
                }>(`https://api.ahmadshop1.com/api/auth/profile/`, {
                    headers: {
                        Authorization: `Token ${isLogin}`,
                    },
                })
                setProfile(response.data.data)
            } catch (error: any) {
                console.log(error)
            }
        }
        getProfile()
    }, [])
    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
        if (profile.role === 'user') {
            navigate('/login')
        }
        if (location.pathname === '/') {
            navigate('/dashboard')
        }
    }, [isLogin, navigate, profile])

    return (
        <MainLayout>
            <Box
                flexGrow={1}
                mt="4.5rem"
                padding={
                    !location.pathname.includes('dashboard')
                        ? {
                              xs: '15px',
                              sm: '30px',
                          }
                        : 'unset'
                }
            >
                <Box
                    bgcolor={!location.pathname.includes('dashboard') ? 'background.main' : 'unset'}
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
                        <Route path="dashboard" element={<DashboardLayout />} />
                        <Route path="profile" element={<Profile />} />
                        {/* users section */}
                        <Route
                            path="users/create"
                            element={<UserCreate data={data} setData={setData} />}
                        />
                        <Route path="users" element={<UsersList />} />
                        <Route path="users/:id" element={<UserEdit />} />
                        <Route path="users/detail/:id" element={<UserDetail />} />
                        {/* product section */}
                        <Route
                            path="product/create"
                            element={<ProductCreate data={data} setData={setData} />}
                        />
                        <Route path="product" element={<ProductsList />} />
                        <Route path="product/:id" element={<ProductEdit />} />
                        <Route path="product/detail/:id" element={<ProductDetail />} />
                        <Route
                            path="product/:productId/properties/:id"
                            element={<PropertiesEdit />}
                        />
                        <Route path="product/:productId/options/:id" element={<OptionsEdit />} />
                        {/* categories section */}
                        <Route
                            path="category/create"
                            element={<CategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="category" element={<CategoriesList />} />
                        <Route path="category/:id" element={<CategoryEdit />} />
                        <Route path="category/detail/:id" element={<CategoryDetail />} />

                        {/* orders section */}
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderEdit />} />
                        <Route path="orders/detail/:id" element={<OrderDetail />} />
                        {/* connection methods  section */}
                        <Route
                            path="base-accounts/create"
                            element={<MethodCreate data={data} setData={setData} />}
                        />
                        <Route path="base-accounts" element={<MethodsList />} />
                        <Route path="base-accounts/:id" element={<MethodEdit />} />
                        <Route path="base-accounts/detail/:id" element={<MethodDetail />} />
                        <Route path="base-accounts/:accountId/field/:id" element={<FieldEdit />} />
                        {/* banners section */}
                        <Route
                            path="banners/create"
                            element={<BannerCreate data={data} setData={setData} />}
                        />
                        <Route path="banners" element={<BannersList />} />
                        <Route path="banners/:id" element={<BannerEdit />} />
                        <Route path="banners/detail/:id" element={<BannerDetail />} />
                        {/* comment section */}

                        <Route path="comments" element={<CommentsList />} />
                        <Route path="comments/:id" element={<CommentEdit />} />
                        <Route path="comments/detail/:id" element={<CommentDetail />} />
                        {/* requests section */}
                        <Route path="requests" element={<RequestsList />} />
                        <Route path="requests/:id" element={<RequestsEdit />} />
                        <Route path="requests/detail/:id" element={<RequestsDetail />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
