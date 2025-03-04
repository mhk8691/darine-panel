import React, {useState} from 'react'
import {Box} from '@mui/system'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import {CustomTableHead, HeadCellType} from './CustomTableHead'
import EditIcon from '@mui/icons-material/Edit'
import {Button, TableFooter} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {CustomToolbar} from './CustomToolbar'
import {BlankList} from '../Pictures/BlankList'
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress'
import {ArrowBack} from '@mui/icons-material'

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
    deleteName: string
    hasDetail?: boolean
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
        deleteName,
        hasDetail,
    } = props
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        setParams((filter) => {
            let isAsc = true
            if (filter.sort) {
                isAsc = filter.sort === property && filter.order === 1
            }
            return {
                ...filter,
                sort: property,
                order: isAsc ? -1 : 1,
            }
        })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: string[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setParams((filter) => {
            return {
                ...filter,
                skip: newPage * rowsPerPage,
            }
        })
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        let newValue = parseInt(event.target.value, 10)
        setParams((filter) => {
            return {
                ...filter,
                limit: newValue,
                skip: newValue * 0,
            }
        })
        setRowsPerPage(newValue)
        setPage(0)
    }

    function handleEditClick(event, id: string | number, row) {
        navigate(`${id}`, {state: {row}})
    }
    function handleDetailClick(id: string | number, hasDetail: boolean) {
        if (hasDetail) {
            navigate(`detail/${id}`)
        }
    }

    const isSelected = (name) => selected.indexOf(name) !== -1
    return !loading && rows.length === 0 ? (
        <BlankList />
    ) : (
        <Box>
            <LinearProgress
                sx={{
                    [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: 'background.main',
                    },
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor: 'background.light',
                    },
                    my: 0.5,
                }}
                variant={loading ? 'indeterminate' : 'determinate'}
                value={0}
            />
            {!noDelete && (
                <CustomToolbar
                    setParams={setParams}
                    setSelected={setSelected}
                    resource={resource}
                    selected={selected}
                    getList={getList}
                    numSelected={selected.length}
                    deleteName={deleteName}
                />
            )}
            <TableContainer>
                <Table>
                    <CustomTableHead
                        headCells={headCells}
                        search={params}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows.length}
                        onRequestSort={handleRequestSort}
                        numSelected={selected.length}
                        noDelete={noDelete}
                        noEdit={noEdit}
                        hasDetail={hasDetail}
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.id)
                            const labelId = `enhanced-table-checkbox-${index}`

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row._id}
                                    selected={isItemSelected}
                                >
                                    {!noDelete && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="error"
                                                checked={isItemSelected}
                                                onChange={(event) => handleClick(event, row.id)}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    {tableBodyCells[index]}
                                    {!noEdit && (
                                        <TableCell width="32px">
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                                onClick={(event) =>
                                                    handleEditClick(event, row.id, row)
                                                }
                                            >
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                    {hasDetail && (
                                        <TableCell width="32px">
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                                onClick={(event) =>
                                                    handleDetailClick(row.id, hasDetail)
                                                }
                                            >
                                                <ArrowBack />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!noPagination && (
                <TableFooter
                    sx={{
                        direction: 'rtl',
                    }}
                >
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={'تعداد ردیف در هر صفحه:'}
                        labelDisplayedRows={({from, to, count}) =>
                            `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                        }
                        sx={{
                            '&.MuiTablePagination-root .MuiTablePagination-selectLabel': {
                                fontSize: '15px',
                                fontWeight: '500',
                            },
                            '&.MuiTablePagination-root .MuiTablePagination-displayedRows': {
                                fontSize: '16px',
                                fontWeight: '500',
                            },
                        }}
                    />
                </TableFooter>
            )}
        </Box>
    )
}
