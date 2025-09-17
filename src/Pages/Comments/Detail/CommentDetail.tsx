import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {CommentsType} from '../Edit/CommentEdit'

const RECOURCE = 'comments'

export function CommentDetail() {
    const id = useParams().id
    const [comment, setComment] = useState<CommentsType | null>({} as CommentsType)
    const getComment = async () => {
        let response = await DataProvider.get<CommentsType>(`${RECOURCE}/${id}/`)
        if (response) {
            setComment(response.data)
        }
    }

    useEffect(() => {
        getComment()
    }, [])

    return (
        <Stack p={4} direction={'column'}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات دیدگاه
            </Typography>
            <Stack
                direction={{
                    xs: 'column-reverse',
                    sm: 'row',
                }}
                alignItems={'center'}
                justifyContent={{
                    xs: 'center',
                    sm: 'space-between',
                }}
                mt={2.5}
                gap={2}
            >
                <Stack spacing={2.5} alignSelf={'flex-start'} width={'100%'}>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            آیدی:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {comment?.id}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            نام مشتری:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {comment?.user_info?.name}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            نام محصول:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {comment?.product_info?.name}
                        </Typography>
                    </Stack>

                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            امتیاز:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {comment?.rating}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            وضعیت:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: '400',
                                fontSize: '16px',
                                color: comment?.accepted ? 'success.main' : 'primary.main',
                            }}
                        >
                            {comment?.accepted ? 'تایید شده' : 'رد شده'}
                        </Typography>
                    </Stack>
                    <Stack direction={'column'} spacing={1.5} width={'100%'}>
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '16px'}}>
                            متن دیدگاه:
                        </Typography>
                        <Stack bgcolor={'background.light'} borderRadius={2} p={2} width={'100%'}>
                            <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                                {comment?.text}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            تاریخ ایجاد:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: '400',
                                fontSize: '16px',
                            }}
                        >
                            {formatDate(comment?.created_at)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
