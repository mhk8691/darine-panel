import {Rating, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {ProductsListType} from '../../Products/List/ProductsList'
import {CommentsType} from '../Edit/CommentEdit'

const RECOURCE = 'comments'

const tableHeadCells = [
    createTableHeadCells('شماره تلفن', 'phone_number'),
    createTableHeadCells('نام مشتری', 'customer'),
    createTableHeadCells('نام محصول', 'product'),
    createTableHeadCells('امتیاز', 'rating'),
    createTableHeadCells('وضعیت', 'accepted'),
    createTableHeadCells('دیدگاه', 'comment'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

export function CommentsList() {
    const [products, setProducts] = useState<{
        total_results: number
        data: ProductsListType[]
    }>({
        total_results: 0,
        data: [],
    })
    const queryNames = tableHeadCells.slice(2, 4).map((cell) => {
        if (cell.name === 'product')
            return {
                field: cell.name,
                label: cell.label,
                type: 'choice',
                choice: products.data.map((item) => {
                    return {
                        label: item.name,
                        id: item.id,
                    }
                }),
            }
        else if (cell.name === 'rating')
            return {
                field: cell.name,
                label: cell.label,
                type: 'choice',
                choice: [
                    {label: 1, id: 0},
                    {label: 2, id: 1},
                    {label: 3, id: 2},
                    {label: 4, id: 3},
                    {label: 5, id: 4},
                ],
            }
        else
            return {
                field: cell.name,
                label: cell.label,
                type: '',
            }
    })
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState<{
        total_results: number
        data: CommentsType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getComments = async () => {
        setLoading(true)
        let response = await DataProvider.get<{
            total_results: number
            results: CommentsType[]
        }>(`${RECOURCE}/`, search)

        if (response) {
            setComments({
                total_results: response.data.total_results,
                data: response.data.results,
            })
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getComments()
    }, [search])
    useEffect(() => {
        const getProducts = async () => {
            try {
                let response = await DataProvider.get<{
                    total_results: number
                    results: ProductsListType[]
                }>(`product/`, search)

                if (response) {
                    setProducts({
                        total_results: response.data.total_results,
                        data: response.data.results,
                    })
                }
            } catch (error: any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        }
        getProducts()
    }, [])

    return (
        <ListPage
            header="مدیریت دیدگاه ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام مشتری"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getComments}
            filtersData={queryNames}
            noCreate
            defaultState={{
                customer: '',
                product: '',
                rating: 0,
                comment: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={comments.data}
                count={comments.total_results}
                getList={getComments}
                params={search}
                setParams={setSearch}
                handleSort={getComments}
                loading={loading}
                tableBodyCells={comments.data.map((item, index) => (
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
                                {item.user_info.phone_number}
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
                                {item.user_info.name}
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
                                {item.product_info.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Rating name="read-only" size="medium" value={item?.rating} readOnly />
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
                                    color: item.accepted ? 'success.main' : 'primary.main',
                                }}
                            >
                                {item.accepted ? 'تایید شده' : 'رد شده'}
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
                                    whiteSpace: 'collapse',
                                }}
                            >
                                {item.text}
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
                                    whiteSpace: 'collapse',
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
