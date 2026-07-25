import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { Investments, InvestmentsType } from '../Investments'

export function InvestmentsEdit({resource}:{resource:string}) {
    const InvestmentsId = useParams().id
    const [investments, setInvestments] = useState<InvestmentsType>({} as InvestmentsType)
    const [initialData, setInitialData] = useState<InvestmentsType>({} as InvestmentsType)
    useEffect(() => {
        const getInvestments = async () => {
            try {
                let response = await DataProvider.get<InvestmentsType>(`${resource}/${InvestmentsId}/`)
                if (response) {
                    setInvestments(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getInvestments()
    }, [InvestmentsId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات سرمایه‌گذاری‌"
            formDetails={investments}
            initialData={initialData}
        >
            <Investments investments={investments} setInvestments={setInvestments} />
        </EditPage>
    )
}
