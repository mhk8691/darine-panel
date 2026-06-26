import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import { OffsetType } from '../Offset'
import { formatPrice } from '../../../Core/FormatPrice'
import { OffsetCreate } from '../Create/OffsetCreate'
const tableHeadCells = [
    createTableHeadCells('مبلغ', 'offset_amount'),
    createTableHeadCells('وضعیت', 'is_active'),
    createTableHeadCells('ادمین', 'set_by_mobile'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
    createTableHeadCells('تاریخ ویرایش', 'updated_at'),

]
const queryNames = tableHeadCells.slice(2, 4).map((cell) => {
    if (cell.name === 'role')
        return {
            field: cell.name,
            label: cell.label,
            type: 'choice',
            choice: [
                {label: 'کاربر', id: 'user'},
                {label: 'ادمین', id: 'admin'},
                {label: 'سوپر ادمین', id: 'superadmin'},
            ],
        }
    else
        return {
            field: cell.name,
            label: cell.label,
            type: '',
            choice: [],
        }
})

export function OffsetList({resource,title}:{resource:string,title:string}) {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState<{
        total_results: number
        data: OffsetType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getOffset = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: OffsetType[]
            }>(resource, search)
            if (response) {
                setOffset({
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
        getOffset()
    }, [search])

    return (
        <ListPage
        header={title}
            href={'/'+resource+ '/create'}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getOffset}
            filtersData={queryNames}
            createModal={OffsetCreate}
            defaultState={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                phoneNumber: '',
            }}
        >
            <CustomTable
                resource={resource}
                headCells={tableHeadCells}
                rows={offset.data}
                count={offset.total_results}
                getList={getOffset}
                params={search}
                setParams={setSearch}
                handleSort={getOffset}
                loading={loading}
                hasDetail={true}
                tableBodyCells={offset.data.map((item) => (
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
                            >
                                {formatPrice(+item.offset_amount)} 
                            </Typography>
                        </TableCell>
                      <TableCell>
        <Chip
            label={item.is_active? 'فعال' : 'غیرفعال'}
            color={item.is_active? 'success' : 'error'}
            size="small"
        />
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
                            >
                                {item.set_by_mobile}
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
                            >
                                {formatDate(item.created_at)}
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
                            >
                                {formatDate(item.updated_at)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
