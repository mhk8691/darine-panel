import { Chip, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'
import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { DataProvider } from '../../../Core/DataProvider'
import { createQueryParam } from '../../../Core/QueryParams'
import { setUtil } from '../../../redux/UtilSlice'
import { useDispatch } from 'react-redux'
import { InvestmentPlansCreate } from '../Create/InvestmentPlansCreate'
import { InvestmentPlansType } from '../InvestmentPlans'
import { guaranteeStatusCalc } from '../../Guarantees/List/GuaranteesList'

const RECOURCE = 'gold-investment-plans'

const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('مدت (روز)', 'duration_months'),
    createTableHeadCells('سود ماهانه', 'monthly_profit_percent'),
    createTableHeadCells('سود کل', 'total_profit_percent'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('وضعیت', 'status'),

    createTableHeadCells('تعداد سرمایه‌گذاری', 'investment_count'),
    createTableHeadCells('سرمایه‌گذاری فعال', 'active_investment_count'),
    createTableHeadCells('مجموع طلای سرمایه‌گذاری شده', 'total_invested_gold'),
]

export function InvestmentPlansList() {
    const [plans, setPlans] = useState<{
        total_results: number
        data: InvestmentPlansType[]
    }>({
        total_results: 0,
        data: [],
    })

    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const getPlans = async () => {
        setLoading(true)
        try {
            const response = await DataProvider.get<{
                total_results: number
                results: InvestmentPlansType[]
            }>(RECOURCE, search)

            if (response) {
                setPlans({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({ open: true, message: error.message, severity: 'error' }))
        }

        setLoading(false)
    }

    useDeepCompareEffect(() => {
        getPlans()
    }, [search])

    return (
        <ListPage
            header="مدیریت طرح‌های سرمایه‌گذاری"
            href={RECOURCE + '/create'}
            searchField="name"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getPlans}
            filtersData={[]}
            createModal={InvestmentPlansCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={plans.data}
                count={plans.total_results}
                getList={getPlans}
                params={search}
                setParams={setSearch}
                handleSort={getPlans}
                loading={loading}
                hasDetail={true}
                tableBodyCells={plans.data.map((item) => (
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.id}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.name}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.duration_days}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.monthly_profit_percent}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.total_profit_percent}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.description}
                            </Typography>
                        </TableCell>
                          <TableCell>
                                                    <Chip
                                                        label={item.is_active ? 'فعال':'غیرفعال'}
                                                        color={item.is_active ? 'success' : 'error'}
                                                        size="small"
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.investment_count}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.active_investment_count}
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
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                {item.total_invested_gold}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}