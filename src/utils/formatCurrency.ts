const formatCurrency = (number:number) => {

  if (number === undefined) {
    return '';
  }
  
    const formattedTotal = number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formattedTotal;
}

export default formatCurrency;