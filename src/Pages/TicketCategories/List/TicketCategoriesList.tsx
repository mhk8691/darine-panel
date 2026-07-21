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
import { TicketCategoriesType } from '../TicketCategories'
import { TicketCategoriesCreate } from '../Create/TicketCategoriesCreate'
import { formatDate } from '../../../Core/FormatDate'

const RECOURCE = 'ticket-categories'
const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('نام لاتین', 'slug'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('وضعیت', 'is_active'),
    createTableHeadCells('تعداد تیکت', 'ticket_count'),
    createTableHeadCells('تاریخ', 'created_at'),

]

export function TicketCategoriesList() {
    const [ticketCategories, setTicketCategories] = useState<{
        total_results: number
        data: TicketCategoriesType[]
    }>({
        total_results: 0,
        data: [],
    })
 
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getTicketCategories = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: TicketCategoriesType[]
            }>(`ticket-categories/`, search)
            if (response) {
                setTicketCategories({
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
        getTicketCategories()
    }, [search])

    return (
        <ListPage
            header="مدیریت دسته بندی تیکت ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getTicketCategories}
            filtersData={[]}
            createModal={TicketCategoriesCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={ticketCategories.data}
                count={ticketCategories.total_results}
                getList={getTicketCategories}
                params={search}
                setParams={setSearch}
                handleSort={getTicketCategories}
                loading={loading}
                hasDetail={true}
                tableBodyCells={ticketCategories.data.map((item, index) => (
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
                                {item.slug}
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
                                    color:item.is_active ? 'success.main':'error.main'
                                }}
                            >
                                {item.is_active ? 'فعال':'غیر فعال'}
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
                                {item.ticket_count}
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
                                {formatDate(item.created_at)}
                            </Typography>
                        </TableCell>
                     
                    </>
                ))}
            />
        </ListPage>
    )
}
