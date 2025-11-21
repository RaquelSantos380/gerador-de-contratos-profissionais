function downloadContract() {
    try {
        const contractContent = generateProfessionalContract();
        
        // Método 1: Download direto
        const blob = new Blob([contractContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contrato-${new Date().getTime()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Método 2: Abrir em nova aba para impressão
        setTimeout(() => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Contrato Profissional</title>
                    <style>
                        body { font-family: Arial; margin: 20px; line-height: 1.6; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>${contractContent}</body>
                </html>
            `);
            printWindow.document.close();
            
            // Dar opção de imprimir
            setTimeout(() => {
                if (confirm('Contrato aberto em nova aba! Deseja imprimir/salvar como PDF?')) {
                    printWindow.print();
                }
            }, 1000);
            
        }, 1000);
        
    } catch (error) {
        console.error('Erro no download:', error);
        alert('❌ Erro ao gerar download. Entre em contato com o suporte.');
    }
}
