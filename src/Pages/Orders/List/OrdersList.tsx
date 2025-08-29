import {Box, Chip, ChipPropsColorOverrides, Stack, Typography} from '@mui/material'
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
import {useDispatch} from 'react-redux'
import {setUtil} from '../../../redux/UtilSlice'
import { formatPrice } from '../../../Core/FormatPrice'

const RECOURCE = 'orders'
const tableHeadCells = [
    createTableHeadCells('نام کاربری', 'username'),
    createTableHeadCells('شماره تلفن', 'user_phone'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('محصولات', 'products'),
    createTableHeadCells('قیمت نهایی', 'total_price'),
    createTableHeadCells('تاریخ سفارش', 'created_at'),
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
        data: [],
    })
    const dispatch = useDispatch()
    const getOrders = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: OrdersType[]
            }>(`shop/${RECOURCE}/`, search)

            if (response) {
                setOrders({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getOrders()
    }, [search])
    const randomColor: ChipPropsColorOverrides = ['primary', 'secondary', 'success', 'warning']
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
                            <Stack direction={'row'} gap={1}>
                                {item.product_names.split(',').map((product, index) => (
                                    <Chip
                                        label={product}
                                        color={randomColor[index]}
                                        variant="outlined"
                                        sx={{
                                            fontSize: {
                                                xs: '13px',
                                                sm: '14px',
                                                md: '16px',
                                                xl: '17px',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                            {/*                             
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
                                {item.product_names}
                            </Typography> */}
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
                        {/* <TableCell>
                            <Stack direction={'row'} spacing={1}>
                                <Box
                                    component={'img'}
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                    }}
                                    src={item.}
                                    borderRadius={2}
                                />
                            </Stack>
                        </TableCell> */}
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
                                    {item.payment_method}
                                </Typography>
                            )}
                            {/* {item.payment_method.image && (
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
                            )} */}
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
