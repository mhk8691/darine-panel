import React, {useState} from 'react'
import {Chip, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'

import {OrderStatus, OrdersType} from '../Orders'

const RECOURCE = 'orders'

const tableHeadCells = [
    createTableHeadCells('کد پیگیری', 'tracking_code'),
    createTableHeadCells('محصول', 'items'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('وزن طلا', 'total_gold_amount'),
    createTableHeadCells('مبلغ', 'total_toman_amount'),
    createTableHeadCells('روش پرداخت', 'payment_method'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            {id: 'PENDING', label: 'در انتظار'},
            {id: 'WAITING_FOR_APPROVAL', label: 'در انتظار تایید'},
            {id: 'PROCESSING', label: 'در حال پردازش'},
            {id: 'COMPLETED', label: 'تکمیل شده'},
            {id: 'CANCELED', label: 'لغو شده'},
        ],
    },
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

export const statusCalc = (status: OrderStatus) => {
    switch (status) {
        case 'FAILED':
            return 'error'
        case 'COMPLETED':
            return 'success'
        case 'PENDING':
            return 'warning'
        default:
            return 'primary'
    }
}

export const enToPer = (status: OrderStatus) => {
    switch (status) {
        case 'PENDING':
            return 'در انتظار'
       
    
        case 'COMPLETED':
            return 'تکمیل شده'
        case 'FAILED':
            return 'لغو شده'
        default:
            return status
    }
}

export const paymentMethodFa = (method: string) => {
    switch (method) {
        case 'GOLD':
            return 'طلا'
        case 'ONLINE':
            return 'آنلاین'
        default:
            return method
    }
}

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
            const response = await DataProvider.get<{
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
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                })
            )
        }

        setLoading(false)
    }

    useDeepCompareEffect(() => {
        getOrders()
    }, [search])

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
                noDelete
                tableBodyCells={orders.data.map((item) => (
                    <React.Fragment key={item.id}>
                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.tracking_code}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Stack spacing={0.5}>
                                <Typography
                                    variant="body2"
                                    sx={{whiteSpace: 'nowrap'}}
                                >
                                    {item.items?.[0]?.product_name || '--'}
                                </Typography>

                                {item.items?.length > 1 && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        +{item.items.length - 1} محصول دیگر
                                    </Typography>
                                )}
                            </Stack>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={enToPer(item.status)}
                                color={statusCalc(item.status)}
                                size="small"
                            />
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.total_gold_amount} گرم
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {formatPrice(
                                    Number(item.total_toman_amount)
                                )}{' '}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {paymentMethodFa(item.payment_method)}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {formatDate(item.created_at)}
                            </Typography>
                        </TableCell>
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}