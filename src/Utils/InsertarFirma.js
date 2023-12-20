import { PDFDocument } from "pdf-lib";

const insertarFirma = async (pdfBase64, firmaBase64) => {
  const pdfDoc = await PDFDocument.load(pdfBase64);
  const page = pdfDoc.getPage(0);

  
  const firmaImagen = await pdfDoc.embedPng(firmaBase64);
  const { width, height } = firmaImagen.scale(0.6);

  page.drawImage(firmaImagen, {
    x: 275,
    y: 75,
    width,
    height,
    opacity: 0.9,
  });

  // Guardar el nuevo PDF con la firma
  const pdfModificadoBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfModificadoBytes], { type: "application/pdf" });
  console.log("PDF con firma guardado: ", pdfModificadoBytes);
  return pdfBlob
};


export default insertarFirma;