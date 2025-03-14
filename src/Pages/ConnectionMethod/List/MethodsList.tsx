import {Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {PaginatedResponse, PaginationType} from '../../../Core/types'
import {MethodCreate} from '../Create/MethodCreate'
import {MethodType} from '../Method'
const RECOURCE = 'connection-methods'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('فیلد ها', 'fields'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function MethodsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [methods, setMethods] = useState<{
        data: MethodType[]
        pagination: PaginationType
        count: number
    }>({
        data: [
            {
                id: 1,
                name: 'فیسبوک',
                fields: [
                    {label: 'ایمیل', name: 'email', type: 'text', id: 1},
                    {label: 'رمز عبور', name: 'password', type: 'password', id: 2},
                ],
            },
        ],
        pagination: {} as PaginationType,
        count: 0,
    })
    const getMethods = async () => {
        setLoading(true)
        let response = await DataProvider.get<PaginatedResponse<MethodType[]>>(
            `${RECOURCE}/list`,
            search,
        )
        if (response) {
            setMethods({
                data: response.data.results,
                pagination: response.data.pagination,
                count: response.data.pagination.pages * response.data.results.length,
            })
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getMethods()
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
            getList={getMethods}
            filtersData={queryNames}
            createModal={MethodCreate}
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
                rows={methods.data}
                count={methods.count}
                deleteName="name of deleting"
                getList={getMethods}
                params={search}
                setParams={setSearch}
                handleSort={getMethods}
                loading={loading}
                hasDetail={true}
                tableBodyCells={methods.data.map((item) => (
                    <>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction={'column'} gap={1.5}>
                                {item.fields.map((field) => (
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                                        <Typography variant="body2" fontSize={'15px'}>
                                            نام: {field.name}
                                        </Typography>
                                        |
                                        <Typography variant="body2" fontSize={'15px'}>
                                            لیبل: {field.label}
                                        </Typography>
                                        |
                                        <Typography variant="body2" fontSize={'15px'}>
                                            تایپ: {field.type}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
