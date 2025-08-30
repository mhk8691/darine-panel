import {Rating, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {formatDate} from '../../../Core/FormatDate'

const RECOURCE = 'comments'
export type CommentsType = {
    id: number
    user_info: {
        id: number
        name: string
        phone_number: string
        profile_picture: string
    }
    product_info: {
        id: number
        name: string
        thumbnail: string | null
    }
    text: string
    rating: number
    replies_count: number
    created_at: string
    updated_at: string
}
const tableHeadCells = [
    createTableHeadCells('شماره تلفن', 'phone_number'),
    createTableHeadCells('نام مشتری', 'customer'),
    createTableHeadCells('نام محصول', 'product'),
    createTableHeadCells('امتیاز', 'rating'),
    createTableHeadCells('دیدگاه', 'comment'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]
const queryNames = tableHeadCells.slice(2, 4).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function CommentsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState<{
        total_results: number
        data: CommentsType[]
    }>({
        total_results: 0,
        data: [],
    })
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
                noEdit
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
