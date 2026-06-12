import { Typography} from '@mui/material'
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

const RECOURCE = 'categories'
const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('نام لاتین', 'slug'),
]

export function CategoriesList() {
    const [categories, setCategories] = useState<{
        total_results: number
        data: CategoriesType[]
    }>({
        total_results: 0,
        data: [],
    })
 
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getCategories = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: CategoriesType[]
            }>(`categories/`, search)
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
            href={'category' + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getCategories}
            filtersData={[]}
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
                                {item.id}
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
                                {item.slug}
                            </Typography>
                        </TableCell>
                     
                    </>
                ))}
            />
        </ListPage>
    )
}
