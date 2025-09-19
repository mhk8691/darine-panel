import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Requests, RequestsType} from '../Requests'

const RESOURCE = 'requests'
export function RequestsEdit() {
    const state = useLocation().state as {row: RequestsType}
    const [requests, setRequests] = useState(state.row)

    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش درخواست"
            formDetails={requests}
            initialData={state.row}
            isFormData={true}
        >
            <Requests requests={requests} setRequests={setRequests} />
        </EditPage>
    )
}
