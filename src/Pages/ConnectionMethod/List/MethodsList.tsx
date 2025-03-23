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
import {MethodCreate} from '../Create/MethodCreate'
import {MethodType} from '../Method'
const RECOURCE = 'account/base-accounts'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('تعداد فیلد', 'fields_count'),
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
    }>({
        data: [],
    })
    const getMethods = async () => {
        setLoading(true)
        let response = await DataProvider.get<{
            results: MethodType[]
        }>(`${RECOURCE}/`, search)
        if (response) {
            setMethods({
                data: response.data.results,
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
            href={'base-accounts' + '/create'}
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
                count={0}
                deleteName="name of deleting"
                getList={getMethods}
                hasDetail={true}
                params={search}
                setParams={setSearch}
                handleSort={getMethods}
                loading={loading}
                tableBodyCells={methods.data.map((item) => (
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
                                {item.title}
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
                                {item.fields_count}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction={'column'} gap={1.5}>
                                {item.fields.map((field) => (
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>
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
                                            نام: {field.title}
                                        </Typography>
                                        |
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
                                            لیبل: {field.description}
                                        </Typography>
                                        |
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
