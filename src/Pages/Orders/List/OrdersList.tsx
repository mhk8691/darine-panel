import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {OrdersType} from '../Orders'
import {formatDate} from '../../../Core/FormatDate'
import { PaginatedResponse, PaginationType } from '../../../Core/types'

const RECOURCE = 'orders'
const tableHeadCells = [
    createTableHeadCells('نام کاربری', 'username'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('محصولات', 'products'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function OrdersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<{
        data: OrdersType[]
        pagination: PaginationType
        count: number
    }>({
        data: [
            {
                id: 1,
                status: 'در انتظار',
                username: 'test',
                createdAt: '2025-01-06T09:16:40.447096Z',
                products: [
                    {
                        name: 'product1',
                        price: 1000,
                        image: 'https://via.placeholder.com/150',
                    },
                    {
                        name: 'product2',
                        price: 2000,
                        image: 'https://via.placeholder.com/150',
                    },
                ],
            },
        ],
        pagination: {} as PaginationType,
        count: 0,
    })
    const getOrders = async () => {
        setLoading(true)
        let response = await DataProvider.get<PaginatedResponse<OrdersType[]>>(
            `${RECOURCE}/list`,
            search,
        )

        if (response) {
            setOrders({
                data: response.data.results,
                pagination: response.data.pagination,
                count: response.data.pagination.pages * response.data.results.length,
            })
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
                count={orders.count}
                deleteName="name of deleting"
                getList={getOrders}
                params={search}
                setParams={setSearch}
                handleSort={getOrders}
                loading={loading}
                hasDetail={true}
                tableBodyCells={orders.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.username}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.status}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.products.map((product) => product.name).join(', ')}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {formatDate(item.createdAt)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
