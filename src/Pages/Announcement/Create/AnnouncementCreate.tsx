import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Announcement } from '../Announcement'

export function AnnouncementCreate({
    data,
    setData,
    resource
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    resource:string
}) {
    return (
        <CreatePage
            title={'افزودن اطلاعیه'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Announcement announcement={data} setAnnouncement={setData} resource={resource} />
        </CreatePage>
    )
}
