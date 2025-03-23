import {Box, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {ProductCreate} from '../Create/ProductCreate'
import {ProductsType} from '../Products'

const RECOURCE = 'product'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('معرفی محصول', 'introduction'),
    createTableHeadCells('روش اتصال', 'connection_method'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('دسته بندی', 'category'),
    createTableHeadCells('ویژگی ها', 'properties'),
    createTableHeadCells('قیمت', 'price'),
    createTableHeadCells('تصویر', 'image'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function ProductsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<{
        data: ProductsType[]
    }>({
        data: [],
    })
    const getProducts = async () => {
        setLoading(true)
        let response = await DataProvider.get<{
            results: ProductsType[]
        }>(`${RECOURCE}/`, search)

        if (response) {
            setProducts({
                data: response.data.results,
            })
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getProducts()
    }, [search])

    return (
        <ListPage
            header="مدیریت محصولات"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="محصول"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getProducts}
            filtersData={queryNames}
            createModal={ProductCreate}
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
                rows={products.data}
                count={0}
                deleteName="name of deleting"
                getList={getProducts}
                params={search}
                setParams={setSearch}
                handleSort={getProducts}
                loading={loading}
                hasDetail={true}
                tableBodyCells={products.data.map((item, index) => (
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
                                {item.short_introduction}
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
                                {item.connectionMethod}
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
                                }}
                            >
                                {item.category}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction={'column'} gap={1.5}>
                                {item?.properties?.map((property) => (
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
                                            نام: {property.name}
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
                                            مقدار: {property.value}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
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
                                {item.base_price}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box
                                component={'img'}
                                src={typeof item.picture === 'string' ? item.picture : ''}
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
