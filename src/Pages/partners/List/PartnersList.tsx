import React, {useState} from 'react'
import TableCell from '@mui/material/TableCell'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import { Typography } from '@mui/material'



const tableHeadCells = [
    createTableHeadCells('آیدی', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('شماره تلفن', 'mobile'),
    createTableHeadCells('توضیحات', 'description'),
]

const queryNames = [
    {
        field: 'status',
        label: 'وضعیت',
        type: 'choice',
        choice: [
            {id: 'PENDING', label: 'در انتظار'},
            {id: 'WAITING_FOR_APPROVAL', label: 'در انتظار تایید'},
            {id: 'PROCESSING', label: 'در حال پردازش'},
            {id: 'COMPLETED', label: 'تکمیل شده'},
            {id: 'CANCELED', label: 'لغو شده'},
        ],
    },
    {
        field: 'start_date',
        label: 'تاریخ شروع',
        type: 'date',
    },
    {
        field: 'end_date',
        label: 'تاریخ پایان',
        type: 'date',
    },
]

export type PartnersType = {
  id: number
  full_name:string
  mobile:string
  description:string  
}

const resource = 'partners'
export function PartnersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [partners, setPartners] = useState<{
        total_results: number
        data: PartnersType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getPartners = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: PartnersType[]
            }>(`${resource}/`, search)

            if (response) {
                setPartners({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                })
            )
        }

        setLoading(false)
    }

    useDeepCompareEffect(() => {
        getPartners()
    }, [search])

    return (
        <ListPage
             header={'مدیریت درخواست همکاری'}
            href={resource + '/create'}
            searchField="username"
            searchText="نام کاربری"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={getPartners}
            filtersData={queryNames}
            noCreate={true}
            defaultState={{
                status: '',
                username: '',
                createdAt: '',
                products: [
                    {
                        name: '',
                        price: 0,
                        image: '',
                    },
                ],
            }}
        >
            <CustomTable
                resource={resource}
                headCells={tableHeadCells}
                rows={partners.data}
                count={partners.total_results}
                getList={getPartners}
                params={search}
                setParams={setSearch}
                handleSort={getPartners}
                loading={loading}
                hasDetail={true}
                noDelete
                tableBodyCells={partners.data.map((item) => (
                    <React.Fragment key={item.id}>
                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.id}
                            </Typography>
                        </TableCell>

                        

                        

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.full_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                               {item.mobile}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                sx={{whiteSpace: 'nowrap'}}
                            >
                                {item.description}
                            </Typography>
                        </TableCell>

                  
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}