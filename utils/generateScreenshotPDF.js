import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

export async function generateScreenshotPDF(
  elementId,
  fileName = "TiaSume-Resume"
) {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Resume preview not found");
    return;
  }

  try {
    const scale = 2; // Improve quality
    const style = {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
    };

    const param = {
      height: element.offsetHeight * scale,
      width: element.offsetWidth * scale,
      quality: 1,
      style,
    };

    const imgData = await domtoimage.toPng(element, param);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const imgWidth = pdfWidth;
    const imgHeight = (elementHeight * imgWidth) / elementWidth;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Extra pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Failed to generate PDF");
  }
}
