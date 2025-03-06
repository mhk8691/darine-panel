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
import {AccountCategoryType} from '../AccountCategory'
import {AccountCategoryCreate} from '../Create/AccountCategoryCreate'

const RECOURCE = 'account-category'
const tableHeadCells = [createTableHeadCells('نام', 'name'), createTableHeadCells('تصویر', 'image')]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function AccountCategoryList() {
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)
    const [accountCategory, setAccountCategory] = useState<{
        data: AccountCategoryType[]
        count: number
    }>({
        data: [
            {
                id: 1,
                name: 'category 1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
            {
                id: 2,
                name: 'category 2',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
        ],
        count: 0,
    })
    const getCategories = async () => {
        setLoading(true)
        let response = await DataProvider.get<AccountCategoryType[]>(RECOURCE, search)
        if (response) {
            setAccountCategory({data: response.data, count: response.data.length})
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getCategories()
    }, [search])

    return (
        <ListPage
            header="مدیریت دسته بندی اکانت ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getCategories}
            filtersData={queryNames}
            createModal={AccountCategoryCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={accountCategory.data}
                count={2}
                deleteName="name of deleting"
                getList={getCategories}
                params={search}
                setParams={setSearch}
                handleSort={getCategories}
                loading={loading}
                hasDetail={true}
                tableBodyCells={accountCategory.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box
                                component={'img'}
                                src={typeof item.image === 'string' ? item.image : ''}
                                sx={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                            />
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
