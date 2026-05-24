function formatCurrency(valor) {

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(valor);

}

export default formatCurrency;