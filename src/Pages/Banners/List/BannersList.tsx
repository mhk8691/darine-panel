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
import {BannersType} from '../Banners'
import {BannerCreate} from '../Create/BannerCreate'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'

const tableHeadCells = [
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('لینک', 'url'),
    createTableHeadCells('وضعیت', 'active'),
    createTableHeadCells('تصویر', 'image'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
export function BannersList({resource}:{resource:string}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [banners, setBanners] = useState<{
        total_results: number
        data: BannersType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getBanners = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: BannersType[]
            }>(`${resource}/`, search)
            if (response) {
                setBanners({
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
        getBanners()
    }, [search])

    return (
        <ListPage
            header="مدیریت بنر ها"
            href={resource + '/create'}
            searchField="title"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getBanners}
            filtersData={queryNames}
            createModal={BannerCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                resource={resource}
                headCells={tableHeadCells}
                rows={banners.data}
                count={banners.total_results}
                getList={getBanners}
                params={search}
                setParams={setSearch}
                handleSort={getBanners}
                loading={loading}
                hasDetail={true}
                tableBodyCells={banners.data.map((item, index) => (
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
                                {item.title || '--'}
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
                                {item.url || '--'}
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
                                {item.active ? 'فعال' : 'غیر فعال'}
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
