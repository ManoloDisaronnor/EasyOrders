import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generates a PDF document from the content of a specified HTML element.
 * The element is captured as an image and then added to a PDF document.
 */
const generatePDF = () => {
  const input = document.getElementById("pdf-content"); // ID del contenedor a capturar
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convierte el canvas a una imagen en formato PNG
    const pdf = new jsPDF("p", "mm", "a4"); // Crea un nuevo documento PDF en formato A4
    const imgWidth = 210; // Ancho de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura proporcional

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Agrega la imagen al PDF
    pdf.save("documento.pdf"); // Guarda el PDF con el nombre "documento.pdf"
  });
};

export default generatePDF;