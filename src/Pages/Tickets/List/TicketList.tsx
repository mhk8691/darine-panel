import { Typography, Button} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useEffect, useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import { formatDate } from '../../../Core/FormatDate'
import { PriorityType, TicketType, TikcetStatusType } from '../Ticket'
import axios from 'axios'
import { UsersType } from '../../Users/Users'
import TicketStatistics from '../TicketStatistics'

const RECOURCE = 'tickets'
const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('کد پیگیری', 'tracking_code'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('دسته‌بندی', 'category_name'),
    createTableHeadCells('کاربر', 'user_full_name'),
    createTableHeadCells('شماره موبایل', 'user_mobile'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('اولویت', 'priority'),
    createTableHeadCells('پیام خوانده نشده', 'unread_admin_count'),
    createTableHeadCells('آخرین فعالیت', 'last_activity_at'),
    createTableHeadCells('عملیات', 'action'),

]
const statusLabel: Record<TikcetStatusType, string> = {
    in_progress: 'در حال بررسی',
    answered: 'پاسخ داده شده',
    resolved: 'حل شده',
    closed: 'بسته شده',
    pending:'درانتظار',
    open:'باز'
}

const statusColor: Record<TikcetStatusType, string> = {
    in_progress: '#AB47BC',
    answered: 'secondary.main',
    resolved: '#66BB6A',
    closed: 'text.disabled',
    pending:'#42A5F5',
    open:'#FFB300'
}

export const priorityLabel: Record<PriorityType, string> = {
    low: 'کم',
    medium: 'متوسط',
    high: 'زیاد',
    urgent: 'فوری',
}

const priorityColor: Record<PriorityType, string> = {
    low: 'success.main',
    medium: 'warning.main',
    high: 'error.main',
    urgent: 'error.dark',
}

export function TicketList() {
    const [ticket, setTicket] = useState<{
        total_results: number
        data: TicketType[]
    }>({
        total_results: 0,
        data: [],
    })
 
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)
    const [profile,setProfile] = useState<UsersType>({} as UsersType)
    const dispatch = useDispatch()
    const getTicket = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: TicketType[]
            }>(`tickets/`, search)
            if (response) {
                setTicket({
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
        getTicket()
    }, [search])
    const getProfile = async () => {
            try {
                const response = await axios.get(
                    `https://api.darine.shop/accounts/profile/`,
                    { withCredentials: true }
                );
    
                setProfile(response.data.data);
            } catch (error:any) {
                dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
            }
        };
    useEffect(()=>{
           getProfile()

    },[])
    const AssignToMe = async ()=>{
        try {
            let response = await DataProvider.post(`tickets/${profile.id}/assign_to_me/`, search)
            dispatch(setUtil({open: true, message: response.message, severity: 'success'}))
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
    }

    return (
        <>
        <TicketStatistics  />
        <ListPage
            header="مدیریت دسته بندی تیکت ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getTicket}
            filtersData={[]}
            noCreate
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={ticket.data}
                count={ticket.total_results}
                getList={getTicket}
                params={search}
                setParams={setSearch}
                handleSort={getTicket}
                loading={loading}
                hasDetail={true}
                tableBodyCells={ticket.data.map((item) => (
    <>
        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.id}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.tracking_code}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.title}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.category_name}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.user_full_name}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.user_mobile}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography
                variant="body2"
                fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}
                sx={{
                    color: statusColor[item.status],
                    whiteSpace: 'nowrap',
                }}
            >
                {statusLabel[item.status]}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography
                variant="body2"
                fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}
                sx={{
                    color: priorityColor[item.priority],
                    whiteSpace: 'nowrap',
                }}
            >
                {priorityLabel[item.priority]}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {item.unread_admin_count}
            </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="body2" fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}>
                {formatDate(item.last_activity_at)}
            </Typography>
        </TableCell>
         <TableCell>
            <Button variant="outlined" color="primary" onClick={AssignToMe} sx={{
                 whiteSpace: 'nowrap',
            }}>
              اختصاص تیکت
            </Button>
        </TableCell>
    </>
))}
            />
        </ListPage>
        </>
    )
}
