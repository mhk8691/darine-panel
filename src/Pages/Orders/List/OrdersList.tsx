import {Box, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'
import {OrdersType} from '../Orders'

const RECOURCE = 'orders'
const tableHeadCells = [
    createTableHeadCells('نام کاربری', 'username'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('محصولات', 'products'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
    createTableHeadCells('رضایت نامه', 'consent'),
    createTableHeadCells('روش پرداخت', 'payment_method'),
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
        total_results: number
        data: OrdersType[]
    }>({
        total_results: 0,
        data: [
            {
                id: 1,
                status: 'در انتظار',
                username: 'test',
                createdAt: '2025-01-06T09:16:40.447096Z',
                Payment_method: {
                    title: null,
                    image: 'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
                },
                Consent: [
                    'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
                    'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
                ],
                products: [
                    {
                        id: 1,
                        name: 'product1',
                        price: 1000,
                        image: 'https://via.placeholder.com/150',
                        count: 3,

                        account: {
                            email: 'test@gmail.com',
                            username: 'test',
                            password: '123',
                            method: 'facebook',
                        },
                    },
                    {
                        id: 2,
                        name: 'product2',
                        price: 2000,
                        image: 'https://via.placeholder.com/150',
                        count: 2,
                        account: {
                            email: 'test@gmail.com',
                            username: 'test',
                            password: '123',
                            method: 'facebook',
                        },
                    },
                ],
            },
        ],
    })
    const getOrders = async () => {
        setLoading(true)
        let response = await DataProvider.get<{
            total_results: number
            results: OrdersType[]
        }>(`${RECOURCE}/list`, search)

        if (response) {
            setOrders({
                total_results: response.data.total_results,
                data: response.data.results,
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
                count={orders.total_results}
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
                                {item.username}
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
                                {item.status}
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
                                {item.products.map((product) => product.name).join(', ')}
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
                                {formatDate(item.createdAt)}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction={'row'} spacing={1}>
                                {item.Consent.map((item) => (
                                    <Box
                                        component={'img'}
                                        sx={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: 2,
                                            objectFit: 'cover',
                                        }}
                                        src={item}
                                        borderRadius={2}
                                    />
                                ))}
                            </Stack>
                        </TableCell>
                        <TableCell>
                            {item.Payment_method.title && (
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
                                    {item.Payment_method.title}
                                </Typography>
                            )}
                            {item.Payment_method.image && (
                                <Box
                                    component={'img'}
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                    }}
                                    src={item.Payment_method.image}
                                    borderRadius={2}
                                />
                            )}
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
