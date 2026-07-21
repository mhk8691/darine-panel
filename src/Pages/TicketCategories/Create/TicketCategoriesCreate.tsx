import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {TicketCategories} from '../TicketCategories'

export function TicketCategoriesCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن دسته بندی تیکت'}
            resource={'ticket-categories/'}
            isFormData={true}
            formDetails={data}
        >
            <TicketCategories ticketCategories={data} setTicketCategories={setData} />
        </CreatePage>
    )
}
