
document.getElementById('downloadButton').addEventListener('click', async function () {
 var orderId = this.dataset.productId;

 try {
     const loadingIndicator = document.getElementById('loadingIndicator');
     loadingIndicator.style.display = 'block';
     const response = await fetch(`/user/orderSummery/download/${orderId}`);
     if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
     }

     const data = await response.text();
     document.getElementById('HiddenInvoice').innerHTML = data;
     document.addEventListener('DOMContentLoaded', function() {
     alert('hi');
     });
     await new Promise(resolve => setTimeout(resolve,0));
     loadingIndicator.style.display = 'none';

     let invoice = document.getElementById('HiddenInvoice')
     var element = document.getElementById('element-to-print');
     var opt = {
     margin:       0,
     filename:     'myfile.pdf',
     image:        { type: 'jpeg', quality: 0.98 },
     html2canvas:  { scale: 2 },
     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
     };
     const pdfBlob = await html2pdf().set(opt).from(invoice).outputPdf('blob');
     const pdfUrl = URL.createObjectURL(pdfBlob);
     // New Promise-based usage:
     
     window.open(pdfUrl, '_blank');
     setTimeout(() => {
         invoice.style.display = 'none'
     }, 0);
     
 } catch (error) {
     console.error('Error:', error);
     // Handle the error appropriately, e.g., show a user-friendly message
     // You might want to provide feedback to the user that the PDF generation failed
 }
});


