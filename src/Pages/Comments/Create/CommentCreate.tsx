import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Comments} from '../Comments'

export function CommentCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage title={'افزودن دیدگاه'} resource={'comments'} formDetails={data}>
            <Comments comment={data} setComment={setData} />
        </CreatePage>
    )
}
