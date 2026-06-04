import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, IconButton, Stack } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { BaseModal } from '../../Components/Modal/BaseModal';
import { ProductsListType } from '../Products/List/ProductsList';

interface Props {
  product: ProductsListType;
  setProduct: React.Dispatch<React.SetStateAction<ProductsListType>>;
}

export default function Picture({ product, setProduct }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleConfirm = () => {
    if (!file) {
      setOpen(false);
      return;
    }

    setProduct((prev) => ({
      ...prev,
      image: file, 
    }));

    setFile(null);
    setOpen(false);
  };

  const handleRemove = () => {
    setProduct((prev) => ({
      ...prev,
      image: null,
    }));
  };

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setOpen(true)}
        sx={{ height: 53 }}
      >
        {product.image ? 'ویرایش تصویر' : 'انتخاب تصویر'}
      </Button>

      <BaseModal
        open={open}
        setOpen={setOpen}
        title="تصویر محصول"
        onClose={handleClose}
        style={{ maxWidth: 500 }}
      >
        {/* preview current image */}
        {product.image && !file && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Box
              component="img"
              src={
                typeof product.image === 'string'
                  ? product.image
                  : URL.createObjectURL(product.image)
              }
              sx={{ width: '100%', borderRadius: 2 }}
            />

            <IconButton
              onClick={handleRemove}
              sx={{ position: 'absolute', top: 8, left: 8 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}

        {/* preview new file */}
        {file && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Box
              component="img"
              src={URL.createObjectURL(file)}
              sx={{ width: '100%', borderRadius: 2 }}
            />

            <IconButton
              onClick={() => setFile(null)}
              sx={{ position: 'absolute', top: 8, left: 8 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}

        <input type="file" onChange={handleChange} />

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" fullWidth onClick={handleConfirm}>
            تایید
          </Button>

          <Button variant="outlined" fullWidth onClick={handleClose}>
            لغو
          </Button>
        </Stack>
      </BaseModal>
    </>
  );
}