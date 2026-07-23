import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { Guarantees, GuaranteesType } from '../Guarantees'

export function GuaranteesEdit({resource}:{resource:string}) {
    const guaranteesId = useParams().id
    const [guarantees, setGuarantees] = useState<GuaranteesType>({} as GuaranteesType)
    const [initialData, setInitialData] = useState<GuaranteesType>({} as GuaranteesType)
    useEffect(() => {
        const getGuarantees = async () => {
            try {
                let response = await DataProvider.get<GuaranteesType>(`${resource}/${guaranteesId}/`)
                if (response) {
                    setGuarantees(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getGuarantees()
    }, [guaranteesId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات ضمانت"
            formDetails={guarantees}
            initialData={initialData}
        >
            <Guarantees guarantees={guarantees} setGuarantees={setGuarantees} />
        </EditPage>
    )
}
