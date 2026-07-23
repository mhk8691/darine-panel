import { Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import { GuaranteePlansType } from '../GuaranteePlans'
import { GuaranteePlansCreate } from '../Create/GuaranteePlansCreate'

const RECOURCE = 'gold-guarantee-plans'
const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('مدت زمان', 'duration_days'),
    createTableHeadCells('درصد کارمزد', 'service_fee_percent'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('تعداد تضمین', 'guarantee_count'),
    createTableHeadCells('تعداد تضمین فعال', 'active_guarantee_count'),

    
]

export function GuaranteePlansList() {
    const [plans, setPlans] = useState<{
        total_results: number
        data: GuaranteePlansType[]
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
            let response = await DataProvider.get<{
                total_results: number
                results: GuaranteePlansType[]
            }>(RECOURCE, search)
            if (response) {
                setPlans({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getPlans()
    }, [search])

    return (
        <ListPage
            header="مدیریت طرح ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getPlans}
            filtersData={[]}
            createModal={GuaranteePlansCreate}
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
                tableBodyCells={plans.data.map((item, index) => (
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.service_fee_percent}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.description}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.guarantee_count}
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
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.active_guarantee_count}
                            </Typography>
                        </TableCell>
                     
                    </>
                ))}
            />
        </ListPage>
    )
}
