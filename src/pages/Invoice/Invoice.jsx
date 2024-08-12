// import htmlToPdfmake from "html-to-pdfmake";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const Invoice = ({ order }) => {
//   const generatePDF = () => {
//     const html = `
//     <style>
//       body {
//         margin-top: 20px;
//         background: #eee;
//       }
//       .invoice {
//         padding: 30px;
//         background: #fff;
//         border-radius: 2px;
//         margin-bottom: 25px;
//         box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
//       }
//       .invoice-title {
//         text-align: center;
//       }
//       .invoice h2 {
//         margin-top: 0px;
//         line-height: 0.8em;
//       }
//       .invoice .small {
//         font-weight: 300;
//       }
//       .invoice hr {
//         margin-top: 10px;
//         border-color: #ddd;
//       }
//       .invoice .table tr.line {
//         border-bottom: 1px solid #ccc;
//       }
//       .invoice .table td {
//         border: none;
//       }
//       .invoice .identity {
//         margin-top: 10px;
//         font-size: 1.1em;
//         font-weight: 300;
//       }
//       .invoice .identity strong {
//         font-weight: 600;
//       }
//       .text-end {
//         text-align: right;
//       }
//       .text-muted {
//         color: #6c757d;
//       }
//       .font-size-15 {
//         font-size: 15px;
//       }
//       .font-size-16 {
//         font-size: 16px;
//       }
//       .font-size-14 {
//         font-size: 14px;
//       }
//       .mb-1 {
//         margin-bottom: 1rem;
//       }
//       .mb-2 {
//         margin-bottom: 2rem;
//       }
//       .mb-3 {
//         margin-bottom: 3rem;
//       }
//       .mb-4 {
//         margin-bottom: 4rem;
//       }
//       .mt-4 {
//         margin-top: 4rem;
//       }
//       .badge {
//         padding: 0.5em;
//         color: #fff;
//       }
//       .badge.bg-success {
//         background-color: #28a745;
//       }
//       .fw-semibold {
//         font-weight: 600;
//       }
//       .me-1 {
//         margin-end: 1rem;
//       }
//       .ms-2 {
//         margin-start: 2rem;
//       }
//       .d-print-none {
//         display: none !important;
//       }
//       .container {
//         max-width: 960px;
//         margin: auto;
//       }
//       .row {
//         display: flex;
//         flex-wrap: wrap;
//       }
//       .col-lg-12 {
//         flex: 0 0 100%;
//         max-width: 100%;
//       }
//       .card {
//         background: #fff;
//         border: 1px solid rgba(0, 0, 0, 0.125);
//         border-radius: 0.25rem;
//       }
//       .card-body {
//         padding: 1.25rem;
//       }
//       .table {
//         width: 100%;
//         margin-bottom: 1rem;
//         color: #212529;
//       }
//       .table th,
//       .table td {
//         padding: 0.75rem;
//         vertical-align: top;
//       }
//       .table .align-middle {
//         vertical-align: middle;
//       }
//       .table .table-nowrap {
//         white-space: nowrap;
//       }
//       .table .table-centered {
//         text-align: center;
//       }
//     </style>
//     <div class="container">
//       <div class="row">
//         <div class="col-lg-12">
//           <div class="card">
//             <div class="card-body">
//               <div class="invoice-title">
//                 <h4 class="float-end font-size-15">Invoice #${
//                   order.order_no
//                 } <span class="badge bg-success font-size-12 ms-2">${
//       order.payment_status
//     }</span></h4>
//                 <div class="mb-4">
//                   <h2 class="mb-1 text-muted">Your Company Name</h2>
//                 </div>
//                 <div class="text-muted">
//                   <p class="mb-1">Your Address</p>
//                   <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i> your-email@example.com</p>
//                   <p><i class="uil uil-phone me-1"></i> Your Phone Number</p>
//                 </div>
//               </div>
//               <hr class="my-4">
//               <div class="row">
//                 <div class="col-sm-6">
//                   <div class="text-muted">
//                     <h5 class="font-size-16 mb-3">Billed To:</h5>
//                     <h5 class="font-size-15 mb-2">${order.name}</h5>
//                     <p class="mb-1">${order.address}, ${order.locality}, ${
//       order.city
//     } - ${order.pincode}</p>
//                     <p class="mb-1">${order.ph_no}</p>
//                   </div>
//                 </div>
//                 <div class="col-sm-6">
//                   <div class="text-muted text-end">
//                     <div>
//                       <h5 class="font-size-15 mb-1">Invoice No:</h5>
//                       <p>#${order.order_no}</p>
//                     </div>
//                     <div class="mt-4">
//                       <h5 class="font-size-15 mb-1">Invoice Date:</h5>
//                       <p>${new Date(order.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <div class="mt-4">
//                       <h5 class="font-size-15 mb-1">Order No:</h5>
//                       <p>#${order.order_no}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="py-2">
//                 <h5 class="font-size-15">Order Summary</h5>
//                 <div class="table-responsive">
//                   <table class="table align-middle table-nowrap table-centered mb-0">
//                     <thead>
//                       <tr>
//                         <th style="width: 70px;">No.</th>
//                         <th>Item</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th class="text-end" style="width: 120px;">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       ${order.order_details
//                         .map(
//                           (item, index) => `
//                         <tr>
//                           <th scope="row">${index + 1}</th>
//                           <td>
//                             <div>
//                               <h5 class="text-truncate font-size-14 mb-1">Product ${
//                                 item.proId
//                               }</h5>
//                             </div>
//                           </td>
//                           <td>$${item.price}</td>
//                           <td>${item.qty}</td>
//                           <td class="text-end">$${item.price * item.qty}</td>
//                         </tr>
//                       `
//                         )
//                         .join("")}
//                       <tr>
//                         <th scope="row" colspan="4" class="text-end">Sub Total</th>
//                         <td class="text-end">$${order.order_details.reduce(
//                           (acc, item) => acc + item.price * item.qty,
//                           0
//                         )}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row" colspan="4" class="border-0 text-end">
//                           Shipping Charge :</th>
//                         <td class="border-0 text-end">$${order.order_details.reduce(
//                           (acc, item) => acc + item.total_shipping_price,
//                           0
//                         )}</td>
//                       </tr>
//                       <tr>
//                         <th scope="row" colspan="4" class="border-0 text-end">Total</th>
//                         <td class="border-0 text-end"><h4 class="m-0 fw-semibold">$${
//                           order.order_price
//                         }</h4></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div class="d-print-none mt-4">
//                   <div class="float-end">
//                     <a href="javascript:window.print()" class="btn btn-success me-1"><i class="fa fa-print"></i></a>
//                     <a href="#" class="btn btn-primary w-md">Send</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;

//     const pdfContent = htmlToPdfmake(html);
//     const docDefinition = { content: pdfContent };

//     pdfMake.createPdf(docDefinition).download(`Invoice_${order.order_no}.pdf`);
//   };

//   return (
//     <div>
//       <button
//         style={{
//           outline: "none",
//           border: "none",
//           padding: "10px 20px",
//         }}
//         onClick={generatePDF}
//       >
//         Download Invoice
//       </button>
//     </div>
//   );
// };


const Invoice = ({order}) =>{
  return (
    <h1>Return</h1>
  )
}

export default Invoice;
