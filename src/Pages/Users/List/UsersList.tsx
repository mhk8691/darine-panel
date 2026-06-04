import {Box, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {UserCreate} from '../Create/UserCreate'
import {UsersType} from '../Users'
import {formatDate} from '../../../Core/FormatDate'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import userImage from '../../../Images/user.png'
const RECOURCE = 'users'
const tableHeadCells = [
    createTableHeadCells('نام', 'first_name'),
    createTableHeadCells('نام خانوادگی', 'last_name'),
    createTableHeadCells('شماره تلفن', 'phone_number'),
    createTableHeadCells('نقش کاربر', 'role'),
    createTableHeadCells('تصویر پروفایل', 'image'),
    createTableHeadCells('تاریخ عضویت', 'date_joined'),
]
const queryNames = tableHeadCells.slice(2, 4).map((cell) => {
    if (cell.name === 'role')
        return {
            field: cell.name,
            label: cell.label,
            type: 'choice',
            choice: [
                {label: 'کاربر', id: 'user'},
                {label: 'ادمین', id: 'admin'},
                {label: 'سوپر ادمین', id: 'superadmin'},
            ],
        }
    else
        return {
            field: cell.name,
            label: cell.label,
            type: '',
            choice: [],
        }
})
function formatRole(role: string) {
    switch (role) {
        case 'admin':
            return 'ادمین'
        case 'user':
            return 'کاربر'
        default:
            return 'سوپر ادمین'
    }
}
export function UsersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<{
        total_results: number
        data: UsersType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getUsers = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: UsersType[]
            }>(`${RECOURCE}/`, search)
            if (response) {
                setUsers({
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
        getUsers()
    }, [search])

    return (
        <ListPage
            header="مدیریت کاربران"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getUsers}
            filtersData={queryNames}
            createModal={UserCreate}
            defaultState={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                phoneNumber: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={users.data}
                count={users.total_results}
                getList={getUsers}
                params={search}
                setParams={setSearch}
                handleSort={getUsers}
                loading={loading}
                hasDetail={true}
                tableBodyCells={users.data.map((item) => (
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
                            >
                                {item.first_name}
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
                            >
                                {item.last_name}
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
                            >
                                {item.mobile}
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
                            >
                                {formatRole(item.role)}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box
                                component={'img'}
                                sx={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                                src={
                                    typeof item?.profile_picture === 'string'
                                        ? item?.profile_picture
                                        : userImage
                                }
                                borderRadius={2}
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
                            >
                                {formatDate(item.date_joined)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
