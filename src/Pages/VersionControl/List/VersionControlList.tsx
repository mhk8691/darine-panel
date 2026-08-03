import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {VersionControlContainerType} from '../VersionControl'
import {VersionControlCreate} from '../Create/VersionControlCreate'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import { formatDate } from '../../../Core/FormatDate'

const RECOURCE = 'version-control'
const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('کد ورژن', 'version_code'),
    createTableHeadCells('نام ورژن', 'version_name'),
    createTableHeadCells('حداقل کد ورژن مورد نیاز', 'min_required_version_code'),
    createTableHeadCells('لینک استور', 'store_url'),
    createTableHeadCells('بروزرسانی اجباری', 'is_force_update'),
    createTableHeadCells('تاریخ انتشار', 'release_date'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

export function VersionControlList() {
    const [versions, setVersions] = useState<{
        total_results: number
        data: VersionControlContainerType[]
    }>({
        total_results: 0,
        data: [],
    })
 
    const [search, setSearch] = useQueryParams(createQueryParam())
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getVersions = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: VersionControlContainerType[]
            }>(`version-control/`, search)
            if (response) {
                setVersions({
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
        getVersions()
    }, [search])

    return (
        <ListPage
            header="مدیریت ورژن‌های اپلیکیشن"
            href={'version-control' + '/create'}
            searchField="version_name"
            searchText="نام ورژن"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getVersions}
            filtersData={[]}
            createModal={VersionControlCreate}
            defaultState={{
                version_code: 1,
                version_name: '',
                min_required_version_code: 1,
                update_message: '',
                release_notes: '',
                store_url: '',
                is_force_update: false,
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={versions.data}
                count={versions.total_results}
                getList={getVersions}
                params={search}
                setParams={setSearch}
                handleSort={getVersions}
                loading={loading}
                hasDetail={true}
                tableBodyCells={versions.data.map((item, index) => (
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
                                {item.version_code}
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
                                {item.version_name}
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
                                {item.min_required_version_code}
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
                                component={'a'}
                                href={item.store_url}
                                target='_blank'
                                className='App-link'
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.store_url}
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
                                {item.is_force_update ? 'بله' : 'خیر'}
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
                                {formatDate(item.release_date) || '--'}
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
                                {formatDate(item.created_at) || '--'}
                            </Typography>
                        </TableCell>
                    
                    </>
                ))}
            />
        </ListPage>
    )
}