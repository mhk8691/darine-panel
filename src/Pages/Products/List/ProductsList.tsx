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
import {ProductCreate} from '../Create/ProductCreate'
import {ProductsType} from '../Products'
import {PaginatedResponse, PaginationType} from '../../../Core/types'

const RECOURCE = 'products'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('معرفی محصول', 'introduction'),
    createTableHeadCells('روش اتصال', 'connection_method'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('دسته بندی', 'category'),
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
        pagination: PaginationType
        count: number
    }>({
        data: [
            {
                id: 1,
                name: 'جم کلش',
                introduction: 'تست',
                connectionMethod: 'ایمیل',
                description: 'تست',
                price: 300000,
                category: 'clash of clans',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
            {
                id: 2,
                name: 'سی پی کالاف',
                introduction: 'تست',
                connectionMethod: 'فیسبوک',
                description: 'تست',
                price: 400000,
                category: 'clash of clans',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGnxtjv86apxKpSladFDE1SuUqmaACYvH6w&s',
            },
        ],
        pagination: {} as PaginationType,
        count: 0,
    })
    const getProdcuts = async () => {
        setLoading(true)
        let response = await DataProvider.get<PaginatedResponse<ProductsType[]>>(
            `${RECOURCE}/list`,
            search,
        )

        if (response) {
            setProducts({
                data: response.data.results,
                pagination: response.data.pagination,
                count: response.data.pagination.pages * response.data.results.length,
            })
        }
        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getProdcuts()
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
            getList={getProdcuts}
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
                count={products.count}
                deleteName="name of deleting"
                getList={getProdcuts}
                params={search}
                setParams={setSearch}
                handleSort={getProdcuts}
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
                                {item.introduction}
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
                                {item.price}
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
