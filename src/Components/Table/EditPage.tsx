import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'

export function EditPage(props) {
    const {title, resource, noEdit, formDetails} = props
    const dispatch = useDispatch()
    const params = useParams()
    async function saveChanges() {
        try {
            dispatch(setUtil({loading: true}))
            const res = await DataProvider.patch(`${resource}/${params.id}/`, {
                data: formDetails,
            })
            dispatch(
                setUtil({
                    open: true,
                    message: res.message,
                    severity: 'success',
                }),
            )
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }

        dispatch(setUtil({loading: false}))
    }
    return (
        <Box p={2}>
            <Stack mb={2}>
                <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography variant="h5" fontWeight="700">
                        {title}
                    </Typography>
                    {!noEdit && (
                        <Stack direction={'row'} marginTop={'16px'} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={saveChanges}
                                size="large"
                                sx={{fontSize: '20px'}}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            {props.children}
        </Box>
    )
}
