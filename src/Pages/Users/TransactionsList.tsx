import React, {useState} from 'react'
import {Chip, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import { createTableHeadCells } from '../../Components/Table/CustomTableHead'
import { OrderStatus } from '../Orders/Orders'
import { DepositType } from '../Deposit/Deposit'
import { createQueryParam } from '../../Core/QueryParams'
import { DataProvider } from '../../Core/DataProvider'
import { setUtil } from '../../redux/UtilSlice'
import { ListPage } from '../../Components/Table/ListPage'
import { CustomTable } from '../../Components/Table/CustomTable'
import { formatPrice } from '../../Core/FormatPrice'
import { formatDate } from '../../Core/FormatDate'
import { TransactionsType } from './Users'

const resource = 'OrderDeposit'

const tableHeadCells = [
    createTableHeadCells('نوع', 'type'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('مبلغ نهایی', 'toman_amount'),
    createTableHeadCells('مقدار', 'amount'),

    createTableHeadCells('کد پیگیری', 'tracking_code'),
    createTableHeadCells('توضیحات', 'description'),
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

export const statusCalc = (status: OrderStatus) => {
    switch (status) {
        case 'FAILED':
            return 'error'
        case 'COMPLETED':
            return 'success'
        case 'PENDING':
            return 'warning'
        default:
            return 'primary'
    }
}

export const enToPer = (status: OrderStatus) => {
    switch (status) {
        case 'PENDING':
            return 'در انتظار'
        case 'COMPLETED':
            return 'تکمیل شده'
        case 'FAILED':
            return 'ناموفق'
        default:
            return status
    }
}

export const methodFa = (method: DepositType['method']) => {
    switch (method) {
        case 'ONLINE':
            return 'آنلاین'
        case 'CARD_TO_CARD':
            return 'کارت به کارت'
        default:
            return method
    }
}

export function TransactionsList({id}:{id:number}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

  const [transaction,setTransaction] = useState<{
        total_results:number
        data:TransactionsType[]
    }>({
        total_results:0,
        data:[]
    })

    const dispatch = useDispatch()

       const getTransactions = async () => {
           setLoading(true)
   
           try {
               const response = await DataProvider.get<{
                   total_results: number
                   results: TransactionsType[]
               }>(`users/${id}/transactions/`)
   
               if (response) {
                   setTransaction({
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
        if (!id) return
        getTransactions()
    }, [search,id])

    return (
        <ListPage
            header={'مدیریت واریز و برداشت'}
            href={resource + '/create'}
            searchField="user_mobile"
            searchText="کد پیگیری"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getTransactions}
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
                rows={transaction.data}
                count={transaction.total_results}
                getList={getTransactions}
                params={search}
                setParams={setSearch}
                handleSort={getTransactions}
                loading={loading}
                hasDetail={false}
                noDelete
                tableBodyCells={transaction.data.map((item) => (
                    <React.Fragment key={item.id}>
                            <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.type}
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
                                {formatPrice(item.toman_amount)}
                            </Typography>
                        </TableCell>
      <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.amount} گرم
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                {item.tracking_code}
                            </Typography>
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