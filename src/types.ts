export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceFormData {
  companyName: string;
  companyEmail: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientCountry: string;
  clientPostalCode: string;
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
  items: InvoiceItem[];
}
