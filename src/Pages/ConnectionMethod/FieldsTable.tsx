import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {FieldType} from './Method'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {IconButton, Stack, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {useNavigate, useParams} from 'react-router-dom'
import {Dispatch, SetStateAction} from 'react'
function createData(id: number, name: string, label: string, type: string) {
    return {name, label, type, id}
}

interface Props {
    data: FieldType[] | null
    editMode?: boolean
    hasDetail: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    setDeleteId?: Dispatch<SetStateAction<number | null>>
}
export default function FieldsTable({data, setOpen, setDeleteId, editMode, hasDetail}: Props) {
    const rows = data?.map((item) => ({
        title: item.title,
        description: item.description,
        type: item.type,
        choices: item.choices,
        id: item.id,
    }))
    const pershianType = [
        {key: 'text', value: 'متن'},
        {key: 'choice', value: 'فیلد انتخابی'},
    ]
    const id = useParams().id
    const navigate = useNavigate()

    return (
        <TableContainer component={Paper} sx={{mt: 3}}>
            <Table
                sx={{minWidth: 650, border: '2px solid #3f3f3f', borderRadius: 10, mt: 2}}
                aria-label="simple table"
            >
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
                            عنوان
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
                            توضیحات
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
                            گزینه ها
                        </TableCell>
                        {hasDetail === false && <TableCell align="left"></TableCell>}
                        {!hasDetail ? editMode && <TableCell align="left"></TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                    fontSize: {
                                        xs: '14px',
                                        md: '16px',
                                    },
                                }}
                            >
                                {row.title}
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    fontSize: {
                                        xs: '14px',
                                        md: '16px',
                                    },
                                }}
                            >
                                {row.description}
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    fontSize: {
                                        xs: '14px',
                                        md: '16px',
                                    },
                                }}
                            >
                                {pershianType.find((item) => item.key === row.type)?.value}
                            </TableCell>

                            <TableCell
                                align="left"
                                sx={{
                                    fontSize: {
                                        xs: '14px',
                                        md: '16px',
                                    },
                                }}
                            >
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    {row.choices?.map((item, index) => (
                                        <>
                                            <Typography variant="body2">{item.title}</Typography>
                                            {row.choices?.length - 1 !== index && (
                                                <Typography variant="body2">|</Typography>
                                            )}
                                        </>
                                    ))}
                                </Stack>
                            </TableCell>
                            {hasDetail === false && (
                                <TableCell align="left">
                                    <IconButton
                                        size="large"
                                        onClick={() => {
                                            if (setOpen && setDeleteId) {
                                                setOpen(true)
                                                setDeleteId(row.id)
                                            }
                                        }}
                                    >
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            )}
                            {!hasDetail
                                ? editMode && (
                                      <TableCell align="left">
                                          <IconButton
                                              size="large"
                                              onClick={() =>
                                                  navigate(`/base-accounts/${id}/field/${row.id}`, {
                                                      state: {row},
                                                  })
                                              }
                                          >
                                              <EditIcon />
                                          </IconButton>
                                      </TableCell>
                                  )
                                : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
