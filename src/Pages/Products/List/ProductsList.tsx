import {Typography} from '@mui/material'
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

const RECOURCE = 'product'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
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
                        {label: 'coins', id: 0},
                        {label: 'account', id: 1},
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
        <ListPage
            header="مدیریت محصولات"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام محصول"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getProducts}
            filtersData={queryNames}
            createModal={ProductCreate}
            defaultState={{
                name: '',
                introduction: '',
                connection_method: '',
                description: '',
                price: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={products.data}
                count={products.total_results}
                getList={getProducts}
                params={search}
                setParams={setSearch}
                handleSort={getProducts}
                loading={loading}
                hasDetail={true}
                tableBodyCells={products.data.map((item, index) => (
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
                                {item.name || '--'}
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
                                {formatPrice(item.base_price)}
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
                                {formatPrice(item.max_price)}
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
                                {item.type}
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
                                {item.category_name}
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
                    </>
                ))}
            />
        </ListPage>
    )
}
