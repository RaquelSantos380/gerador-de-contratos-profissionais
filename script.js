function processPayment() {
    const selectedPayment = document.querySelector('.payment-option.selected');
    if (!selectedPayment) {
        alert('Por favor, selecione uma forma de pagamento.');
        return;
    }

    // Simular processamento de pagamento
    alert('💳 Processando pagamento...');
    
    // Gerar e baixar contrato
    setTimeout(() => {
        downloadContractAsPDF();
        alert('🎉 Pagamento aprovado! Contrato baixado com sucesso!');
        closePaymentModal();
    }, 2000);
}

// FUNÇÃO DE DOWNLOAD EM PDF (REAL)
function downloadContractAsPDF() {
    const contractContent = generateProfessionalContract();
    
    // Criar uma nova janela para impressão/PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Contrato Profissional</title>
            <style>
                body { 
                    font-family: 'Times New Roman', Times, serif; 
                    line-height: 1.6;
                    margin: 2cm;
                    font-size: 12px;
                }
                .contract-header { 
                    text-align: center; 
                    margin-bottom: 2rem; 
                    border-bottom: 2px solid #000;
                    padding-bottom: 1rem;
                }
                .contract-title { 
                    font-size: 16px; 
                    font-weight: bold; 
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                }
                .contract-clause { 
                    margin-bottom: 15px; 
                    text-align: justify;
                }
                .contract-clause h4 {
                    font-size: 11px;
                    margin-bottom: 8px;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .contract-clause p {
                    margin-bottom: 6px;
                    text-indent: 15px;
                }
                .signature-line {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 50px;
                }
                .signature-box {
                    width: 45%;
                    text-align: center;
                }
                .signature-line-style {
                    border-top: 1px solid #000;
                    padding-top: 5px;
                    margin-top: 40px;
                }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            ${contractContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Dar tempo para carregar e então imprimir/baixar como PDF
    setTimeout(() => {
        printWindow.print();
        // Fechar janela após impressão
        setTimeout(() => {
            printWindow.close();
        }, 1000);
    }, 500);
}

// FUNÇÃO ALTERNATIVA - DOWNLOAD COMO DOCX (Word)
function downloadContractAsDOCX() {
    const contractContent = generateProfessionalContract();
    
    // Converter HTML para texto formatado
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contractContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    const blob = new Blob([plainText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-profissional-${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
