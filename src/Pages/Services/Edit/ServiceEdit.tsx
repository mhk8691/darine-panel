import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Service, ServiceType} from '../Service'

const RESOURCE = 'services'
export function ServiceEdit() {
    const state = useLocation().state as {row: ServiceType}
    const [service, setService] = useState(state.row)
    return (
        <EditPage resource={RESOURCE} title="Services" data={service}>
            <Service service={service} setService={setService} />
        </EditPage>
    )
}
