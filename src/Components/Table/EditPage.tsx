import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'

export function EditPage(props) {
    const {title, resource, noEdit, formDetails, initialData} = props
    const dispatch = useDispatch()
    const params = useParams()
    async function saveChanges() {
        try {
            dispatch(setUtil({loading: true}))
            const formData = new FormData()
            const updatedFields = Object.keys(formDetails).reduce((acc, key) => {
                if (formDetails[key] !== initialData[key]) {
                    acc[key] = formDetails[key]
                }
                return acc
            }, {})
             if (Object.keys(updatedFields).length === 0) {
                 dispatch(setUtil({open: true, message: 'تغییری اعمال نشده است', severity: 'error'}))
                 dispatch(setUtil({loading: false}))
                 return
             }
              Object.entries(updatedFields).forEach(([key, value]) => {
                  if (value instanceof File) {
                      formData.append(key, value)
                  } else {
                      formData.append(key, String(value))
                  }
              })
            const res = await DataProvider.patch(`${resource}/${params.id || formDetails.id}/`, {
                data: formData,
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
                    <Typography variant="h5" sx={{fontSize: '18px !important', fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                    {!noEdit && (
                        <Stack direction={'row'} marginTop={'16px'} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={saveChanges}
                                sx={{fontSize: '16px', py: 1}}
                            >
                                ذخیره تغییرات
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            {props.children}
        </Box>
    )
}
