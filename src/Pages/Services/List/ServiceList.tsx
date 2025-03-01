import {Typography} from '@mui/material'
import {useState} from 'react'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {DataProvider} from '../../../Core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {ListPage} from '../../../Components/Table/ListPage'
import {useQueryParams} from 'use-query-params'
import {ServiceType} from '../Service'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {ServiceCreate} from '../Create/ServiceCreate'
import {createQueryParam} from '../../../Core/QueryParams'

const RECOURCE = 'services'

export function ServiceList() {
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState<{data: ServiceType[]; count: number}>({
        data: [],
        count: 0,
    })
    const getServices = async () => {
        setLoading(true)
        let response = await DataProvider.get<ServiceType[]>(RECOURCE, search)
        if (response) {
            setServices({data: response.data, count: response.data.length})
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getServices()
    }, [search])
    const tableHeadCells = [
        createTableHeadCells('Type', 'type'),
        createTableHeadCells('Title', 'title'),
        createTableHeadCells('Description', 'description'),
    ]

    return (
        <ListPage
            header="Services"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="title"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getServices}
            filtersData={[{field: 'title', label: 'Username', type: ''}]}
            createModal={ServiceCreate}
            defaultState={{
                title: '',
                type: '',
                description: '',
                html: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={[
                    {id: 1, name: 'ali'},
                    {id: 2, name: 'amir'},
                ]}
                count={2}
                deleteName="name of deleting"
                getList={getServices}
                params={search}
                setParams={setSearch}
                handleSort={getServices}
                loading={loading}
                tableBodyCells={[
                    {id: 1, name: 'ali'},
                    {id: 2, name: 'amir'},
                ].map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
