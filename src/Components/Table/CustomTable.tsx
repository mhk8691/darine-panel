import { ArrowBack } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Checkbox, TableFooter, Typography } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, Stack } from '@mui/system'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataProvider } from '../../Core/DataProvider'
import { setUtil } from '../../redux/UtilSlice'
import { BaseModal } from '../Modal/BaseModal'
import { BlankList } from '../Pictures/BlankList'
import { CustomTableHead, HeadCellType } from './CustomTableHead'

export function CustomTable(props: {
    headCells: HeadCellType
    handleSort: () => void
    rows: any[]
    tableBodyCells: any
    loading: boolean
    setParams: any
    params: any
    count: number
    resource: string
    noEdit?: boolean
    noPagination?: boolean
    noDelete?: boolean
    getList: () => void
    hasDetail?: boolean
    groupEdit?: boolean
    selectedIds?: string[]
    onSelectionChange?: (ids: string[]) => void
}) {
    const {
        rows,
        tableBodyCells,
        headCells,
        loading,
        setParams,
        params,
        count,
        resource,
        noEdit,
        noPagination,
        noDelete,
        getList,
        hasDetail,
        groupEdit,
        selectedIds: externalSelectedIds,
        onSelectionChange,
    } = props

    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('')
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([])
    const dispatch = useDispatch()

    // Use external state if provided, otherwise use internal state
    const selectedIds = externalSelectedIds ?? internalSelectedIds

    function setSelectedIds(ids: string[]) {
        setInternalSelectedIds(ids)
        onSelectionChange?.(ids)
    }

    function handleRowSelect(id: string) {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter((sid) => sid !== id)
            : [...selectedIds, id]
        setSelectedIds(updated)
    }

    function handleSelectAll(checked: boolean) {
        setSelectedIds(checked ? rows.map((row) => String(row.id)) : [])
    }

    const allSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(String(row.id)))
    const someSelected = rows.some((row) => selectedIds.includes(String(row.id))) && !allSelected

    function handleEditClick(event, id: string | number, row) {
        navigate(`${id}`, {state: {row}})
    }

    function handleDetailClick(id: string | number, hasDetail: boolean, row) {
        if (hasDetail) {
            navigate(`${id}`, {state: {row}})
        }
    }

    async function handleDelete() {
        dispatch(setUtil({loading: true}))
        try {
            await DataProvider.delete(`${resource}/${selected}/`)
            getList()
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }
        dispatch(setUtil({loading: false}))
        setOpen(false)
        setSelected('')
    }

    return !loading && rows.length === 0 ? (
        <BlankList />
    ) : (
        <>
            <Box>
                <LinearProgress
                    sx={{
                        [`& .${linearProgressClasses.bar}`]: {
                            backgroundColor: 'primary.main',
                        },
                        [`&.${linearProgressClasses.colorPrimary}`]: {
                            backgroundColor: 'background.light',
                        },
                        mt: 0.5,
                        mb: 1,
                    }}
                    variant={loading ? 'indeterminate' : 'determinate'}
                    value={0}
                />
                <TableContainer sx={{overflowX: 'auto', maxWidth: '100%'}}>
                    <Table>
                        <CustomTableHead
                            headCells={headCells}
                            search={params}
                            onRequestSort={(event, prop) => {
                                const isAsc =
                                    params.ordering?.includes(prop) &&
                                    !params.ordering?.includes('-')
                                setParams((prev) => ({
                                    ...prev,
                                    ordering: isAsc ? `-${prop}` : prop,
                                }))
                            }}
                            noDelete={noDelete}
                            noEdit={noEdit}
                            hasDetail={hasDetail}
                            groupEdit={groupEdit}
                            allSelected={allSelected}
                            someSelected={someSelected}
                            onSelectAll={handleSelectAll}
                        />
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    hover
                                    key={row._id}
                                    selected={groupEdit && selectedIds.includes(String(row.id))}
                                >
                                    {groupEdit && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedIds.includes(String(row.id))}
                                                onChange={() => handleRowSelect(String(row.id))}
                                                color="primary"
                                            />
                                        </TableCell>
                                    )}
                                    {tableBodyCells[index]}
                                    {hasDetail && (
                                        <TableCell width="32px">
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                                onClick={() => handleDetailClick(row.id, hasDetail, row)}
                                            >
                                                <ArrowBack />
                                            </Button>
                                        </TableCell>
                                    )}
                                    {!noDelete && (
                                        <TableCell width="32px">
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                                onClick={() => {
                                                    setSelected(row.id)
                                                    setOpen(true)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!noPagination && (
                    <TableFooter sx={{direction: 'rtl'}}>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => {
                                setPage(newPage)
                                setParams((prev) => ({...prev, page: newPage + 1}))
                            }}
                            onRowsPerPageChange={(event) => {
                                const newValue = parseInt(event.target.value, 10)
                                setRowsPerPage(newValue)
                                setPage(0)
                                setParams((prev) => ({...prev, page_size: newValue}))
                            }}
                            labelRowsPerPage="تعداد ردیف در هر صفحه:"
                            labelDisplayedRows={({from, to, count}) =>
                                `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                            }
                            sx={{
                                '& .MuiTablePagination-selectLabel': {
                                    fontSize: '16px',
                                    fontWeight: '500',
                                },
                                '& .MuiTablePagination-displayedRows': {
                                    fontSize: '17px',
                                    fontWeight: '500',
                                },
                            }}
                        />
                    </TableFooter>
                )}
            </Box>
            <BaseModal open={open} setOpen={setOpen} title="توجه!" style={{maxWidth: 'sm'}}>
                <Typography mb="1rem" variant="body2" fontSize={'17px'}>
                    آیا از انجام این عمل مطمئن هستید؟
                </Typography>
                <Stack direction={'row'} spacing={2} mt={2.5}>
                    <Button variant="contained" onClick={handleDelete} size="large">
                        بله
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setOpen(false)}
                        size="large"
                    >
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
        </>
    )
}
