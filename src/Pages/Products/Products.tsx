import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomAutocomplete } from '../../Components/Input/CustomAutoComplete';
import { DataProvider } from '../../Core/DataProvider';
import { PropertyType } from '../../Core/types';
import { CategoriesType } from '../Categories/Categories';
import Pictures from './Pictures';
import { ProductsListType } from './List/ProductsList';
import { CustomTextField } from '../../Components/Input/CustomTextField';

const RESOURCE = 'product';

export function Products({
  product,
  setProduct,
  editMode = false,
  getProduct,
}: {
  product: ProductsListType;
  setProduct: React.Dispatch<React.SetStateAction<ProductsListType>>;
  editMode?: boolean;
  getProduct?: () => Promise<void>;
}) {
  const productId = useParams().id;

  const [categories, setCategories] = useState<{ results: CategoriesType[] } | null>(null);
 
  const getCategories = async () => {
    try {
      const res = await DataProvider.get<{ results: CategoriesType[] }>('categories/');
      setCategories({ results: res.data.results });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Stack sx={{ mb: 2 }}>
      <Grid container spacing={3} rowSpacing={3}>
        {/* ID */}
        {editMode && (
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
            key={product.id}
              name="id"
              label="آیدی"
              defaultValue={product.id}
              disabled
            />
          </Grid>
        )}

        {/* Name */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomTextField
          key={product.id}
            name="name"
            setData={setProduct}
            label="نام محصول"
            defaultValue={product.name}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} md={4}>
       <CustomAutocomplete
       
  options={categories?.results.map((c) => ({
    label: c.name,
    id: c.id,
  }))}
  name="category"
  key={product.id}
  setData={setProduct}
  defaultValue={
    categories?.results
      .map((c) => ({ label: c.name, id: c.id }))
      .find((c) => c.id === product.category)
  }
  label="دسته بندی"
/>
        </Grid>

        {/* Inventory */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomTextField
          key={product.id}
            name="inventory_count"
            type="number"
            setData={setProduct}
            label="موجودی"
            defaultValue={product.inventory_count}
          />
        </Grid>

        {/* Weight */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomTextField
          key={product.id}
            name="weight"
            setData={setProduct}
            label="وزن (گرم)"
            defaultValue={product.weight}
          />
        </Grid>

     

     

        {/* Status */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>وضعیت</InputLabel>

            <Select
            key={product.id}
              value={product.is_active ? 'true' : 'false'}
              label="وضعیت"
              onChange={(e: SelectChangeEvent) => {
                const value = e.target.value === 'true';
                setProduct((prev) => ({
                  ...prev,
                  is_active: value,
                }));
              }}
            >
              <MenuItem value="true">فعال</MenuItem>
              <MenuItem value="false">غیرفعال</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Delivery Type */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>نوع ارسال</InputLabel>

            <Select
            key={product.id}
              value={product.delivery_type || ''}
              label="نوع ارسال"
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  delivery_type: e.target.value,
                }));
              }}
            >
              <MenuItem value="HOME">در منزل</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Image */}
        <Grid item xs={12} sm={6} md={4}>
          <Pictures
            product={product}
            setProduct={setProduct}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <CustomTextField
          key={product.id}
            name="description"
            setData={setProduct}
            label="توضیحات"
            defaultValue={product.description}
            multiline
            rows={6}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}