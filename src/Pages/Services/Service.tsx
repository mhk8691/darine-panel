import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type ServiceType = {
    _id: string
    type: string
    title: string
    html: string
    description: string
}
const RESOURCE = 'service'

export function Service({
    service,
    setService,
}: {
    service: ServiceType
    setService: React.Dispatch<React.SetStateAction<ServiceType>>
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="type"
                        setData={setService}
                        resource={RESOURCE}
                        label={'Type'}
                        defaultValue={service.type}
                    />,
                    <CustomTextField
                        name="title"
                        resource={RESOURCE}
                        setData={setService}
                        label={'Title'}
                        defaultValue={service.title}
                    />,
                    <CustomTextField
                        name="html"
                        resource={RESOURCE}
                        setData={setService}
                        label={'HTML'}
                        defaultValue={service.html}
                    />,
                    <CustomTextField
                        name="description"
                        resource={RESOURCE}
                        setData={setService}
                        label={'Description'}
                        defaultValue={service.description}
                    />,
                ]}
            />
        </Stack>
    )
}
