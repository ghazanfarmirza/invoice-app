// mutations.ts
import { gql } from "@apollo/client";

export const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
      clientName
      clientEmail
      invoiceDate
      paymentTerms
      projectDescription
      items {
        name
        quantity
        price
      }
      totalAmount
    }
  }
`;
