import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useEffect, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'
import { createTableHeadCells } from '../../../../Components/Table/CustomTableHead'
import { createQueryParam } from '../../../../Core/QueryParams'
import { useDispatch } from 'react-redux'
import { DataProvider } from '../../../../Core/DataProvider'
import { setUtil } from '../../../../redux/UtilSlice'
import { ListPage } from '../../../../Components/Table/ListPage'
import { CustomTable } from '../../../../Components/Table/CustomTable'
import { formatPrice } from '../../../../Core/FormatPrice'
import { formatDate } from '../../../../Core/FormatDate'
import { useParams } from 'react-router-dom'
import { BalanceType } from '../BalanceWithdrawals'
import { BalanceWithdrawalsCreate } from '../Create/BalanceWithdrawalsCreate'




export function BalanceWithdrawalsList({resource,title,type}:{resource:string,title:string,type:'gold'|'silver'}) {
    const tableHeadCells = [
    createTableHeadCells('کاربر', 'user'),
    createTableHeadCells('شماره کاربر', 'user_mobile'),
    createTableHeadCells('ادمین', 'admin'),
    createTableHeadCells('شماره ادمین', 'admin_mobile'),
    createTableHeadCells('مبلغ', 'wallet_amount'),
    createTableHeadCells(type === 'gold' ? 'طلا' :'نقره', type === 'gold' ? 'gold_amount' :'silver_amount'),
    
    createTableHeadCells('یادداشت', 'admin_note'),
    createTableHeadCells('تاریخ', 'created_at'),
    createTableHeadCells('تاریخ آپدیت', 'updated_at'),
]

const queryNames = tableHeadCells.slice(2, 4).map((cell) => {
    if (cell.name === 'role')
        return {
            field: cell.name,
            label: cell.label,
            type: 'choice',
            choice: [
                { label: 'کاربر', id: 'customer' },
                { label: 'ادمین', id: 'admin' },
            ],
        }

    return {
        field: cell.name,
        label: cell.label,
        type: '',
        choice: [],
    }
})
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const userId =useParams().userId
    const [balance, setBalance] = useState<{
        total_results: number
        data: BalanceType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getBalance = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: BalanceType[]
            }>(`${resource}/${userId}`, search)

            if (response) {
                setBalance({
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
        getBalance()
    }, [search])

    return (
        <>
        <ListPage
            header={title}
            href={'create'}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getBalance}
            filtersData={queryNames}
            createModal={BalanceWithdrawalsCreate}
            defaultState={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                phoneNumber: '',
            }}
        >
            <CustomTable
            groupEdit
                resource={resource}
                headCells={tableHeadCells}
                rows={balance.data}
                count={balance.total_results}
                getList={getBalance}
                params={search}
                setParams={setSearch}
                handleSort={getBalance}
                loading={loading}
                hasDetail={true}
                tableBodyCells={balance.data.map((item) => (
                    <>
                        <TableCell >
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                            >
                                {item.user}
                            </Typography>
                        </TableCell>

                        <TableCell >
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                            >
                                {item.user_mobile}
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
                            >
                                {item.admin}
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
                            >
                                {item.admin_mobile}
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
                            >
                                {formatPrice(item.wallet_amount)}
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
                            >
                                {type === 'gold' ? item.gold_amount :item.silver_amount} گرم
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
                            >
                                {item.admin_note}
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
                            >
                                {formatDate(item.created_at)}
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
                            >
                                {formatDate(item.updated_at)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
     
        </>
    )
}