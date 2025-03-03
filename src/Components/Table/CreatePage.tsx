import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'

export function CreatePage(props) {
    const {title, resource, noEdit, formDetails, redirect} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function saveChanges() {
        try {
            dispatch(setUtil({loading: true}))
            const res = await DataProvider.post(resource, {
                data: formDetails,
            })
            navigate(`/${redirect ? redirect : resource}`)
            dispatch(setUtil({open: true, message: res.message, severity: 'success'}))
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
                    <Typography variant="h2" fontSize={18}>{title}</Typography>
                    {!noEdit && (
                        <Button
                            variant="outlined"
                            onClick={saveChanges}
                            sx={{width: '100px', py: 1, fontSize: '16px'}}
                        >
                            تایید
                        </Button>
                    )}
                </Stack>
            </Stack>
            {props.children}
        </Box>
    )
}
