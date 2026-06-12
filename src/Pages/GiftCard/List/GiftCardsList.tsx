import React, {useState} from 'react'
import TableCell from '@mui/material/TableCell'
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
import { GiftCardType } from '../GiftCards'
import { Chip } from '@mui/material'


const RECOURCE = 'gift-cards'

const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('شماره سریال', 'serial_number'),
    createTableHeadCells('وزن', 'weight'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('ایجاد کننده', 'created_by_name'),
    createTableHeadCells('فعال کننده', 'activated_by_name'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            {id: 'ACTIVE', label: 'فعال'},
            {id: 'USED', label: 'استفاده شده'},
       
        ],
    },
    {
          field: 'activated_by_name',
    label: 'شماره تلفن فعال کننده',
    type: '',
    },
    {
          field: 'serial_number',
    label: 'شماره سریال',
    type: '',
    }
  
]



export function GiftCardsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [orders, setOrders] = useState<{
        total_results: number
        data: GiftCardType[]
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
                results: GiftCardType[]
            }>(`${RECOURCE}/`, search)

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
             header="مدیریت کارت هدیه"
            href={RECOURCE + '/create'}
            searchField="username"
            searchText="شماره تلفن مشتری"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getOrders}
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
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={orders.data}
                count={orders.total_results}
                getList={getOrders}
                params={search}
                setParams={setSearch}
                handleSort={getOrders}
                noDelete
                loading={loading}
                hasDetail={true}
                tableBodyCells={orders.data.map((item) => (
              <React.Fragment key={item.id}>
    <TableCell>{item.id}</TableCell>

    <TableCell>{item.serial_number}</TableCell>

    <TableCell>{item.weight} گرم</TableCell>

    <TableCell>
        <Chip
            label={item.status === 'ACTIVE' ? 'فعال' : 'استفاده شده'}
            color={item.status === 'ACTIVE' ? 'success' : 'default'}
            size="small"
        />
    </TableCell>


    <TableCell>{item.created_by_name}</TableCell>

    <TableCell>
        {item.activated_by_name || '—'}
    </TableCell>

    <TableCell>
        {formatDate(item.created_at)}
    </TableCell>
</React.Fragment>
                ))}
            />
        </ListPage>
    )
}