import {
    Box,
    Grid,
    Stack,
    TableFooter,
    TablePagination,
    TableSortLabel,
    Typography,
} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useEffect, useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import {createQueryParam} from '../../../Core/QueryParams'
import {useAppDispatch} from '../../../redux/store'
import {setUtil} from '../../../redux/UtilSlice'
import {CategoriesType} from '../../Categories/Categories'
import {ProductCreate} from '../Create/ProductCreate'
import ProductCard from './ProductCard'
import {Searchbar} from '../../../Components/Input/Searchbar'
import AddButton from '../../../Components/Buttons/add'

const RECOURCE = 'product'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('وضعیت', 'visible'),
    createTableHeadCells('تعداد', 'stock'),
    createTableHeadCells('قیمت پایه', 'base_price'),
    createTableHeadCells('حداکثر قیمت', 'max_price'),
    createTableHeadCells('تایپ محصول', 'type'),
    createTableHeadCells('دسته بندی', 'category'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

export interface ProductsListType {
    id: number
    name: string
    base_price: number
    max_price: number | null
    category: number
    category_name: string
    type: string
    created_at: string
    visible: boolean
    remaining: number | null
    stock: number | null
    picture: string
}
export function ProductsList() {
    const [products, setProducts] = useState<{
        total_results: number
        data: ProductsListType[]
    }>({
        total_results: 0,
        data: [],
    })
    const [categories, setCategories] = useState<{
        total_results: number
        data: CategoriesType[]
    }>({
        total_results: 0,
        data: [],
    })
    const getCategories = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: CategoriesType[]
            }>(`category/`, search)
            if (response) {
                setCategories({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        setLoading(false)
    }

    const queryNames = [
        ...tableHeadCells.slice(3, 5).map((cell) => {
            if (cell.name === 'category')
                return {
                    field: cell.name,
                    label: cell.label,
                    type: 'choice',
                    choice: categories.data.map((item) => ({
                        label: item.name,
                        id: item.id,
                    })),
                }
            else if (cell.name === 'type')
                return {
                    field: cell.name,
                    label: cell.label,
                    type: 'choice',
                    choice: [
                        {label: 'سکه', id: 'coins'},
                        {label: 'اکانت', id: 'account'},
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
    ]

    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const createSortHandler = (property: string) => (event: React.MouseEvent) => {
        const isAsc = search.ordering?.includes(property) && !search.ordering?.includes('-')
        setSearch((prev) => ({
            ...prev,
            ordering: isAsc ? `-${property}` : property,
        }))
    }

    const dispatch = useAppDispatch()
    const getProducts = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: ProductsListType[]
            }>(`${RECOURCE}/`, search)

            if (response) {
                setProducts({
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
        getProducts()
    }, [search])
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <Stack p={2}>
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <AddButton
                        href={'/product/create'}
                        text={'جدید'}
                        sx={{
                            fontSize: {
                                xs: '14px',
                                sm: '18px',
                            },
                            padding: '7px 13px',
                        }}
                    />
                </Stack>
                <Searchbar
                    searchField="title"
                    placeholder={`جستجو بر اساس نام محصول ...`}
                    setParams={setSearch}
                    filtersData={queryNames ?? []}
                    noFilters={queryNames ? false : true}
                    params={search}
                    border={'1px solid #606566'}
                />
            </Stack>
            <Box px={2}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    border={1}
                    borderColor="#606566"
                    borderRadius={2}
                    overflow="auto"
                    mb={3}
                >
                    {tableHeadCells.map((headCell) => (
                        <TableCell
                            key={headCell.name}
                            sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '15px',
                                    lg: '16px',
                                    xl: '18px',
                                },
                                border: 'none',
                            }}
                        >
                            <TableSortLabel
                                // active={search?.sort === headCell.name}
                                // direction={
                                //     search?.sort === headCell.name
                                //         ? search.order === 1
                                //             ? 'asc'
                                //             : 'desc'
                                //         : 'asc'
                                // }
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                                onClick={createSortHandler(headCell.name)}
                                color="#434B59"
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </Stack>
            </Box>
            <Grid container spacing={2} sx={{px: 2, pb: 2}}>
                {products.data.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard item={item} getList={getProducts} />
                    </Grid>
                ))}
            </Grid>
            <TableFooter sx={{direction: 'rtl'}}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={products.total_results}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => {
                        setPage(newPage)
                        setSearch((prev) => ({...prev, page: newPage + 1}))
                    }}
                    onRowsPerPageChange={(event) => {
                        const newValue = parseInt(event.target.value, 10)
                        setRowsPerPage(newValue)
                        setPage(0)
                        setSearch((prev) => ({...prev, page_size: newValue}))
                    }}
                    labelRowsPerPage="تعداد ردیف در هر صفحه:"
                    labelDisplayedRows={({from, to, count}) =>
                        `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                    }
                    sx={{
                        '& .MuiTablePagination-selectLabel': {
                            fontSize: '16px',
                            fontWeight: '500',
                        },
                        '& .MuiTablePagination-displayedRows': {
                            fontSize: '17px',
                            fontWeight: '500',
                        },
                    }}
                />
            </TableFooter>
        </>
    )
}
