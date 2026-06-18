import React, {useState} from 'react'
import TableCell from '@mui/material/TableCell'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import { Box, Typography } from '@mui/material'
import { formatDate } from '../../../Core/FormatDate'



const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('ادمین', 'admin_mobile'),
    createTableHeadCells('کاربر', 'user_mobile'),
    createTableHeadCells('آبجکت آیدی', 'object_id'),
    createTableHeadCells('نوع عمل', 'action_type_display'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('تاریخ', 'created_at'),

]
const queryNames = [
    {
        field: 'action_type_display',
        label:'نوع عمل',
        type: '',
        choice: [],
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


export type LogsType = {
"id": string,
    "admin_mobile": string,
    "user_mobile": string,
    "action_type_display": string,
    "model_name": string,
    "object_id": number,
    "action": string,
    "description": string,
    "created_at": string
}

const resource = 'logs'
export function LogsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [logs, setLogs] = useState<{
        total_results: number
        data: LogsType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getLogs = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: LogsType[]
            }>(`${resource}/`, search)

            if (response) {
                setLogs({
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
        getLogs()
    }, [search])

    return (
        <ListPage
             header={'مدیریت لاگ ها'}
            href={resource + '/create'}
            
            searchField="username"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getLogs}
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
                rows={logs.data}
                count={logs.total_results}
                getList={getLogs}
                params={search}
                setParams={setSearch}
                handleSort={getLogs}
                loading={loading}
                hasDetail={false}
                noEdit
                tableBodyCells={logs.data.map((item) => (
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
                                {item.admin_mobile ?? '--'}
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
                               {item.object_id}
                            </Typography>
                        </TableCell>
<TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.action_type_display}
                            </Typography>
                        </TableCell>
                   <TableCell>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {item.description
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map((line, index) => (
                <Typography
                    key={index}
                    variant="body2"
                    sx={{
                        whiteSpace: 'nowrap',
                        color: index === 0 ? 'text.primary' : 'text.secondary',
                        fontWeight: index === 0 ? 500 : 400,
                        fontSize: index === 0 ? '0.875rem' : '0.8rem',
                    }}
                >
                    {line}
                </Typography>
            ))}
    </Box>
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