import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CategoriesType = {
    id: number
    name: string
    image: string | File
}
const RESOURCE = 'poruduct-category'

export function Categories({
    category,
    setCategory,
}: {
    category: CategoriesType
    setCategory: React.Dispatch<React.SetStateAction<CategoriesType>>
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] 
      if (file) {
          setCategory((prev) => ({...prev, image: file}))
      }
  }

    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="name"
                        setData={setCategory}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={category.name}
                    />,
                    <CustomTextField
                        name="image"
                        type="file"
                        setData={setCategory}
                        resource={RESOURCE}
                        onChange={handleChange}
                        sx={{
                        }}
                    />,
                ]}
            />
        </Stack>
    )
}
