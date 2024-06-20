import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const FoodEntryForm = ({ addFoodEntry }) => {
  const formik = useFormik({
    initialValues: {
      foodItem: '',
      calories: '',
    },
    validationSchema: Yup.object({
      foodItem: Yup.string().required('Required'),
      calories: Yup.number().required('Required').positive('Must be positive'),
    }),
    onSubmit: (values, { resetForm }) => {
      addFoodEntry(values);
      resetForm();
    },
  });

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Add Food Entry
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="foodItem"
            name="foodItem"
            label="Food Item"
            value={formik.values.foodItem}
            onChange={formik.handleChange}
            error={formik.touched.foodItem && Boolean(formik.errors.foodItem)}
            helperText={formik.touched.foodItem && formik.errors.foodItem}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id="calories"
            name="calories"
            label="Calories"
            type="number"
            value={formik.values.calories}
            onChange={formik.handleChange}
            error={formik.touched.calories && Boolean(formik.errors.calories)}
            helperText={formik.touched.calories && formik.errors.calories}
          />
        </Box>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Entry
        </Button>
      </form>
    </Paper>
  );
};

export default FoodEntryForm;
