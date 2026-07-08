import React, {useState} from 'react'
import {Chip, Typography} from '@mui/material'
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
import {  OrdersTransactionsType } from '../OrdersTransactions'
import { statusCalc } from '../../Deposit/List/DepositList'



const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),

    createTableHeadCells('شماره تلفن', 'user_mobile'),
    createTableHeadCells('کد پیگیری', 'tracking_code'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('وزن', 'amount_gr'),
    createTableHeadCells('مبلغ', 'price_per_gram'),
    createTableHeadCells('مبلغ نهایی', 'total_amount'),
    createTableHeadCells('کارمزد', 'fee'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            {id: 'PENDING', label: 'در انتظار'},
            {id: 'COMPLETED', label: 'تکمیل شده'},
            // {id: 'CANCELED', label: 'لغو شده'},
        ],
    },
      {
        field: 'tracking_code',
        label: 'کد پیگیری',
        type: '',
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

export function OrdersTransactionsList({resource,title}:{resource:string,title:string}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [orders, setOrders] = useState<{
        total_results: number
        data: OrdersTransactionsType[]
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
                results: OrdersTransactionsType[]
            }>(`${resource}/`, search)

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
             header={title}
            href={resource + '/create'}
            searchField="username"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
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
                resource={resource}
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
                                {item.id}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.user_mobile}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.tracking_code}
                            </Typography>
                        </TableCell>

                   

                        <TableCell>
                            <Chip
                                label={item.status_display}
                                color={statusCalc(item.status)}
                                size="small"
                            />
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.amount_gr} گرم
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {formatPrice(
                                    Number(item.price_per_gram)
                                )}{' '}
                            </Typography>
                        </TableCell>
                               <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {formatPrice(
                                    Number(item.total_amount)
                                )}{' '}
                            </Typography>
                        </TableCell>
<TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {formatPrice(
                                    Number(item.fee)
                                )}{' '}
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