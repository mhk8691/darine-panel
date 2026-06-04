import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {getBankInfoWithCardNumber} from 'ir-banks-info'
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
import {CardType} from '../GoldCard'
import {GoldCardCreate} from '../Create/GoldCardCreate'
const RECOURCE = 'gold-card'
const tableHeadCells = [
    createTableHeadCells('نام خانوادگی', 'full_name'),
    createTableHeadCells('بانک', 'bank'),
    createTableHeadCells('شماره کارت', 'card_number'),
    createTableHeadCells('شماره شبا', 'iban'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
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

export function GoldCardList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [card, setCard] = useState<{
        total_results: number
        data: CardType[]
    }>({
        total_results: 0,
        data: [],
    })
    const dispatch = useDispatch()
    const getCard = async () => {
        setLoading(true)
        try {
            let response = await DataProvider.get<{
                total_results: number
                results: CardType[]
            }>(`gold-bank/`, search)
            if (response) {
                setCard({
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
        getCard()
    }, [search])

    return (
        <ListPage
        header='مدیریت کارت های بانکی'
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getCard}
            filtersData={queryNames}
            createModal={GoldCardCreate}
            defaultState={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                phoneNumber: '',
            }}
        >
            <CustomTable
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={card.data}
                count={card.total_results}
                getList={getCard}
                params={search}
                setParams={setSearch}
                handleSort={getCard}
                loading={loading}
                hasDetail={true}
                tableBodyCells={card.data.map((item) => (
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
                                {item.full_name}
                            </Typography>
                        </TableCell>
                        {item.card_number && (
                            <TableCell sx={{display:'flex',alignItems:'center',gap:1}}>
                                <img
                                    style={{width: '40px', height: '40px'}}
                                    src={getBankInfoWithCardNumber(item.card_number)?.logo}
                                    alt=""
                                />
                                <Typography variant="body2" >
                                    {getBankInfoWithCardNumber(item.card_number)?.name}
                                </Typography>
                            </TableCell>
                        )}

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
                                {item.card_number}
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
                                {item.sheba}
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
                    </>
                ))}
            />
        </ListPage>
    )
}
