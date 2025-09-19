import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
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
import {RequestsType} from '../Requests'

const RECOURCE = 'requests'

const tableHeadCells = [
    createTableHeadCells('شماره تلفن', 'phone_number'),
    createTableHeadCells('آیدی تلگرام', 'telegram_id'),
    createTableHeadCells('نام کاربر', 'user_full_name'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]
const queryNames = [
    ...tableHeadCells.slice(1, 5).map((cell) => {
        if (cell.name === 'status')
            return {
                field: cell.name,
                label: cell.label,
                type: 'choice',
                choice: [
                    {id: 'pending', label: 'درانتظار'},
                    {id: 'done', label: 'بررسی شده'},
                ],
            }
        else if (cell.name === 'created_at')
            return {
                field: 'created_at',
                label: 'تاریخ ایجاد',
                type: 'date',
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
export function RequestsList() {
    const [requests, setRequests] = useState<{
        total_results: number
        data: RequestsType[]
    }>({
        total_results: 0,
        data: [],
    })

    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getRequests = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: RequestsType[]
            }>(`${RECOURCE}/`, search)
            if (response) {
                setRequests({
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
        getRequests()
    }, [search])

    return (
        <ListPage
            header="مدیریت درخواست ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getRequests}
            filtersData={queryNames}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={requests.data}
                count={requests.total_results}
                getList={getRequests}
                params={search}
                setParams={setSearch}
                handleSort={getRequests}
                loading={loading}
                hasDetail={true}
                tableBodyCells={requests.data.map((item, index) => (
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
                                {item.phone_number}
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
                                    direction: 'rtl !important',
                                }}
                            >
                                {item.telegram_id}
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
                                {item.user_full_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={item.status === 'done' ? 'بررسی شده' : 'درانتظار'}
                                color={item.status === 'done' ? 'success' : 'warning'}
                                variant="filled"
                                sx={{
                                    fontSize: {
                                        xs: '12px',
                                        sm: '13px',
                                        md: '14px',
                                        xl: '15px',
                                    },
                                }}
                            />
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
