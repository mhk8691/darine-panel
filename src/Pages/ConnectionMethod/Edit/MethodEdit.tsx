import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {ConnectionMethod, MethodType} from '../Method'

const RESOURCE = 'account/base-accounts'
export function MethodEdit() {
    const state = useLocation().state as {row: MethodType}
    const [method, setMethod] = useState(state.row)
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش روش اتصال"
            formDetails={method}
            initialData={state.row}
            redirect={'base-accounts'}
        >
            <ConnectionMethod method={method} setMethod={setMethod} editMode={true} />
        </EditPage>
    )
}
