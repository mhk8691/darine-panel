import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'
import {useAppSelector} from '../../redux/store'

import axios from 'axios'
import {CategoryCreate} from '../Categories/Create/CategoryCreate'
import {CategoryEdit} from '../Categories/Edit/CategoryEdit'
import {CategoriesList} from '../Categories/List/CategoriesList'
import DashboardLayout from '../Dashboard/DashboardLayout'
import {OrderEdit} from '../Orders/Edit/OrderEdit'
import {OrdersList} from '../Orders/List/OrdersList'
import {ProductCreate} from '../Products/Create/ProductCreate'
import {ProductEdit} from '../Products/Edit/ProductEdit'
import {ProductsList} from '../Products/List/ProductsList'
import Profile from '../Profile/Profile'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserEdit} from '../Users/Edit/UserEdit'
import {UsersList} from '../Users/List/UsersList'
import {UsersType} from '../Users/Users'
import { GoldCardCreate } from '../GoldCard/Create/GoldCardCreate'
import { GoldCardList } from '../GoldCard/List/GoldCardList'
import { GoldCardEdit } from '../GoldCard/Edit/GoldCardEdit'
import { SilverCardCreate } from '../SilverCard/Create/SilverCardCreate'
import { SilverCardList } from '../SilverCard/List/SilverCardList'
import { SilverCardEdit } from '../SilverCard/Edit/SilverCardEdit'
import { SilverOrdersList } from '../SilverOrders/List/SilverOrdersList'
import { SilverOrderEdit } from '../SilverOrders/Edit/SilverOrderEdit'
import { SilverProductCreate } from '../SilverProducts/Create/SilverProductCreate'
import { SilverProductEdit } from '../SilverProducts/Edit/SilverProductEdit'
import { SilverProductsList } from '../SilverProducts/List/SilverProductsList'
import { GiftCardsList } from '../GiftCard/List/GiftCardsList'
import { GiftCardEdit } from '../GiftCard/Edit/GiftCardEdit'

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
                }>(`https://api.darine.shop/accounts/profile/`, {
                   withCredentials:true
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
                        {/* product section */}
                        <Route
                            path="product/create"
                            element={<ProductCreate data={data} setData={setData} />}
                        />
                        <Route path="product" element={<ProductsList />} />
                        <Route path="product/:id" element={<ProductEdit />} />
                   
                          <Route
                            path="silver-product/create"
                            element={<SilverProductCreate data={data} setData={setData} />}
                        />
                        <Route path="silver-product" element={<SilverProductsList />} />
                        <Route path="silver-product/:id" element={<SilverProductEdit />} />
                        {/* categories section */}
                        <Route
                            path="category/create"
                            element={<CategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="category" element={<CategoriesList />} />
                        <Route path="category/:id" element={<CategoryEdit />} />
                         <Route path="gift-cards" element={<GiftCardsList />} />
                        <Route path="gift-cards/:id" element={<GiftCardEdit />} />
                        {/* orders section */}
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderEdit />} />

                           <Route path="silver-orders" element={<SilverOrdersList />} />
                        <Route path="silver-orders/:id" element={<SilverOrderEdit />} />
                    
                       
                        {/* requests section */}
                        {/* card section */}
                        <Route
                            path="gold-card/create"
                            element={<GoldCardCreate data={data} setData={setData} />}
                        />
                        <Route path="gold-card" element={<GoldCardList />} />
                        <Route path="gold-card/:id" element={<GoldCardEdit />} />


                          <Route
                            path="silver-card/create"
                            element={<SilverCardCreate data={data} setData={setData} />}
                        />
                        <Route path="silver-card" element={<SilverCardList />} />
                        <Route path="silver-card/:id" element={<SilverCardEdit />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
