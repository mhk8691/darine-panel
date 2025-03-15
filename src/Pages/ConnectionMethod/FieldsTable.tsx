import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {FieldType} from './Method'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
function createData(id: number, name: string, label: string, type: string) {
    return {name, label, type, id}
}

interface Props {
    data: FieldType[] | null
    removeField: (id: number) => void
    editField: (id: number) => void
    editMode: boolean
}
export default function FieldsTable({data, removeField, editField, editMode}: Props) {
    const rows = data?.map((item) => ({
        name: item.name,
        label: item.label,
        type: item.type,
        id: item.id,
    }))
    const pershianType = [
        {key: 'text', value: 'متن'},
        {key: 'number', value: 'عدد'},
        {key: 'email', value: 'ایمیل'},
        {key: 'password', value: 'رمز عبور'},
    ]
    return (
        <TableContainer component={Paper} sx={{mt: 3}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="left"
                            sx={{
                                fontSize: {
                                    xs: '15px',
                                    md: '17px',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            نام فیلد
                        </TableCell>
                        <TableCell
                            align="left"
                            sx={{
                                fontSize: {
                                    xs: '15px',
                                    md: '17px',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            لیبل
                        </TableCell>
                        <TableCell
                            align="left"
                            sx={{
                                fontSize: {
                                    xs: '15px',
                                    md: '17px',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            تایپ
                        </TableCell>
                        <TableCell align="left"></TableCell>
                        {editMode && <TableCell align="left"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" sx={{
                                 fontSize: {
                                    xs: '14px',
                                    md: '16px',
                                },
                            }}>
                                {row.name}
                            </TableCell>
                            <TableCell align="left" sx={{
                                 fontSize: {
                                    xs: '14px',
                                    md: '16px',
                                },
                            }}>{row.label}</TableCell>
                            <TableCell align="left" sx={{
                                 fontSize: {
                                    xs: '14px',
                                    md: '16px',
                                },
                            }}>
                                {pershianType.find((item) => item.key === row.type)?.value}
                            </TableCell>
                            <TableCell align={editMode ? 'right' : 'left'}>
                                <IconButton size="large" onClick={() => removeField(row.id)}>
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </TableCell>
                            {editMode && (
                                <TableCell align="left">
                                    <IconButton size="large" onClick={() => editField(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
