var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

//-----------------------------------------------

function calculateSalesTax(salesData, taxRates) {
  // calculates the total sales and total tax, grouped by company.

  var resultObj = {};
  for (company of salesData){
    let provincialSales = sumArray(company["sales"]);
    let name = company["name"];
    let province = company["province"];
    if (resultObj[name]){

      resultObj[name]["totalSales"] += provincialSales;
      resultObj[name]["totalTaxes"] += calculateTax(provincialSales , taxRates[province]);
    }
    else{
      resultObj[name] = {
        totalSales: provincialSales,
        totalTaxes: calculateTax(provincialSales , taxRates[province])
      }
    }
  }

  return resultObj;
}

function calculateTax(sales, taxRate){
  //calculating tax on a single dollar amount with a known rate
  return sales * taxRate;
}

function sumArray(array){
  //sums an array of sales
  var sum = 0;
  for (e of array){
    sum += e;
  }
  return sum;
}

// ------------------------------------------

var results = calculateSalesTax(companySalesData, salesTaxRates);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/

console.log(results);