import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {GridProducer} from '../../../Components/Table/GridProducer'

const RESOURCE = 'comments'
type AcceptedType = 'accepted' | 'rejected' | 'pending'
export type CommentsType = {
    id: number
    user_info: {
        id: number
        name: string
        phone_number: string
        profile_picture: string
    }
    product_info: {
        id: number
        name: string
        thumbnail: string | null
    }
    text: string
    rating: number
    replies_count: number
    created_at: string
    updated_at: string
    accepted: AcceptedType
}
export function CommentEdit() {
    const commentId = useParams().id
    const [comment, setComment] = useState<CommentsType>({} as CommentsType)
    const [initialData, setInitialData] = useState<CommentsType>({} as CommentsType)

    useEffect(() => {
        const getComment = async () => {
            try {
                let response = await DataProvider.get<CommentsType>(`${RESOURCE}/${commentId}/`)
                if (response) {
                    setComment(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getComment()
    }, [commentId])
    const handleChange = (event: SelectChangeEvent) => {
        setComment((prev) => {
            return {...prev, accepted: event.target.value as AcceptedType}
        })
    }
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش دیدگاه"
            formDetails={comment}
            initialData={initialData}
            isFormData
        >
            <Stack>
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        <FormControl
                            fullWidth
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '54.56px !important',
                                },
                                '& .MuiSelect-select': {
                                    fontSize: '15px !important',
                                },
                                '& .Mui-disabled': {
                                    color: '#3f3f3f !important',
                                },
                            }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                    fontSize: '15px !important',
                                }}
                            >
                                وضعیت
                            </InputLabel>
                            <Select
                            key={comment.accepted}
                                value={comment.accepted}
                                label="وضعیت"
                                onChange={handleChange}
                                sx={{
                                    '& .MuiAutocomplete-listbox': {
                                        fontSize: '15px',
                                    },
                                    '& .MuiAutocomplete-option': {
                                        py: '12px !important',
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'pending'}
                                >
                                    درانتظار
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'accepted'}
                                >
                                    تایید شده
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontSize: '15px !important',
                                    }}
                                    value={'rejected'}
                                >
                                    رد شده
                                </MenuItem>
                            </Select>
                        </FormControl>,
                    ]}
                />
            </Stack>
        </EditPage>
    )
}
