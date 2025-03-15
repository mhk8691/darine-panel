import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'
import {useAppSelector} from '../../redux/store'
import {AccountCategoryCreate} from '../AccountCategory/Create/AccountCategoryCreate'
import {AccountCategoryDetail} from '../AccountCategory/Detail/AccountCategoryDetail'
import {AccountCategoryEdit} from '../AccountCategory/Edit/AccountCategoryEdit'
import {AccountCategoryList} from '../AccountCategory/List/AccountCategoryList'
import {CategoryCreate} from '../Categories/Create/CategoryCreate'
import {CategoryDetail} from '../Categories/Detail/CategoryDetail'
import {CategoryEdit} from '../Categories/Edit/CategoryEdit'
import {CategoriesList} from '../Categories/List/CategoriesList'
import DashboardLayout from '../Dashboard/DashboardLayout'
import {ProductCreate} from '../Products/Create/ProductCreate'
import {ProductDetail} from '../Products/Detail/ProductDetail'
import {ProductEdit} from '../Products/Edit/ProductEdit'
import {ProductsList} from '../Products/List/ProductsList'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserDetail} from '../Users/Detail/UserDetail'
import {UserEdit} from '../Users/Edit/UserEdit'
import {UsersList} from '../Users/List/UsersList'
import {AccountCreate} from '../Accounts/Create/AccountCreate'
import {AccountsList} from '../Accounts/List/AccountsList'
import {AccountEdit} from '../Accounts/Edit/AccountEdit'
import {AccountDetail} from '../Accounts/Detail/AccountDetail'
import {OrdersList} from '../Orders/List/OrdersList'
import {OrderEdit} from '../Orders/Edit/OrderEdit'
import {OrderDetail} from '../Orders/Detail/OrderDetail'
import Profile from '../Profile/Profile'
import { MethodCreate } from '../ConnectionMethod/Create/MethodCreate'
import { MethodsList } from '../ConnectionMethod/List/MethodsList'
import { MethodEdit } from '../ConnectionMethod/Edit/MethodEdit'

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
                            path="product-category/create"
                            element={<CategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="product-category" element={<CategoriesList />} />
                        <Route path="product-category/:id" element={<CategoryEdit />} />
                        <Route path="product-category/detail/:id" element={<CategoryDetail />} />
                        {/* account category section */}
                        <Route
                            path="account-category/create"
                            element={<AccountCategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="account-category" element={<AccountCategoryList />} />
                        <Route path="account-category/:id" element={<AccountCategoryEdit />} />
                        <Route
                            path="account-category/detail/:id"
                            element={<AccountCategoryDetail />}
                        />
                        {/* game account section */}
                        <Route
                            path="accounts/create"
                            element={<AccountCreate data={data} setData={setData} />}
                        />
                        <Route path="accounts" element={<AccountsList />} />
                        <Route path="accounts/:id" element={<AccountEdit />} />
                        <Route path="accounts/detail/:id" element={<AccountDetail />} />
                        {/* orders section */}
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderEdit />} />
                        <Route path="orders/detail/:id" element={<OrderDetail />} />
                        {/* connection methods  section */}
                        <Route
                            path="connection-methods/create"
                            element={<MethodCreate data={data} setData={setData} />}
                        />
                        <Route path="connection-methods" element={<MethodsList />} />
                        <Route path="connection-methods/:id" element={<MethodEdit />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
