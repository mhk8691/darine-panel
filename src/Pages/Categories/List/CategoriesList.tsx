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
import {CategoriesType} from '../Categories'
import {CategoryCreate} from '../Create/CategoryCreate'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'

const RECOURCE = 'category'
const tableHeadCells = [
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('دسته بندی والد', 'parent'),
    createTableHeadCells('تعداد محصولات', 'products_count'),
    createTableHeadCells('تعداد زیر دسته بندی', 'children_count'),
    createTableHeadCells('تصویر', 'thumbnail'),
]
const queryNames = tableHeadCells.slice(1, 2).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function CategoriesList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<{
        total_results: number
        data: CategoriesType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getCategories = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: CategoriesType[]
            }>(`${RECOURCE}/`, search)
            if (response) {
                setCategories({
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
        getCategories()
    }, [search])

    return (
        <ListPage
            header="مدیریت دسته بندی ها"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getCategories}
            filtersData={queryNames}
            createModal={CategoryCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={categories.data}
                count={categories.total_results}
                getList={getCategories}
                params={search}
                setParams={setSearch}
                handleSort={getCategories}
                loading={loading}
                hasDetail={true}
                tableBodyCells={categories.data.map((item, index) => (
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
                                {item.parent || '--'}
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
                                {item.products_count}
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
                                {item.children_count}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box
                                component={'img'}
                                src={typeof item.thumbnail === 'string' ? item.thumbnail : ''}
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
