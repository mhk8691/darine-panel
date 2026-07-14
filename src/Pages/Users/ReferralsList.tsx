import { Box, TableCell, Typography } from '@mui/material'
import { useQueryParams } from 'use-query-params'

import { createQueryParam } from '../../Core/QueryParams'
import { ListPage } from '../../Components/Table/ListPage'
import { CustomTable } from '../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../Components/Table/CustomTableHead'
import { ReferralType } from './Users'

const tableHeadCells = [
  createTableHeadCells('نام کاربر', 'from_user_name'),
  createTableHeadCells('موبایل', 'from_user_mobile'),
  createTableHeadCells('نوع تراکنش', 'source_type'),
  createTableHeadCells('مبلغ تراکنش', 'transaction_amount'),
  createTableHeadCells('درصد کمیسیون', 'commission_percent'),
  createTableHeadCells('سود', 'profit'),
  createTableHeadCells('تاریخ', 'created_at'),
]

const queryNames = tableHeadCells.map((cell) => ({
  field: cell.name,
  label: cell.label,
  type: '',
  choice: [],
}))

export function ReferralsList({ users }: { users: ReferralType[] }) {
  const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

  return (
    <ListPage
    getList={()=>{}}
      header="لیست کمیسیون رفرال"
      href=""
      noCreate
      searchField="from_user_name"
      searchText="نام یا موبایل"
      setParams={setSearch}
      params={search}
      resource=""
      filtersData={queryNames}
      defaultState={{
        from_user_name: '',
        from_user_mobile: '',
        source_type: '',
      }}
    >
      <CustomTable
      count={users?.length}
      getList={()=>{}}
      handleSort={()=>{}}
      loading={false}
        groupEdit
        resource=""
        headCells={tableHeadCells}
        rows={users}
        params={search}
        setParams={setSearch}
        hasDetail={false}
        noDelete
        tableBodyCells={users?.map((item) => (
          <>
            <TableCell key={`name-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.from_user_name}
              </Typography>
            </TableCell>

            <TableCell key={`mobile-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.from_user_mobile}
              </Typography>
            </TableCell>

            <TableCell key={`type-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.source_type_raw || item.source_type}
              </Typography>
            </TableCell>

            <TableCell key={`amount-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.transaction_amount.toLocaleString('fa-IR')}
              </Typography>
            </TableCell>

            <TableCell key={`commission-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.commission_percent}%
              </Typography>
            </TableCell>

            <TableCell key={`profit-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.profit.toLocaleString('fa-IR')}
              </Typography>
            </TableCell>

            <TableCell key={`date-${item.id}`}>
              <Typography
                variant="body2"
                fontSize={{
                  xs: '13px',
                  sm: '14px',
                  md: '16px',
                  xl: '17px',
                }}
              >
                {item.created_at}
              </Typography>
            </TableCell>
          </>
        ))}
      />
    </ListPage>
  )
}