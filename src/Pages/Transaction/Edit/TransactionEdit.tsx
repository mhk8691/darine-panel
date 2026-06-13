import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { Transactions, TransactionsType } from '../Transactions'

export function TransactionsEdit({resource}:{resource:string}) {
    const transactionId = useParams().id
    const [transaction, setTransaction] = useState<TransactionsType>({} as TransactionsType)
    const [initialData, setInitialData] = useState<TransactionsType>({} as TransactionsType)
    useEffect(() => {
        const getTransaction = async () => {
            try {
                let response = await DataProvider.get<TransactionsType>(`transactions/${transactionId}/`)
                if (response) {
                    setTransaction(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getTransaction()
    }, [transactionId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات سفارش"
            formDetails={transaction}
            initialData={initialData}
        >
            <Transactions transaction={transaction} setTransaction={setTransaction} />
        </EditPage>
    )
}
