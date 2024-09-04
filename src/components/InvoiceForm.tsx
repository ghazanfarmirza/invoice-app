import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { InvoiceFormData } from "../types";
import { CREATE_INVOICE_MUTATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { DeleteOutline } from "@mui/icons-material";

const InvoiceForm = ({
  onFormChange,
  onSave,
  onReset,
}: {
  onFormChange: (data: InvoiceFormData) => void;
  onSave: () => void;
  onReset: () => void;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: {
      companyName: "",
      companyEmail: "",
      streetAddress: "",
      city: "",
      country: "",
      postalCode: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientCountry: "",
      clientPostalCode: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      paymentTerms: "Net 30 days",
      projectDescription: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [createInvoice] = useMutation(CREATE_INVOICE_MUTATION);

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      await createInvoice({
        variables: {
          input: { ...data, totalAmount: calculateTotal(data.items) },
        },
      });
      alert("Invoice created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  // Watch the form data for real-time updates
  const watchedFormData = watch();

  // Use useEffect to update parent state
  useEffect(() => {
    onFormChange(watchedFormData);
  }, [watchedFormData, onFormChange]);

  const calculateTotal = (items: { quantity: number; price: number }[]) => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };
  
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">New Invoice</Typography>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Box>
        </Box>
        <form>
          <Grid container spacing={3}>
            {/* Bill From Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Bill From</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: "Company Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    fullWidth
                    error={!!errors.companyName}
                    helperText={
                      errors.companyName ? errors.companyName.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="companyEmail"
                control={control}
                rules={{
                  required: "Company Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Email"
                    fullWidth
                    error={!!errors.companyEmail}
                    helperText={
                      errors.companyEmail ? errors.companyEmail.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country ? errors.country.message : ""}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city ? errors.city.message : ""}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="postalCode"
                control={control}
                rules={{ required: "Postal Code is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    error={!!errors.postalCode}
                    helperText={
                      errors.postalCode ? errors.postalCode.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="streetAddress"
                control={control}
                rules={{ required: "Street Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street Address"
                    fullWidth
                    error={!!errors.streetAddress}
                    helperText={
                      errors.streetAddress ? errors.streetAddress.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Bill To Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Bill To</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="clientName"
                control={control}
                rules={{ required: "Client's Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Client's Name"
                    fullWidth
                    error={!!errors.clientName}
                    helperText={
                      errors.clientName ? errors.clientName.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="clientEmail"
                control={control}
                rules={{
                  required: "Client's Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Client's Email"
                    fullWidth
                    error={!!errors.clientEmail}
                    helperText={
                      errors.clientEmail ? errors.clientEmail.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="clientCountry"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    error={!!errors.clientCountry}
                    helperText={
                      errors.clientCountry ? errors.clientCountry.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="clientCity"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.clientCity}
                    helperText={
                      errors.clientCity ? errors.clientCity.message : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="clientPostalCode"
                control={control}
                rules={{ required: "Postal Code is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    error={!!errors.clientPostalCode}
                    helperText={
                      errors.clientPostalCode
                        ? errors.clientPostalCode.message
                        : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="clientStreetAddress"
                control={control}
                rules={{ required: "Street Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street Address"
                    fullWidth
                    error={!!errors.clientStreetAddress}
                    helperText={
                      errors.clientStreetAddress
                        ? errors.clientStreetAddress.message
                        : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Invoice Details */}
            <Grid item xs={6}>
              <Controller
                name="invoiceDate"
                control={control}
                rules={{ required: "Invoice Date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Invoice Date"
                    type="date"
                    fullWidth
                    required
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.invoiceDate}
                    helperText={
                      errors.invoiceDate ? errors.invoiceDate.message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Payment Terms</InputLabel>
                <Controller
                  name="paymentTerms"
                  control={control}
                  rules={{ required: "Payment Terms are required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      label="Payment Terms"
                      error={!!errors.paymentTerms}
                    >
                      <MenuItem value="Net 10 days">Net 10 days</MenuItem>
                      <MenuItem value="Net 20 days">Net 20 days</MenuItem>
                      <MenuItem value="Net 30 days">Net 30 days</MenuItem>
                    </Select>
                  )}
                />
                {errors.paymentTerms && (
                  <Typography variant="body2" color="error">
                    {errors.paymentTerms.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="projectDescription"
                control={control}
                rules={{ required: "Project Description is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Project Description"
                    fullWidth
                    error={!!errors.projectDescription}
                    helperText={
                      errors.projectDescription
                        ? errors.projectDescription.message
                        : ""
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Items List */}
            <Grid item xs={12}>
              <Typography variant="h6">Items List</Typography>
            </Grid>
            {fields.map((item, index) => (
              <Grid
                container
                spacing={3}
                sx={{ marginBottom: 2, marginLeft: 0, marginTop: 1 }}
                key={item.id}
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Controller
                    name={`items.${index}.name`}
                    control={control}
                    rules={{ required: "Item Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Item Name"
                        fullWidth
                        error={!!errors.items?.[index]?.name}
                        helperText={
                          errors.items?.[index]?.name
                            ? errors.items[index]?.name?.message
                            : ""
                        }
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    rules={{
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Quantity"
                        fullWidth
                        error={!!errors.items?.[index]?.quantity}
                        helperText={
                          errors.items?.[index]?.quantity
                            ? errors.items[index]?.quantity?.message
                            : ""
                        }
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`items.${index}.price`}
                    control={control}
                    rules={{
                      required: "Price is required",
                      min: { value: 0, message: "Price must be non-negative" },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Price"
                        fullWidth
                        error={!!errors.items?.[index]?.price}
                        helperText={
                          errors.items?.[index]?.price
                            ? errors.items[index]?.price?.message
                            : ""
                        }
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => remove(index)} color="primary">
                    <DeleteOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                onClick={() => append({ name: "", quantity: 1, price: 0 })}
                // variant="outlined"
                fullWidth
                sx={{
                  color: "white",
                  borderColor: "rgba(127, 86, 217, 1)",
                  backgroundColor: "rgba(127, 86, 217, 1)",
                }}
              >
                + Add New Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
