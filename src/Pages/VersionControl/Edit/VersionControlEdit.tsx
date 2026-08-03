import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {VersionControl, VersionControlContainerType} from '../VersionControl'

const RESOURCE = 'version-control'

export function VersionControlEdit() {
    const state = useLocation().state as {row: VersionControlContainerType}
    const [version, setVersion] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات نسخه اپلیکیشن"
            formDetails={version}
            initialData={state.row}
            isFormData={true}
        >
            <VersionControl version={version} setVersion={setVersion} editMode={true} />
        </EditPage>
    )
}