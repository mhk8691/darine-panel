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
import { formatPrice } from '../../../Core/FormatPrice'
import { createQueryParam } from '../../../Core/QueryParams'
import { setUtil } from '../../../redux/UtilSlice'
import { InvestmentsStatusType, InvestmentsType } from '../Investments'

const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('شماره تلفن', 'user_mobile'),
    createTableHeadCells('نام کاربر', 'user_full_name'),
    createTableHeadCells('نام طرح', 'plan_name'),
    createTableHeadCells('مدت طرح', 'plan_duration_months'),
    createTableHeadCells('وزن طلا', 'gold_weight'),
    createTableHeadCells('قیمت سرمایه‌گذاری', 'investment_price'),
    createTableHeadCells('ماه باقی‌مانده', 'remaining_months'),
    createTableHeadCells('وضعیت', 'status'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            { id: 'ACTIVE', label: 'فعال' },
            { id: 'COMPLETED', label: 'تکمیل شده' },
            { id: 'CANCELLED', label: 'لغو شده' },
        ],
    },
    {
        field: 'user_mobile',
        label: 'شماره تلفن',
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

export const investmentStatusCalc = (status: InvestmentsStatusType) => {
    switch (status) {
        case 'ACTIVE':
            return 'success'
        case 'COMPLETED':
            return 'info'
        case 'CANCELLED':
            return 'error'
        default:
            return 'primary'
    }
}

export function InvestmentsList({
    resource,
    title,
}: {
    resource: string
    title: string
}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [investments, setInvestments] = useState<{
        total_results: number
        data: InvestmentsType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getInvestments = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: InvestmentsType[]
            }>(`${resource}/`, search)

            if (response) {
                setInvestments({
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
        getInvestments()
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
            getList={getInvestments}
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
                rows={investments.data}
                count={investments.total_results}
                getList={getInvestments}
                params={search}
                setParams={setSearch}
                handleSort={getInvestments}
                loading={loading}
                hasDetail={true}
                noDelete
                tableBodyCells={investments.data.map((item) => (
                    <React.Fragment key={item.id}>
                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.id}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.user_mobile}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.user_full_name || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.plan_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.plan_duration_months} ماه
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.gold_weight} گرم
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {formatPrice(Number(item.investment_price))}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                {item.remaining_months} ماه
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={item.status_display}
                                color={investmentStatusCalc(item.status)}
                                size="small"
                            />
                        </TableCell>
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}