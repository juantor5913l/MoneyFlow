import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

function formatCurrency(valor) {

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);

}

async function generateReport(ingresos, gastos) {

  const doc = new jsPDF();

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const hoy = new Date();

  const haceTresMeses = new Date();

  haceTresMeses.setMonth(
    hoy.getMonth() - 3
  );

  const ingresosFiltrados = ingresos.filter(
    (ingreso) =>
      new Date(ingreso.fecha) >= haceTresMeses
  );

  const gastosFiltrados = gastos.filter(
    (gasto) =>
      new Date(gasto.fecha) >= haceTresMeses
  );

  const totalIngresos = ingresosFiltrados.reduce(
    (total, ingreso) =>
      total + Number(ingreso.monto),
    0
  );

  const totalGastos = gastosFiltrados.reduce(
    (total, gasto) =>
      total + Number(gasto.monto),
    0
  );

  const saldo =
    totalIngresos - totalGastos;

  const gastosPorCategoria = {};

  gastosFiltrados.forEach((gasto) => {

    if (gastosPorCategoria[gasto.categoria]) {

      gastosPorCategoria[gasto.categoria] +=
        Number(gasto.monto);

    } else {

      gastosPorCategoria[gasto.categoria] =
        Number(gasto.monto);

    }

  });

  let categoriaMayor = "";
  let mayorGasto = 0;

  Object.entries(gastosPorCategoria).forEach(
    ([categoria, monto]) => {

      if (monto > mayorGasto) {

        mayorGasto = monto;
        categoriaMayor = categoria;

      }

    }
  );

  // ===== HEADER =====

  doc.setFillColor(15, 23, 42);

  doc.rect(
    0,
    0,
    pageWidth,
    45,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(28);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "MONEYFLOW",
    20,
    22
  );

  doc.setFontSize(12);

  doc.setTextColor(180, 180, 180);

  doc.text(
    "Financial Report",
    20,
    32
  );

  doc.text(
    hoy.toLocaleDateString(),
    pageWidth - 40,
    32
  );

  // ===== RESUMEN =====

  doc.setTextColor(15, 23, 42);

  doc.setFontSize(18);

  doc.text(
    "Resumen financiero",
    20,
    65
  );

  const cards = [

    {
      title: "Ingresos",
      value: formatCurrency(totalIngresos),
      color: [34, 197, 94]
    },

    {
      title: "Gastos",
      value: formatCurrency(totalGastos),
      color: [239, 68, 68]
    },

    {
      title: "Saldo",
      value: formatCurrency(saldo),
      color: [59, 130, 246]
    }

  ];

  let x = 20;

  cards.forEach((card) => {

    doc.setFillColor(
      248,
      250,
      252
    );

    doc.roundedRect(
      x,
      75,
      52,
      35,
      6,
      6,
      "F"
    );

    doc.setDrawColor(
      230,
      230,
      230
    );

    doc.roundedRect(
      x,
      75,
      52,
      35,
      6,
      6
    );

    doc.setFontSize(11);

    doc.setTextColor(100);

    doc.text(
      card.title,
      x + 5,
      87
    );

    doc.setFontSize(14);

    doc.setTextColor(
      ...card.color
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      card.value,
      x + 5,
      100
    );

    x += 58;

  });

  // ===== INSIGHT =====

  doc.setTextColor(15, 23, 42);

  doc.setFontSize(16);

  doc.text(
    "Insight principal",
    20,
    130
  );

  doc.setFontSize(12);

  doc.setTextColor(90);

  doc.text(
    `La categoría con mayor gasto fue "${categoriaMayor}" con un total de ${formatCurrency(mayorGasto)}.`,
    20,
    142,
    {
      maxWidth: 170
    }
  );

  // ===== CHART =====

  const chartElement =
    document.getElementById(
      "financial-chart"
    );

  if (chartElement) {

    const canvas =
      await html2canvas(
        chartElement,
        {
          backgroundColor: null,
          scale: 2
        }
      );

    const imageData =
      canvas.toDataURL(
        "image/png"
      );

    doc.addImage(
      imageData,
      "PNG",
      20,
      155,
      170,
      95
    );

  }

  // ===== PAGE 2 =====

  doc.addPage();

  doc.setFontSize(24);

  doc.setTextColor(
    15,
    23,
    42
  );

  doc.text(
    "Movimientos financieros",
    20,
    25
  );

  // ===== INGRESOS =====

  doc.setFontSize(16);

  doc.text(
    "Ingresos",
    20,
    45
  );

  autoTable(doc, {

    startY: 52,

    styles: {
      fontSize: 10,
      cellPadding: 4
    },

    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },

    bodyStyles: {
      textColor: [50, 50, 50]
    },

    head: [[
      "Descripción",
      "Monto",
      "Fecha"
    ]],

    body: ingresosFiltrados.map(
      (ingreso) => [

        ingreso.descripcion,

        formatCurrency(
          ingreso.monto
        ),

        new Date(
          ingreso.fecha
        ).toLocaleDateString()

      ]
    )
  });

  // ===== GASTOS =====

  doc.setFontSize(16);

  doc.text(
    "Gastos",
    20,
    doc.lastAutoTable.finalY + 20
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 27,

    styles: {
      fontSize: 10,
      cellPadding: 4
    },

    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },

    bodyStyles: {
      textColor: [50, 50, 50]
    },

    head: [[
      "Descripción",
      "Categoría",
      "Monto",
      "Fecha"
    ]],

    body: gastosFiltrados.map(
      (gasto) => [

        gasto.descripcion,

        gasto.categoria,

        formatCurrency(
          gasto.monto
        ),

        new Date(
          gasto.fecha
        ).toLocaleDateString()

      ]
    )
  });

  // ===== FOOTER =====

  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {

    doc.setPage(i);

    doc.setFontSize(10);

    doc.setTextColor(150);

    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth - 35,
      290
    );

  }

  doc.save(
    "moneyflow-report.pdf"
  );

}

export default generateReport;