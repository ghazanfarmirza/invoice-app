// import React from "react";
// import { Typography, Card, CardContent, Box, Divider } from "@mui/material";
// import { InvoiceFormData } from "../types";

// const InvoicePreview: React.FC<{ data: InvoiceFormData }> = ({ data }) => {
//   const calculateSubtotal = () =>
//     data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const tax = subtotal * 0.1; // Assuming a fixed 10% tax rate
//     return subtotal + tax;
//   };

//   const textStyle = { color: "#101828", fontWeight: 500 };
//   const labelStyle = { color: "#76787D", fontWeight: 400 };

//   const renderDetail = (label: string, value: string) => (
//     <Box>
//       <Typography variant="body2" sx={labelStyle}>
//         {label}
//       </Typography>
//       <Typography variant="body2" sx={textStyle}>
//         {value}
//       </Typography>
//     </Box>
//   );

//   return (
//     <Card
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         padding: "12px",
//         gap: "16px",
//         width: "100%",
//         height: "auto",
//         background: "#FFFFFF",
//         boxShadow:
//           "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
//         borderRadius: "16px",
//       }}
//     >
//       <CardContent
//         sx={{
//           width: "100%",
//           padding: 0,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           gap: "16px",
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Preview
//         </Typography>
//         <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{
//               fontWeight: 600,
//               fontSize: "18px",
//               lineHeight: "38px",
//               color: "#101828",
//             }}
//           >
//             New Invoice
//           </Typography>

//           <Divider sx={{ background: "#EAECF0", mb: 2 }} />

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             {renderDetail("Invoice Date", data.invoiceDate)}
//             {renderDetail("Payment Terms", data.paymentTerms)}
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Box>
//               <Typography variant="body2" sx={labelStyle}>
//                 Billed From
//               </Typography>
//               {renderDetail("", data.companyName)}
//               {renderDetail("", data.companyEmail)}
//               {renderDetail("", data.streetAddress)}
//               {renderDetail("", `${data.city}, ${data.postalCode}`)}
//               {renderDetail("", data.country)}
//             </Box>
//             <Box>
//               <Typography variant="body2" sx={labelStyle}>
//                 Billed To
//               </Typography>
//               {renderDetail("", data.clientName)}
//               {renderDetail("", data.clientEmail)}
//               {renderDetail("", data.clientStreetAddress)}
//               {renderDetail("", `${data.clientCity}, ${data.clientPostalCode}`)}
//               {renderDetail("", data.clientCountry)}
//             </Box>
//           </Box>

//           <Box sx={{ mb: 2 }}>
//             <Typography variant="body2" sx={labelStyle}>
//               Project Description
//             </Typography>
//             <Typography variant="body2" sx={textStyle}>
//               {data.projectDescription}
//             </Typography>
//           </Box>

//           <Box sx={{ background: "#F5F5F5", borderRadius: "4px", p: 1, mb: 2 }}>
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{ ...labelStyle, width: "164px" }}
//               >
//                 Item
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ ...labelStyle, width: "120px" }}
//               >
//                 Qty.
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ ...labelStyle, width: "140px" }}
//               >
//                 Price
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ ...labelStyle, textAlign: "right", width: "140px" }}
//               >
//                 Total Amount
//               </Typography>
//             </Box>
//             {data.items.map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography
//                   variant="body2"
//                   sx={{ ...textStyle, width: "164px" }}
//                 >
//                   {item.name}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ ...textStyle, width: "120px" }}
//                 >
//                   {item.quantity}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ ...textStyle, width: "140px" }}
//                 >
//                   ${item.price}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ ...textStyle, textAlign: "right", width: "140px" }}
//                 >
//                   ${item.price * item.quantity}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 600 }}
//             >
//               Subtotal
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 600, textAlign: "right" }}
//             >
//               ${calculateSubtotal().toFixed(2)}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 600 }}
//             >
//               Tax
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 600, textAlign: "right" }}
//             >
//               10%
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 700 }}
//             >
//               Total
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "#101828", fontWeight: 700, textAlign: "right" }}
//             >
//               ${calculateTotal().toFixed(2)}
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default InvoicePreview;

import React from "react";
import { Typography, Card, CardContent, Box, Divider } from "@mui/material";
import { InvoiceFormData } from "../types";

const InvoicePreview: React.FC<{ data: InvoiceFormData }> = ({ data }) => {
  const calculateSubtotal = () =>
    data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // Assuming a fixed 10% tax rate
    return subtotal + tax;
  };

  const textStyle = { color: "#101828", fontWeight: 500 };
  const labelStyle = { color: "#76787D", fontWeight: 400 };

  const renderDetail = (label: string, value: string) => (
    <Box>
      <Typography variant="body2" sx={labelStyle}>
        {label}
      </Typography>
      <Typography variant="body2" sx={textStyle}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "24px",
        gap: "16px",
        width: "100%",
        height: "auto",
        background: "#FFFFFF",
        boxShadow:
          "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        borderRadius: "16px",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "38px",
              color: "#101828",
            }}
          >
            New Invoice
          </Typography>

          <Divider sx={{ background: "#EAECF0", mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            {renderDetail("Invoice Date", data.invoiceDate)}
            {renderDetail("Payment Terms", data.paymentTerms)}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={labelStyle}>
                Billed From
              </Typography>
              {renderDetail("", data.companyName)}
              {renderDetail("", data.companyEmail)}
              {renderDetail("", data.streetAddress)}
              {renderDetail("", `${data.city}, ${data.postalCode}`)}
              {renderDetail("", data.country)}
            </Box>
            <Box>
              <Typography variant="body2" sx={labelStyle}>
                Billed To
              </Typography>
              {renderDetail("", data.clientName)}
              {renderDetail("", data.clientEmail)}
              {renderDetail("", data.clientStreetAddress)}
              {renderDetail("", `${data.clientCity}, ${data.clientPostalCode}`)}
              {renderDetail("", data.clientCountry)}
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={labelStyle}>
              Project Description
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              {data.projectDescription}
            </Typography>
          </Box>

          <Box sx={{ background: "#F5F5F5", borderRadius: "4px", p: 1, mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ ...labelStyle, width: "164px" }}
              >
                Item
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...labelStyle, width: "120px" }}
              >
                Qty.
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...labelStyle, width: "140px" }}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                sx={{ ...labelStyle, textAlign: "right", width: "140px" }}
              >
                Total Amount
              </Typography>
            </Box>
            {data.items.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ ...textStyle, width: "164px" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ ...textStyle, width: "120px" }}
                >
                  {item.quantity}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ ...textStyle, width: "140px" }}
                >
                  ${item.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ ...textStyle, textAlign: "right", width: "140px" }}
                >
                  ${item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 600 }}
            >
              Subtotal
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 600, textAlign: "right" }}
            >
              ${calculateSubtotal().toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 600 }}
            >
              Tax
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 600, textAlign: "right" }}
            >
              10%
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 700 }}
            >
              Total
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#101828", fontWeight: 700, textAlign: "right" }}
            >
              ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoicePreview;
