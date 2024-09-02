// import React, { useState } from "react";
// import InvoiceForm from "./components/InvoiceForm";
// import InvoicePreview from "./components/InvoicePreview";
// import { Container, Grid, Box } from "@mui/material";
// import { ApolloProvider } from "@apollo/client";
// import client from "./apolloClient";
// import { InvoiceFormData } from "./types";

// const App: React.FC = () => {
//   const [formData, setFormData] = useState<InvoiceFormData>({
//     companyName: "",
//     companyEmail: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     clientName: "",
//     clientEmail: "",
//     clientStreetAddress: "",
//     clientCity: "",
//     clientCountry: "",
//     clientPostalCode: "",
//     invoiceDate: new Date().toISOString().split("T")[0],
//     paymentTerms: "Net 30 days",
//     projectDescription: "",
//     items: [],
//   });

//   return (
//     <ApolloProvider client={client}>
//       <Container maxWidth="lg">
//         <Box my={4}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={8}>
//               <InvoiceForm onFormChange={setFormData} />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <InvoicePreview data={formData} />
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </ApolloProvider>
//   );
// };

// export default App;

// App.tsx
import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import Header from "./components/Header";
import { Container, Grid, Box } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { InvoiceFormData } from "./types";

const App: React.FC = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
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
    items: [],
  });

  const handleSave = () => {
    // Implement save logic
    console.log("Save clicked");
  };

  const handleReset = () => {
    // Implement reset logic
    console.log("Reset clicked");
  };

  return (
    <ApolloProvider client={client}>
      <Container maxWidth="lg">
        <Box my={4}>
          <Header onSave={handleSave} onReset={handleReset} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <InvoiceForm
                onFormChange={setFormData}
                onSave={handleSave}
                onReset={handleReset}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InvoicePreview data={formData} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ApolloProvider>
  );
};

export default App;
