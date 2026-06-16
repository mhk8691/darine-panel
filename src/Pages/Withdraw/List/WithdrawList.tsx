import React, {useState} from 'react'
import {Chip, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {formatPrice} from '../../../Core/FormatPrice'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import { WithdrawType } from '../Withdraw'
import { enToPer, statusCalc } from '../../Orders/List/OrdersList'
import { methodFa } from '../../Deposit/List/DepositList'

const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),

    createTableHeadCells('شماره تلفن', 'user_mobile'),
    createTableHeadCells('کد پیگیری', 'tracking_code'),
    createTableHeadCells('مبلغ', 'amount'),
    createTableHeadCells('روش پرداخت', 'method'),
    createTableHeadCells('وضعیت', 'status'),
      createTableHeadCells('توضیح', 'description'),
    createTableHeadCells('تاریخ', 'created_at'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            {id: 'PENDING', label: 'در انتظار'},
            {id: 'COMPLETED', label: 'تکمیل شده'},
            {id: 'FAILED', label: 'ناموفق'},
        ],
    },
    {
        field: 'tracking_code',
        label: 'کد پیگیری',
        type: '',
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



export function WithdrawList({resource, title}: {resource: string; title: string}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [withdraw, setWithdraw] = useState<{
        total_results: number
        data: WithdrawType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getWithdraw = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: WithdrawType[]
            }>(`${resource}/`, search)

            if (response) {
                setWithdraw({
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
        getWithdraw()
    }, [search])

    return (
        <ListPage
            header={title}
            href={resource + '/create'}
            searchField="user_mobile"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getWithdraw}
            filtersData={queryNames}
            noCreate={true}
            defaultState={{
                status: '',
                user_mobile: '',
            }}
        >
            <CustomTable
                resource={resource}
                headCells={tableHeadCells}
                rows={withdraw.data}
                count={withdraw.total_results}
                getList={getWithdraw}
                params={search}
                setParams={setSearch}
                handleSort={getWithdraw}
                loading={loading}
                hasDetail={true}
                noDelete
                tableBodyCells={withdraw.data.map((item) => (
                    <React.Fragment key={item.id}>
                            <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.id}
                            </Typography>
                        </TableCell>    
                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.user_mobile}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.tracking_code}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {formatPrice(item.amount)}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {methodFa(item.method)}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={enToPer(item.status)}
                                color={statusCalc(item.status)}
                                size="small"
                            />
                        </TableCell>
   <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.description}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {formatDate(item.created_at)}
                            </Typography>
                        </TableCell>
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}