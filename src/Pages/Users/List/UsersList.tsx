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
const RECOURCE = 'users'
const tableHeadCells = [
    createTableHeadCells('نام', 'first_name'),
    createTableHeadCells('نام خانوادگی', 'last_name'),
    createTableHeadCells('ایمیل', 'email'),
    createTableHeadCells('نام کاربری', 'username'),
    createTableHeadCells('شماره تلفن', 'phone_number'),
    createTableHeadCells('نقش کاربر', 'role'),
    createTableHeadCells('تصویر پروفایل', 'image'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function UsersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [users, setUsers] = useState<{
        total_results: number
        data: UsersType[]
    }>({
        total_results: 0,
        data: [
            {
                id: 1,
                first_name: 'ali',
                last_name: 'mmdi',
                phone_number: '09126320520',
                role: 'admin',
                profile_picture:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
            {
                id: 2,
                first_name: 'amir',
                last_name: 'mmdi',
                phone_number: '09126320520',
                role: 'user',
                profile_picture:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
        ],
    })
    const getUsers = async () => {
        setLoading(true)
        let response = await DataProvider.get<{
            total_results: number
            results: UsersType[]
        }>(`${RECOURCE}/list`, search)
        if (response) {
            setUsers({
                total_results: response.data.total_results,
                data: response.data.results,
            })
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
            searchText="نام کاربری"
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
                deleteName="name of deleting"
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
                                {item.phone_number}
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
                                {item.role}
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
                                        : ''
                                }
                                borderRadius={2}
                            />
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
