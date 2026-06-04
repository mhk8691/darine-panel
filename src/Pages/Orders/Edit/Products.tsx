import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import ImageZoom from '../../../Components/ImageZoom/ImageZoom'
import { BaseModal } from '../../../Components/Modal/BaseModal'
import { OrdersType } from '../Orders'
import { useNavigate } from 'react-router-dom'

interface Props {
  order: OrdersType
  isOpen: number | null
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Products({ order, isOpen, setIsOpen }: Props) {
  const navigate = useNavigate()
  return (
    <Grid container spacing={2}>
      {order?.items?.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5} key={item.id}>
          <Card
  sx={{
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    transition: '0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: 'primary.main',
    },
  }}
>
            {/* IMAGE */}
            <Stack p={2} pb={0}>
              <Box
                sx={{
                  height: 160,
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <ImageZoom>
                  <Box
                    component="img"
                    src="" // API image نداره
                    alt={item.product_name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </ImageZoom>
              </Box>
            </Stack>

            {/* CONTENT */}
            <CardContent sx={{ textAlign: 'center', px: 2 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {item.product_name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 0.5,
                }}
              >
                {Number(item.price_at_time).toLocaleString()} تومان
              </Typography>

              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  وزن: {item.weight_at_time} گرم
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  تعداد: {item.quantity}
                </Typography>
              </Stack>
            </CardContent>

            {/* ACTION */}
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 12,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
                onClick={() => navigate(`/products/${item.id}`)}
              >
                مشاهده جزئیات
              </Button>
            </CardActions>
          </Card>

   
        </Grid>
      ))}
    </Grid>
  )
}