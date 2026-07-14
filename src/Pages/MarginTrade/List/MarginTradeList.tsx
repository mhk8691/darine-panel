import React, { useState } from 'react'
import { Chip, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'

import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { DataProvider } from '../../../Core/DataProvider'
import { formatDate } from '../../../Core/FormatDate'
import { formatPrice } from '../../../Core/FormatPrice'
import { createQueryParam } from '../../../Core/QueryParams'
import { setUtil } from '../../../redux/UtilSlice'
import { statusCalc } from '../../Deposit/List/DepositList'
import { MarginTradeType } from '../MarginTrade'

const tableHeadCells = [
  createTableHeadCells('آیدی', 'id'),
  createTableHeadCells('نام کاربر', 'user_full_name'),
  createTableHeadCells('شماره تلفن', 'user_mobile'),
  createTableHeadCells('نوع سفارش', 'order_type_display'),
  createTableHeadCells('وضعیت', 'status'),
  createTableHeadCells('وزن', 'weight'),
  createTableHeadCells('اهرم', 'leverage_display'),
  createTableHeadCells('سود/زیان', 'current_profit_loss'),
  createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

const queryNames = [
  {
    field: 'status',
    label: 'وضعیت',
    type: 'choice',
    choice: [
      { id: 'PENDING', label: 'در انتظار' },
      { id: 'OPEN', label: 'باز' },
      { id: 'CLOSED', label: 'بسته شده' },
      { id: 'CANCELLED', label: 'لغو شده' },
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

export function MarginTradeList({
  resource,
  title,
}: {
  resource: string
  title: string
}) {
  const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useState<{
    total_results: number
    data: MarginTradeType[]
  }>({
    total_results: 0,
    data: [],
  })

  const dispatch = useDispatch()

  const getOrders = async () => {
    setLoading(true)

    try {
      const response = await DataProvider.get<{
        total_results: number
        results: MarginTradeType[]
      }>(`${resource}/`, search)

      if (response) {
        setOrders({
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
    getOrders()
  }, [search])

  return (
    <ListPage
      header={title}
      href={resource + '/create'}
      searchField="username"
      searchText="شماره تلفن"
      setParams={setSearch}
      params={search}
      resource={resource}
      getList={getOrders}
      filtersData={queryNames}
      noCreate
      defaultState={{
        status: '',
        username: '',
      }}
    >
      <CustomTable
        resource={resource}
        headCells={tableHeadCells}
        rows={orders.data}
        count={orders.total_results}
        getList={getOrders}
        params={search}
        setParams={setSearch}
        handleSort={getOrders}
        loading={loading}
        hasDetail
        tableBodyCells={orders.data.map((item) => (
          <React.Fragment key={item.id}>
            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.id}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.user_full_name}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.user_mobile}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.order_type_display}
              </Typography>
            </TableCell>

            <TableCell>
              <Chip
                label={item.status_display}
                color={item.status === 'ACTIVE' ? 'success' :'error'}
                size="small"
              />
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.weight} گرم
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.leverage_display}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {formatPrice(Number(item.current_profit_loss))}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'nowrap' }}
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