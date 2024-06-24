import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';

const FoodEntryForm = ({ addFoodEntry }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const formik = useFormik({
    initialValues: {
      foodItem: '',
      calories: '',
    },
    validationSchema: Yup.object({
      foodItem: Yup.string().required('Required'),
      calories: Yup.number().required('Required').positive('Must be positive'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://nodejs-czjr-production.up.railway.app/food-entry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: user?.username || 'Anonymous', // Use the authenticated user's username or 'Anonymous' if not available
            foodItem: values.foodItem,
            calories: values.calories,
          }),
        });
        if (response.ok) {
          addFoodEntry(values);
          resetForm();
        } else {
          console.error('Failed to submit food entry');
        }
      } catch (error) {
        console.error('Error submitting food entry:', error);
      }
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