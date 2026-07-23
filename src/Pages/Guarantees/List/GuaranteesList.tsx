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
import { GuaranteesStatusType, GuaranteesType } from '../Guarantees'

const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('شماره تلفن', 'user_mobile'),
    createTableHeadCells('نام کاربر', 'user_full_name'),
    createTableHeadCells('نام طرح', 'plan_name'),
    createTableHeadCells('وزن طلا', 'gold_weight'),
    createTableHeadCells('قیمت گارانتی', 'guaranteed_price'),
    createTableHeadCells('کارمزد', 'service_fee'),
    createTableHeadCells('زمان باقیمانده', 'days_remaining'),
    createTableHeadCells('وضعیت', 'status'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            { id: 'ACTIVE', label: 'فعال' },
            { id: 'CANCELLED', label: 'لغو شده' },
            { id: 'EXPIRED', label: 'منقضی شده' },
            { id: 'EXECUTED', label: 'اجرا شده' },
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

export const guaranteeStatusCalc = (status: GuaranteesStatusType) => {
    switch (status) {
        case 'CANCELLED':
            return 'error'
        case 'ACTIVE':
            return 'success'
        case 'EXPIRED':
            return 'warning'
        case 'EXECUTED':
            return 'info'
        default:
            return 'primary'
    }
}

export function GuaranteesList({
    resource,
    title,
}: {
    resource: string
    title: string
}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [guarantees, setGuarantees] = useState<{
        total_results: number
        data: GuaranteesType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getGuarantees = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: GuaranteesType[]
            }>(`${resource}/`, search)

            if (response) {
                setGuarantees({
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
        getGuarantees()
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
            getList={getGuarantees}
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
                rows={guarantees.data}
                count={guarantees.total_results}
                getList={getGuarantees}
                params={search}
                setParams={setSearch}
                handleSort={getGuarantees}
                loading={loading}
                hasDetail={true}
                noDelete
                tableBodyCells={guarantees.data.map((item) => (
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
                                {item.user_mobile}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.user_full_name || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.plan_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.gold_weight} گرم
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {formatPrice(Number(item.guaranteed_price))} 
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {formatPrice(Number(item.service_fee))} 
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.days_remaining} روز
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Chip
                                label={item.status_display}
                                color={guaranteeStatusCalc(item.status)}
                                size="small"
                            />
                        </TableCell>

                 
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}