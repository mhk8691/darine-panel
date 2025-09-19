import { Chip, ChipPropsColorOverrides, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'
import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { DataProvider } from '../../../Core/DataProvider'
import { formatDate } from '../../../Core/FormatDate'
import { formatPrice } from '../../../Core/FormatPrice'
import { createQueryParam } from '../../../Core/QueryParams'
import { setUtil } from '../../../redux/UtilSlice'
import { OrderStatus, OrdersType } from '../Orders'

const RECOURCE = 'shop/orders'
const tableHeadCells = [
    createTableHeadCells('نام', 'user_name'),
    createTableHeadCells('شماره تلفن', 'user_phone'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('دلیل لغو', 'reason'),
    createTableHeadCells('محصولات', 'products'),
    createTableHeadCells('قیمت نهایی', 'total_price'),
    createTableHeadCells('روش پرداخت', 'payment_method'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
]
const queryNames = [
    ...tableHeadCells.slice(1, 3).map((cell) => {
        if (cell.name === 'status')
            return {
                field: cell.name,
                label: cell.label,
                type: 'choice',
                choice: [
                    { id: 'pending', label: 'درانتظار' },
                    { id: 'processing', label: 'درحال پردازش' },
                    { id: 'completed', label: 'تکمیل شده' },
                    { id: 'canceled', label: 'لغو شده' },
                ],
            }
        else
            return {
                field: cell.name,
                label: cell.label,
                type: '',
                choice: [],
            }
    }),
    {
        field: 'start_date',
        label: 'تاریخ شروع',
        type: 'date',
    },
    {
        field: 'end_date',
        label: 'تاریخ پایان',
        type: 'date',
    },
]

export function OrdersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<{
        total_results: number
        data: OrdersType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getOrders = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: OrdersType[]
            }>(`${RECOURCE}/`, search)

            if (response) {
                setOrders({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({ open: true, message: error.message, severity: 'error' }))
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getOrders()
    }, [search])
    const statusCalc = (status: OrderStatus) => {
        if (status === 'processing') return 'secondary'
        else if (status === 'completed') return 'success'
        else if (status === 'pending') return 'warning'
        else return 'primary'
    }
    const randomColor: ChipPropsColorOverrides = ['primary', 'secondary', 'success', 'warning']
    const enToPer = (status: string) => {
        if (status === 'processing') return 'درحال پردازش'
        else if (status === 'completed') return 'تکمیل شده'
        else if (status === 'pending') return 'درانتظار'
        else return 'لغو شده'
    }
    return (
        <ListPage
            header="مدیریت سفارشات"
            href={RECOURCE + '/create'}
            searchField="username"
            searchText="نام کاربری"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getOrders}
            filtersData={queryNames}
            noCreate={true}
            defaultState={{
                status: '',
                username: '',
                createdAt: '',
                products: [
                    {
                        name: '',
                        price: 0,
                        image: '',
                    },
                ],
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={orders.data}
                count={orders.total_results}
                getList={getOrders}
                params={search}
                setParams={setSearch}
                handleSort={getOrders}
                loading={loading}
                hasDetail={true}
                tableBodyCells={orders.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.user_full_name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.user_phone}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={enToPer(item.status)}
                                color={statusCalc(item.status)}
                                variant="filled"
                                sx={{
                                    fontSize: {
                                        xs: '12px',
                                        sm: '13px',
                                        md: '14px',
                                        xl: '15px',
                                    },
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.reason}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction={'row'} gap={1}>
                                {item.product_names.split(',').map((product, index) => (
                                    <Chip
                                        label={product}
                                        color={randomColor[index]}
                                        variant="outlined"
                                        sx={{
                                            fontSize: {
                                                xs: '12px',
                                                sm: '13px',
                                                md: '14px',
                                                xl: '15px',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {formatPrice(item.total_price)}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            {item.payment_method && (
                                <Typography
                                    variant="body2"
                                    fontSize={{
                                        xs: '13px',
                                        sm: '14px',
                                        md: '15px',
                                        xl: '16px',
                                    }}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.payment_method === 'Bank Transfer' && 'کارت به کارت'}
                                    {item.payment_method === 'Online' && 'آنلاین'}
                                    {item.payment_method !== 'Online' &&
                                        item.payment_method !== 'Bank Transfer' &&
                                        'نامشخص'}
                                </Typography>
                            )}
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {formatDate(item.created_at)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
