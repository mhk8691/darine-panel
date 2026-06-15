import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { Withdraw, WithdrawType } from '../Withdraw'

export function WithdrawEdit({resource}:{resource:string}) {
    const withdrawId = useParams().id
    const [withdraw, setWithdraw] = useState<WithdrawType>({} as WithdrawType)
    const [initialData, setInitialData] = useState<WithdrawType>({} as WithdrawType)
    useEffect(() => {
        const getTransaction = async () => {
            try {
                let response = await DataProvider.get<WithdrawType>(`${resource}/${withdrawId}/`)
                if (response) {
                    setWithdraw(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getTransaction()
    }, [withdrawId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات برداشت"
            formDetails={withdraw}
            initialData={initialData}
            isFormData={true}
        >
            <Withdraw withdraw={withdraw} setWithdraw={setWithdraw} />
        </EditPage>
    )
}
