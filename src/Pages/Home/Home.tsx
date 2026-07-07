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
import { GiftCardsList } from '../GiftCard/List/GiftCardsList'
import { GiftCardEdit } from '../GiftCard/Edit/GiftCardEdit'
import { BannerCreate } from '../Banners/Create/BannerCreate'
import { BannersList } from '../Banners/List/BannersList'
import { BannerEdit } from '../Banners/Edit/BannerEdit'
import { BankCardCreate } from '../BankCard/Create/BankCardCreate'
import { BankCardList } from '../BankCard/List/BankCardList'
import { BankCardEdit } from '../BankCard/Edit/BankCardEdit'
import { PartnersList } from '../partners/List/PartnersList'
import { DepositList } from '../Deposit/List/DepositList'
import { DepositEdit } from '../Deposit/Edit/DepositEdit'
import { WithdrawList } from '../Withdraw/List/WithdrawList'
import { WithdrawEdit } from '../Withdraw/Edit/WithdrawEdit'
import { LogsList } from '../Logs/List/LogsList'
import LivePrice from '../LivePrice/LivePrice'
import { OffsetCreate } from '../Offset/Create/OffsetCreate'
import { OffsetList } from '../Offset/List/OffsetList'
import { OffsetEdit } from '../Offset/Edit/OffsetEdit'
import { AnnouncementCreate } from '../Announcement/Create/AnnouncementCreate'
import { AnnouncementList } from '../Announcement/List/AnnouncementList'
import { AnnouncementEdit } from '../Announcement/Edit/AnnouncementEdit'
import { BalanceCreate } from '../Users/GoldAdjustments/Create/BalanceCreate'
import { BalanceList } from '../Users/GoldAdjustments/List/BalanceList'
import { BalanceEdit } from '../Users/GoldAdjustments/Edit/BalanceEdit'
import { SilverBalanceList } from '../Users/SilverAdjustments/List/SilverBalanceList'
import { SilverBalanceCreate } from '../Users/SilverAdjustments/Create/SilverBalanceCreate'
import { SilverBalanceEdit } from '../Users/SilverAdjustments/Edit/SilverBalanceEdit'
import { BalanceWithdrawalsList } from '../Users/BalanceWithdrawals/List/BalanceWithdrawalsList'
import { BalanceWithdrawalsCreate } from '../Users/BalanceWithdrawals/Create/BalanceWithdrawalsCreate'
import { BalanceWithdrawalsEdit } from '../Users/BalanceWithdrawals/Edit/BalanceWithdrawalsEdit'

export function Home(props) {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})
    const [authStatus, setAuthStatus] = useState("loading");
 useEffect(() => {
    const getProfile = async () => {
        try {
            const response = await axios.get(
                `https://api.darine.shop/accounts/profile/`,
                { withCredentials: true }
            );

            setProfile(response.data.data);
            setAuthStatus("auth");
        } catch (error) {
            setAuthStatus("unauth");
        }
    };

    getProfile();
}, []);
    useEffect(() => {
       if (!profile){
        navigate('/login')
       }
        if (profile.role === 'customer') {
            navigate('/login')
        }
        if (location.pathname === '/') {
            navigate('/dashboard')
        }
    }, [ navigate, profile])
if (authStatus === "loading") {
    return null; // یا splash screen
}

if (authStatus === "unauth") {
    navigate("/login");
    return null;
}
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
                        <Route
  path="/profile"
  element={
      <Profile />
  }
/>
                        {/* ...........users.......... */}
                        <Route
                            path="users/create"
                            element={<UserCreate data={data} setData={setData} />}
                        />
                        <Route path="users" element={<UsersList />} />
                        <Route path="users/:id" element={<UserEdit />} />

                        {/* ...........balance.......... */}
                     
                        <Route path="users/:userId/balance" element={<BalanceList />} />
                        <Route
                            path="users/:userId/balance/create"
                            element={<BalanceCreate data={data} setData={setData} />}
                        />
                        <Route path="users/:userId/balance/:id" element={<BalanceEdit />} />
                           {/* ...........silver balance.......... */}
                     
                        <Route path="users/:userId/silver-balance" element={<SilverBalanceList />} />
                        <Route
                            path="users/:userId/silver-balance/create"
                            element={<SilverBalanceCreate data={data} setData={setData} />}
                        />
                        <Route path="users/:userId/silver-balance/:id" element={<SilverBalanceEdit />} />
                                {/* ...........gold withdrawals.......... */}
                     
                        <Route path="users/:userId/gold-withdrawals" element={<BalanceWithdrawalsList type='gold' title='برداشت دارینه' resource={'gold-balance-withdrawals'} />} />
                        <Route
                            path="users/:userId/gold-withdrawals/create"
                            element={<BalanceWithdrawalsCreate data={data} type='gold'  setData={setData} resource='gold-balance-withdrawals' title='برداشت دارینه' />}
                        />
                        <Route path="users/:userId/gold-withdrawals/:id" element={<BalanceWithdrawalsEdit type='gold'  resource='gold-balance-withdrawals' title='برداشت دارینه' />} />
                                      {/* ...........silver withdrawals.......... */}
                     
                        <Route path="users/:userId/silver-withdrawals" element={<BalanceWithdrawalsList type='silver' title='برداشت نقرینه' resource={'silver-balance-withdrawals'} />} />
                        <Route
                            path="users/:userId/silver-withdrawals/create"
                            element={<BalanceWithdrawalsCreate data={data} type='silver' setData={setData} resource='silver-balance-withdrawals' title='برداشت نقرینه' />}
                        />
                        <Route path="users/:userId/silver-withdrawals/:id" element={<BalanceWithdrawalsEdit type='silver' resource='silver-balance-withdrawals' title='برداشت نقرینه' />} />
                        {/* ...........products.......... */}
                        <Route
                            path="products/create"
                            element={<ProductCreate data={data} setData={setData} resource='products' key={'products'} />}
                        />
                        <Route path="products" element={<ProductsList resource='products' title='مدیریت محصولات دارینه' key={'products'} />} />
                        <Route path="products/:id" element={<ProductEdit resource='products' key={'products'} />} />
                   
                          <Route
                            path="silver-products/create"
                            element={<ProductCreate data={data} setData={setData} resource='silver-products' key={'silver-products'} />}
                        />
                        <Route path="silver-products" element={<ProductsList resource='silver-products' title='مدیریت محصولات نقرینه' key={'silver-products'} />} />
                        <Route path="silver-products/:id" element={<ProductEdit resource='silver-products' key={'silver-products'} />} />
                        {/* ...........categories.......... */}
                        <Route
                            path="category/create"
                            element={<CategoryCreate data={data} setData={setData} />}
                        />
                        <Route path="category" element={<CategoriesList />} />
                        <Route path="category/:id" element={<CategoryEdit />} />

                        {/* ...........gift card.......... */}
                         <Route path="gift-cards" element={<GiftCardsList />} />
                        <Route path="gift-cards/:id" element={<GiftCardEdit />} />

                        {/* ...........orders.......... */}
                        <Route path="orders" element={<OrdersList resource='orders' title='مدیریت سفارشات دارینه' key={'orders'} />} />
                        <Route path="orders/:id" element={<OrderEdit resource='orders' key={'orders'} />} />

                        <Route path="silver-orders" element={<OrdersList resource='silver-orders' title='مدیریت سفارشات نقرینه' key={'silver-orders'} />} />
                        <Route path="silver-orders/:id" element={<OrderEdit resource='silver-orders' key={'silver-orders'} />} />
                    

                        {/* ...........bank card.......... */}
                        <Route
                            path="gold-bank/create"
                            element={<BankCardCreate data={data} setData={setData} resource='gold-bank' key={'gold-bank'} />}
                        />
                        <Route path="gold-bank" element={<BankCardList resource='gold-bank' title='مدیریت کارت های بانکی دارینه' key={'gold-bank'}  />} />
                        <Route path="gold-bank/:id" element={<BankCardEdit resource='gold-bank' key={'gold-bank'} />} />


                         <Route
                            path="silver-bank/create"
                            element={<BankCardCreate data={data} setData={setData} resource='silver-bank' key={'silver-bank'} />}
                        />
                        <Route path="silver-bank" element={<BankCardList resource='silver-bank'  title='مدیریت کارت های بانکی نقرینه' key={'silver-bank'} />} />
                        <Route path="silver-bank/:id" element={<BankCardEdit resource='silver-bank' key={'silver-bank'} />} />

                        {/* ...........banners.......... */}
                        <Route
                            path="gold-banners/create"
                            element={<BannerCreate data={data} setData={setData} resource='gold-banners' key={'gold-banners'} />}
                        />
                        <Route path="gold-banners" element={<BannersList resource='gold-banners' title='مدیریت بنر های دارینه' key={'gold-banners'} />} />
                        <Route path="gold-banners/:id" element={<BannerEdit resource='gold-banners' key={'gold-banners'} />} />

                        <Route
                            path="silver-banners/create"
                            element={<BannerCreate data={data} setData={setData} resource='silver-banners' key={'silver-banners'} />}
                        />
                        <Route path="silver-banners" element={<BannersList resource='silver-banners' title='مدیریت بنر های نقرینه' key={'silver-banners'} />} />
                        <Route path="silver-banners/:id" element={<BannerEdit resource='silver-banners' key={'silver-banners'} />} />
                    {/* ...........partners.......... */}
                    <Route path="partners" element={<PartnersList key={'partners'} />} />

                     {/* ...........deposit.......... */}
                       
                        <Route path="OrderDeposit" element={<DepositList resource='OrderDeposit' title='مدیریت واریز دارینه' key={'OrderDeposit'} />} />
                        <Route path="OrderDeposit/:id" element={<DepositEdit resource='OrderDeposit' key={'OrderDeposit'} />} />
                        
                        
                        <Route path="silver-OrderDeposit" element={<DepositList resource='silver-OrderDeposit' title='مدیریت واریز نقرینه' key={'silver-OrderDeposit'} />} />
                        <Route path="silver-OrderDeposit/:id" element={<DepositEdit resource='silver-OrderDeposit' key={'silver-OrderDeposit'} />} />

                        {/* ...........withdraw.......... */}
                       
                        <Route path="OrderWithdraw" element={<WithdrawList resource='OrderWithdraw' title='مدیریت برداشت دارینه' key={'OrderWithdraw'} />} />
                        <Route path="OrderWithdraw/:id" element={<WithdrawEdit resource='OrderWithdraw' key={'OrderWithdraw'} />} />
                        
                        
                        <Route path="silver-OrderWithdraw" element={<WithdrawList resource='silver-OrderWithdraw' title='مدیریت برداشت نقرینه' key={'silver-OrderWithdraw'} />} />
                        <Route path="silver-OrderWithdraw/:id" element={<WithdrawEdit resource='silver-OrderWithdraw' key={'silver-OrderWithdraw'} />} />
                            {/* ...........logs.......... */}
                       
                        <Route path="logs" element={<LogsList  />}/>
                        {/* ...........live-price.......... */}
                        <Route path="live-price" element={<LivePrice  />}/>


   {/* ...........offset.......... */}
                        <Route
                            path="market/gold/offset/create"
                            element={<OffsetCreate data={data} setData={setData} resource='market/gold/offset' key={'market/gold/offset'} />}
                        />
                        <Route path="market/gold/offset" element={<OffsetList resource='market/gold/offset' title='مدیریت قیمت دارینه' key={'market/gold/offset'}  />} />
                        <Route path="market/gold/offset/:id" element={<OffsetEdit resource='market/gold/offset' key={'market/gold/offset'} />} />


                         <Route
                            path="market/silver/offset/create"
                            element={<OffsetCreate data={data} setData={setData} resource='market/silver/offset' key={'market/silver/offset'} />}
                        />
                        <Route path="market/silver/offset" element={<OffsetList resource='market/silver/offset'  title='مدیریت قیمت نقرینه' key={'market/silver/offset'} />} />
                        <Route path="market/silver/offset/:id" element={<OffsetEdit resource='market/silver/offset' key={'market/silver/offset'} />} />

                         {/* ...........Announcement.......... */}
                        <Route
                            path="gold-announcements/create"
                            element={<AnnouncementCreate data={data} setData={setData} resource='gold-announcements' key={'gold-announcements'} />}
                        />
                        <Route path="gold-announcements" element={<AnnouncementList resource='gold-announcements' title='مدیریت اطلاعیه های دارینه' key={'gold-announcements'} />} />
                        <Route path="gold-announcements/:id" element={<AnnouncementEdit resource='gold-announcements' key={'gold-announcements'} />} />

                        <Route
                            path="silver-announcements/create"
                            element={<AnnouncementCreate data={data} setData={setData} resource='silver-announcements' key={'silver-announcements'} />}
                        />
                        <Route path="silver-announcements" element={<AnnouncementList resource='silver-announcements' title='مدیریت اطلاعیه های نقرینه' key={'silver-announcements'} />} />
                        <Route path="silver-announcements/:id" element={<AnnouncementEdit resource='silver-announcements' key={'silver-announcements'} />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
