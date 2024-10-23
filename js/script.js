let qrCodeUrl = ""; // Variável para armazenar a URL do QR Code
let logoImage = new Image(); // Imagem da logo

document.getElementById("generateBtn").addEventListener("click", function() {
    qrCodeUrl = document.getElementById("urlInput").value; // Captura o link do input

    if (!qrCodeUrl) {
        alert("Por favor, insira um link válido.");
        return;
    }

    // Gera o QR Code usando a API do goqr.me
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");

    // Limpa o canvas antes de gerar um novo QR Code
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gera o QR Code
    const qrImg = new Image();
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}&size=300x300`;
    qrImg.onload = function() {
        ctx.drawImage(qrImg, 0, 0, canvas.width, canvas.height); // Desenha o QR Code

        // Verifica se a logo foi carregada
        if (logoImage.src && logoImage.complete && logoImage.naturalHeight !== 0) {
            const logoSize = 60; // Tamanho da logo
            const x = (canvas.width / 2) - (logoSize / 2);
            const y = (canvas.height / 2) - (logoSize / 2);


            ctx.fillStyle = "white";
            ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);


            ctx.drawImage(logoImage, x, y, logoSize, logoSize);
        }
    };
});

// Evento para carregar a logo do usuário
document.getElementById("uploadBtn").addEventListener("click", function() {
    document.getElementById("logoInput").click();
});

document.getElementById("logoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
