import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { Deposit, DepositType } from '../Deposit'

export function DepositEdit({resource}:{resource:string}) {
    const depositId = useParams().id
    const [deposit, setDeposit] = useState<DepositType>({} as DepositType)
    const [initialData, setInitialData] = useState<DepositType>({} as DepositType)
    useEffect(() => {
        const getTransaction = async () => {
            try {
                let response = await DataProvider.get<DepositType>(`${resource}/${depositId}/`)
                if (response) {
                    setDeposit(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getTransaction()
    }, [depositId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات واریز"
            formDetails={deposit}
            initialData={initialData}
            isFormData={true}
        >
            <Deposit deposit={deposit} setDeposit={setDeposit} />
        </EditPage>
    )
}
