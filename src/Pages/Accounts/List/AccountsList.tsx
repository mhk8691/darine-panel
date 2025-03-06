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
import {AccountsType} from '../Accounts'
import {AccountCreate} from '../Create/AccountCreate'
const RECOURCE = 'accounts'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('معرفی محصول', 'introduction'),
    createTableHeadCells('روش اتصال', 'connection_method'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('دسته بندی', 'category'),
    createTableHeadCells('قیمت', 'price'),
    createTableHeadCells('تصویر', 'image'),
    createTableHeadCells('ویدئو', 'video'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function AccountsList() {
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState<{data: AccountsType[]; count: number}>({
        data: [
            {
                id: 1,
                name: 'جم کلش',
                introduction: 'تست',
                connectionMethod: 'ایمیل',
                description: 'تست',
                price: 300000,
                category: 'clash of clans',

                images: [
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
                ],
            },
            {
                id: 2,
                name: 'سی پی کالاف',
                introduction: 'تست',
                connectionMethod: 'فیسبوک',
                description: 'تست',
                price: 400000,
                category: 'clash of clans',
                images: [
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
                ],
            },
        ],
        count: 0,
    })
    const getAccounts = async () => {
        setLoading(true)
        let response = await DataProvider.get<AccountsType[]>(RECOURCE, search)
        if (response) {
            setAccounts({data: response.data, count: response.data.length})
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getAccounts()
    }, [search])

    return (
        <ListPage
            header="مدیریت اکانت ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="اکانت"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getAccounts}
            filtersData={queryNames}
            createModal={AccountCreate}
            defaultState={{
                name: '',
                introduction: '',
                connection_method: '',
                description: '',
                price: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={accounts.data}
                count={2}
                deleteName="name of deleting"
                getList={getAccounts}
                params={search}
                setParams={setSearch}
                handleSort={getAccounts}
                loading={loading}
                hasDetail={true}
                tableBodyCells={accounts.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.introduction}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.connectionMethod}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.description}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.category}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontSize={'15px'}>
                                {item.price}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {typeof item.images[0] === 'string' ? (
                                <Box
                                    component={'img'}
                                    src={item.images[0]}
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <span>--</span>
                            )}
                        </TableCell>

                        <TableCell>
                            {item.video ? (
                                <Box
                                    component={'video'}
                                    src={typeof item.video === 'string' ? item.video : ''}
                                    controls
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <span>--</span>
                            )}
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
