import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BaseModal } from '../../../Components/Modal/BaseModal';
import { DataProvider } from '../../../Core/DataProvider';
import { formatDate } from '../../../Core/FormatDate';
import { formatPrice } from '../../../Core/FormatPrice';
import { setUtil } from '../../../redux/UtilSlice';
import { ProductsListType } from '../../Products/List/ProductsList';


  export const formatWeight = (value: string | number) => {
    return Number(value).toFixed(3);
  };
export default function SilverProductCard({
  item,
  getList,
}: {
  item: ProductsListType;
  getList: () => Promise<void>;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  async function handleDelete() {
    dispatch(setUtil({ loading: true }));
    try {
      await DataProvider.delete(`silver-products/${item.id}/`);
      await getList();
    } catch (error: any) {
      dispatch(setUtil({ open: true, message: error.message, severity: 'error' }));
    } finally {
      dispatch(setUtil({ loading: false }));
      setOpenModal(false);
    }
  }

  return (
    <>
      <Card
        onClick={() => navigate(`/silver-product/${item.id}`)}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          border: '1px solid #BCBCBC',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          image={typeof item.image === 'string' ? item.image : ''}
          alt={item.name}
          sx={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            width: '100%',
            height: 220,
            objectFit: 'cover',
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
            minHeight={75}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 18 }}>
              {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
            </Typography>

            {item.is_active ? (
              <VisibilityIcon color="success" />
            ) : (
              <VisibilityOffIcon color="primary" />
            )}
          </Stack>

          <Stack direction="column" spacing={0.5} mb={1}>
            <Typography variant="body2" color="text.secondary">
              درصد سود: {+item.profit_percent ||0}%
            </Typography>

            <Typography variant="body2" color="success.main" fontWeight="bold">
              قیمت نهایی: {formatPrice(+item.total_price)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} my={2} flexWrap="wrap">
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                fontSize: 12,
              }}
            >
              {item.category_name}
            </Box>

            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                fontSize: 12,
              }}
            >
              {item.delivery_type}
            </Box>

            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                fontSize: 12,
              }}
            >
              {formatWeight(item.weight)} گرم
            </Box>

            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                fontSize: 12,
              }}
            >
              موجودی: {item.inventory_count}
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mb: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
          >
            حذف محصول
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'right', fontSize: 13 }}
          >
            {formatDate(item.created_at)}
          </Typography>
        </CardContent>
      </Card>

      {/* delete modal */}
      <BaseModal
        open={openModal}
        setOpen={setOpenModal}
        title="توجه!"
        style={{ maxWidth: 'sm' }}
      >
        <Typography mb={2}>آیا از حذف این محصول مطمئن هستید؟</Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            بله
          </Button>
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            خیر
          </Button>
        </Stack>
      </BaseModal>
    </>
  );
}