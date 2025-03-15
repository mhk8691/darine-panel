import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'

export type HeadCellType = {
    name: string
    label: string
}[]
export function createTableHeadCells(label, name) {
    return {label, name, key: name}
}
export function CustomTableHead(props: {
    headCells: HeadCellType
    onSelectAllClick: any
    search: any
    numSelected: any
    rowCount: number
    onRequestSort: any
    noDelete?: boolean
    noEdit?: boolean
    hasDetail?: boolean
}) {
    const {
        headCells,
        onSelectAllClick,
        search,
        numSelected,
        rowCount,
        onRequestSort,
        noDelete,
        noEdit,
        hasDetail,
    } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {!noDelete && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="error"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.name}
                        color="secondary"
                        sx={{
                            fontSize: {
                                xs: '13px',
                                sm: '14px',
                                lg: '15px',
                                xl: '17px',
                            },
                        }}
                    >
                        <TableSortLabel
                            active={search.sort === headCell.name}
                            direction={
                                search.sort === headCell.name
                                    ? search.order === 1
                                        ? 'asc'
                                        : 'desc'
                                    : 'asc'
                            }
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                            onClick={createSortHandler(headCell.name)}
                            color="#434B59"
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {!noEdit && <TableCell></TableCell>}
                {hasDetail && <TableCell></TableCell>}
            </TableRow>
        </TableHead>
    )
}
