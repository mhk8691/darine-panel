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
import { SilverProductCreate } from '../SilverProducts/Create/SilverProductCreate'
import { SilverProductEdit } from '../SilverProducts/Edit/SilverProductEdit'
import { SilverProductsList } from '../SilverProducts/List/SilverProductsList'
import { GiftCardsList } from '../GiftCard/List/GiftCardsList'
import { GiftCardEdit } from '../GiftCard/Edit/GiftCardEdit'
import { BannerCreate } from '../Banners/Create/BannerCreate'
import { BannersList } from '../Banners/List/BannersList'
import { BannerEdit } from '../Banners/Edit/BannerEdit'
import { BankCardCreate } from '../BankCard/Create/BankCardCreate'
import { BankCardList } from '../BankCard/List/BankCardList'
import { BankCardEdit } from '../BankCard/Edit/BankCardEdit'

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
        if (profile.role === 'customer') {
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

                        {/* ...........orders.......... */}
                        <Route path="orders" element={<OrdersList resource='orders' title='مدیریت سفارشات دارینه' />} />
                        <Route path="orders/:id" element={<OrderEdit resource='orders' />} />

                        <Route path="silver-orders" element={<OrdersList resource='silver-orders' title='مدیریت سفارشات نقرینه' />} />
                        <Route path="silver-orders/:id" element={<OrderEdit resource='silver-orders' />} />
                    

                        {/* ...........bank card.......... */}
                        <Route
                            path="gold-bank/create"
                            element={<BankCardCreate data={data} setData={setData} resource='gold-bank' />}
                        />
                        <Route path="gold-bank" element={<BankCardList resource='gold-bank' title='مدیریت کارت های بانکی دارینه'  />} />
                        <Route path="gold-bank/:id" element={<BankCardEdit resource='gold-bank' />} />


                         <Route
                            path="silver-bank/create"
                            element={<BankCardCreate data={data} setData={setData} resource='silver-bank' />}
                        />
                        <Route path="silver-bank" element={<BankCardList resource='silver-bank'  title='مدیریت کارت های بانکی نقرینه' />} />
                        <Route path="silver-bank/:id" element={<BankCardEdit resource='silver-bank' />} />

                        {/* ...........banners.......... */}
                        <Route
                            path="gold-banners/create"
                            element={<BannerCreate data={data} setData={setData} resource='gold-banners' />}
                        />
                        <Route path="gold-banners" element={<BannersList resource='gold-banners' title='مدیریت بنر های دارینه' />} />
                        <Route path="gold-banners/:id" element={<BannerEdit resource='gold-banners' />} />

                        <Route
                            path="silver-banners/create"
                            element={<BannerCreate data={data} setData={setData} resource='silver-banners' />}
                        />
                        <Route path="silver-banners" element={<BannersList resource='silver-banners' title='مدیریت بنر های نقرینه' />} />
                        <Route path="silver-banners/:id" element={<BannerEdit resource='silver-banners' />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
