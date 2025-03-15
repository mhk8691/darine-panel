import {Rating, Stack, Typography} from '@mui/material'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CommentsType = {
    id: number
    customer: string
    product: string
    comment: string
    rating: number
}

const RESOURCE = 'comments'

export function Comments({
    comment,
    setComment,
}: {
    comment: CommentsType
    setComment: React.Dispatch<React.SetStateAction<CommentsType>>
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="comment"
                        resource={RESOURCE}
                        setData={setComment}
                        label={'دیدگاه'}
                        defaultValue={comment.comment}
                        multiline={true}
                        rows={7}
                    />,
                    <CustomAutocomplete
                        options={[
                            {label: 'فیسبوک', id: 'facebook'},
                            {label: 'اکتیویژن', id: 'activision'},
                        ]}
                        name="customer"
                        setData={setComment}
                        defaultValue={comment.customer}
                        label={'مشتری'}
                    />,
                    <CustomAutocomplete
                        options={[
                            {label: 'فیسبوک', id: 'facebook'},
                            {label: 'اکتیویژن', id: 'activision'},
                        ]}
                        name="product"
                        setData={setComment}
                        defaultValue={comment.product}
                        label={'محصول'}
                    />,

                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography variant='body1' sx={{fontWeight: '600', fontSize: '17px'}}>
                            امتیاز:
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={comment.rating}
                            onChange={(event, newValue) => {
                                setComment({...comment, rating: newValue as number})
                            }}
                        />
                    </Stack>,
                ]}
            />
        </Stack>
    )
}
