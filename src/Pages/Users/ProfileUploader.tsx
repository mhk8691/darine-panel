import EditIcon from '@mui/icons-material/Edit'
import {Box} from '@mui/material'
import {ChangeEvent, useState} from 'react'
import {UsersType} from './Users'
import {CustomTextField} from '../../Components/Input/CustomTextField'
interface Props {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
}
export default function ProfileUploader({user, setUser}: Props) {
    const [isHover, setIsHover] = useState(false)
    const [imagePreview, setImagePreview] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setUser((prev) => ({...prev, image: file}))
        }
    }
    return (
        <Box
            component={'label'}
            htmlFor="profile_image"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            sx={{
                width: '120px',
                height: '120px',
                position: 'relative',
                borderRadius: '50%',
                mb: 5,
                cursor: 'pointer',
            }}
        >
            <Box
                component={'img'}
                src={typeof user.image === 'string' ? user.image : imagePreview}
                sx={{
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isHover ? 'brightness(0.4)' : 'brightness(1)',
                    animation: isHover ? 'imageAnimation .2s ease-in-out' : 'none',
                    '@keyframes imageAnimation ': {
                        ' 0%': {
                            filter: 'brightness(1)',
                        },
                        '100%': {
                            filter: 'brightness(0.4)',
                        },
                    },
                }}
            />
            {isHover && (
                <EditIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
            <CustomTextField
                name="name"
                type="file"
                id="profile_image"
                onChange={handleChange}
                sx={{display: 'none'}}
            />
        </Box>
    )
}
