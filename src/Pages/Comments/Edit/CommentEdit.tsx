import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Comments, CommentsType} from '../Comments'

const RESOURCE = 'comments'
export function CommentEdit() {
    const state = useLocation().state as {row: CommentsType}
    const [comment, setComment] = useState(state.row)
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش دیدگاه"
            formDetails={comment}
            initialData={state.row}
        >
            <Comments comment={comment} setComment={setComment} />
        </EditPage>
    )
}
