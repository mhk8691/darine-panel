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
import {PaginatedResponse, PaginationType} from '../../../Core/types'
import {CommentsType} from '../Comments'
import {CommentCreate} from '../Create/CommentCreate'

const RECOURCE = 'comments'
const tableHeadCells = [
    createTableHeadCells('نام محصول', 'product'),
    createTableHeadCells('نام مشتری', 'customer'),
    createTableHeadCells('امتیاز', 'rating'),
    createTableHeadCells('دیدگاه', 'comment'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function CommentsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState<{
        data: CommentsType[]
        pagination: PaginationType
        count: number
    }>({
        data: [
            {
                id: 1,
                customer: 'تست',
                product: 'جم کلش',
                rating: 2,
                comment: 'تست',
            },
        ],
        pagination: {} as PaginationType,
        count: 0,
    })
    const getComments = async () => {
        setLoading(true)
        let response = await DataProvider.get<PaginatedResponse<CommentsType[]>>(
            `${RECOURCE}/list`,
            search,
        )

        if (response) {
            setComments({
                data: response.data.results,
                pagination: response.data.pagination,
                count: response.data.pagination.pages * response.data.results.length,
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
            searchText="دیدگاه"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getComments}
            filtersData={queryNames}
            createModal={CommentCreate}
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
                count={comments.count}
                deleteName="name of deleting"
                getList={getComments}
                params={search}
                setParams={setSearch}
                handleSort={getComments}
                loading={loading}
                hasDetail={true}
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
                                {item.customer}
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
                                {item.product}
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
                                {item.comment}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
