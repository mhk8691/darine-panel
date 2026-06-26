import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import { Offset, OffsetType } from '../Offset'

export function OffsetEdit({resource}:{resource:string}) {
    const offsetId = useParams().id
    const [offset, setOffset] = useState<OffsetType>({} as OffsetType)
    const [initialData, setInitialData] = useState<OffsetType>({} as OffsetType)
    const getOffset = async () => {
        try {
            let response = await DataProvider.get<OffsetType>(`${resource}/${offsetId}/`)
            if (response) {
                setOffset(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOffset()
    }, [offsetId])
    const element = [
        <CustomTextField
            key={offset.id}
            name="id"
            disabled={true}
            resource={resource}
            label={'آیدی'}
            defaultValue={offset.id}
        />,
        <CustomTextField
            key={offset.id}
            name="created_at"
            disabled={true}
            resource={resource}
            label={'تاریخ ایجاد'}
            defaultValue={formatDate(offset.created_at)}
        />,
      
    ]
    return (
        <EditPage
            resource={resource}
            title="جزئیات کارت"
            formDetails={offset}
            initialData={initialData}
            isFormData
        >
            <Offset offset={offset} setOffset={setOffset} children={element} resource={resource} />
        </EditPage>
    )
}
