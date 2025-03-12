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
import {PaginatedResponse, PaginationType} from '../../../Core/types'
const RECOURCE = 'users'
const tableHeadCells = [
    createTableHeadCells('نام', 'first_name'),
    createTableHeadCells('نام خانوادگی', 'last_name'),
    createTableHeadCells('ایمیل', 'email'),
    createTableHeadCells('نام کاربری', 'username'),
    createTableHeadCells('شماره تلفن', 'phone_number'),
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
        data: UsersType[]
        pagination: PaginationType
        count: number
    }>({
        data: [
            {
                id: 1,
                firstName: 'ali',
                lastName: 'mmdi',
                username: 'ali',
                email: 'ali@gmail.com',
                phoneNumber: '09126320520',
                image:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
            {
                id: 2,
                firstName: 'amir',
                lastName: 'mmdi',
                username: 'amir',
                email: 'amir@gmail.com',
                phoneNumber: '09126320520',
                image:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
        ],
        pagination: {} as PaginationType,
        count: 0,
    })
    const getUsers = async () => {
        setLoading(true)
        let response = await DataProvider.get<PaginatedResponse<UsersType[]>>(
            `${RECOURCE}/list`,
            search,
        )
        if (response) {
            setUsers({
                data: response.data.results,
                pagination: response.data.pagination,
                count: response.data.pagination.pages * response.data.results.length,
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
                count={users.count}
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
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.firstName}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.lastName}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.email}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.username}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.phoneNumber}
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
                                src={typeof item?.image === 'string' ? item?.image : ''}
                                borderRadius={2}
                            />
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
