// Name and Occupation/job title
async function syncRandomDataApi() {
  const url = new URL(`https://random-data-api.com/api/v2/users`);
  const response = await fetch(url);
  const data = await response.json();

  // These are currently global variables.
  // Figure out another way to define them to where
  // they can be referenced outside of this function.
  tpName = data.first_name + " " + data.last_name;
  occupation = data.employment.title;
  
  document.getElementById("id-occ").innerHTML = occupation;
  document.getElementById("id-name").innerHTML = tpName;
}

// Cost basis
async function syncCostBasis() {
  const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const response = await fetch(url);
  const data = await response.json();
  console.log("CostBasis Fetch " + data.bpi.USD.rate);
  costBasis = Math.round(parseFloat(data.bpi.USD.rate.replace(/,/g,'')));
  document.getElementById("id-cost-basis").innerHTML = costBasis;
}

// Company name
async function syncCompanyName() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  companyName = data[randomIndex].company.name;
  document.getElementById("id-company").innerHTML = companyName;
}

async function calcFn() {

  try {
    await Promise.all([
      syncRandomDataApi(),
      syncCostBasis(),
      syncCompanyName(),
    ]);

  function getBracket(num) {
    return num >= 609351 && num < 1000000000
      ? ((rate = 0.37), (lowerBrackets = 183647.25), (floor = 609350))
      : num >= 243726 && num <= 609350
      ? ((rate = 0.35), (lowerBrackets = 55678.5), (floor = 243725))
      : num >= 191951 && num <= 243725
      ? ((rate = 0.32), (lowerBrackets = 39110.5), (floor = 191950))
      : num >= 100526 && num <= 191950
      ? ((rate = 0.24), (lowerBrackets = 17168.5), (floor = 100525))
      : num >= 47151 && num <= 100525
      ? ((rate = 0.22), (lowerBrackets = 5426), (floor = 47150))
      : num >= 11601 && num <= 47150
      ? ((rate = 0.12), (lowerBrackets = 1160), (floor = 11600))
      : num > 0 && num <= 11600
      ? ((rate = 0.1), (lowerBrackets = 0), (floor = 0))
      : num <= 0
      ? ((rate = 0), (lowerBrackets = 0), (floor = 0))
      : console.log("Error.");
  }

  function getLtcgBracket(num) {
    return num > 518900 && num < 999999999
      ? (ltcgRate = 0.2)
      : num > 47025 && num < 518900
      ? (ltcgRate = 0.15)
      : num > 0 && num < 47025
      ? (ltcgRate = 0.0)
      : console.log("Error.");
  }

  function noNegativeNumber(num) {
    return num > 0
      ? (taxableIncLtcg = prelimTaxableInc)
      : num <= 0
      ? (taxableIncLtcg = 0)
      : console.log("Error.");
  }

  function getNiitThreshold(num) {
    return num > 200000
      ? ((niiThreshold = 200000), (niitRate = 0.038))
      : num <= 200000
      ? ((niiThreshold = 0), (niitRate = 0))
      : console.log("Error.");
  }

  function usdFormat(num) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }

  function percentFormat(num) {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
    }).format(num);
  }

  function percentFormat1Dec(num) {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  }

  console.log(`Test function - syncRandomDataApi:
    \nName: ${tpName}
    \nOccupation: ${occupation}
    `);

  ordInc = Math.round(Math.random() * 900000 + 1000);
  // USE LINE FOR TESTING ordInc = 714600;
  salesPrice = Math.round(Math.random() * 260000) + 68369;
  // costBasis is defined in the syncCostBasis() function.
  ltcg = salesPrice - costBasis;
  // USE LINE FOR TESTING ltcg = 300000;

  console.log(`Test functions - syncCostBasis, syncCompanyName:
    \n ${companyName} company name
    \n ${costBasis} cost basis
  `);

  console.log(`Test variable definition:
    \n ${salesPrice} sales price
    \n ${ltcg} ltcg
  `);

  addtlInc = 0;
  totalInc = ordInc + ltcg + addtlInc;
  adjToInc = 0;
  agi = ordInc + ltcg + addtlInc - adjToInc;
  itemDed = 0;
  stdDed = 14600;
  prelimTaxableInc = agi - stdDed;
  
  noNegativeNumber(prelimTaxableInc);

  console.log(`Test calculation:
    \n ${agi} AGI
    \n ${prelimTaxableInc} Prelim. taxable income
    \n ${taxableIncLtcg} TI CG    
  `);

  // taxableIncLtcg is defined in the noNegativeNumber(prelimTaxableInc) function.
  getBracket(taxableIncLtcg);
  ordIncRate = rate;
  ordIncLwrBrkts = lowerBrackets;
  ordIncFloor = floor;

  taxableIncLtcgBrkt = Math.round((taxableIncLtcg - ordIncFloor) * ordIncRate);
  console.log("Test: " + ordIncRate + " Ordinary income rate");
  taxableIncLtcgTax = Math.round(ordIncLwrBrkts + taxableIncLtcgBrkt);

  getLtcgBracket(taxableIncLtcg);
  ltcgTax = Math.round(ltcg * ltcgRate);

  taxableIncNoLtcg = taxableIncLtcg - ltcg;
  console.log("Test: " + taxableIncNoLtcg + " TI no CG");

  getBracket(taxableIncNoLtcg);
  taxableIncNoLtcgRate = rate;
  taxableIncNoLtcgLwrBrkts = lowerBrackets;
  taxableIncNoLtcgFloor = floor;

  taxableIncNoLtcgBrkt = Math.round((taxableIncNoLtcg - taxableIncNoLtcgFloor) * taxableIncNoLtcgRate);
  taxableIncNoLtcgTax = Math.round(taxableIncNoLtcgLwrBrkts + taxableIncNoLtcgBrkt);
  taxableIncLtcgTaxedSeparately = taxableIncNoLtcgTax + ltcgTax;
  taxableIncLtcgTaxedTogether = taxableIncLtcgTax;

  lowerOfTwoTaxes = Math.min(taxableIncLtcgTaxedTogether, taxableIncLtcgTaxedSeparately);

  prelimNii = 300000;
  magi = agi + adjToInc;
  niiThreshold = 200000;
  getNiitThreshold(magi);
  magiOverThreshold = magi - niiThreshold;
  nii = Math.min(magiOverThreshold, prelimNii);
  niit = Math.round(nii * niitRate);
  // USE LINE FOR TESTING niit = 0;

  totalTax = lowerOfTwoTaxes + niit;

  console.log(`Tax Breakdown:
    \n+ ${ordInc} ordinary income
    \n+ ${ltcg} capital gains
    \n- ${stdDed} standard deduction
    \n= ${taxableIncLtcg} taxable income
    \n- ${ordIncFloor} floor
    \n= ${taxableIncLtcg - ordIncFloor} (TI - floor)
    \n* ${ordIncRate} OI rate
    \n= ${Math.round((taxableIncLtcg - ordIncFloor) * ordIncRate)} tax within bracket
    \n+ ${Math.round(ordIncLwrBrkts)} OI lower brackets
    \n= ${taxableIncLtcgTax} Tax A [OI CG taxed together]
    \n\n+ ${taxableIncNoLtcgTax} OI tax
    \n+ ${ltcgTax} CG tax
    \n= ${taxableIncLtcgTaxedSeparately} Tax B [OI CG taxed separately]
    \n\n${lowerOfTwoTaxes} lower of A and B
    \n\n+ ${taxableIncNoLtcgTax} OI tax from A
    \n+ ${ltcgTax} CG tax from A
    \n+ ${niit} NIIT
    \n= ${totalTax} Total tax
  `);

  document.getElementById("id-sales-price").innerHTML = usdFormat(salesPrice);
  document.getElementById("id-cost-basis").innerHTML = usdFormat(costBasis);
  document.getElementById("id-ord-inc").innerHTML = usdFormat(ordInc);
  document.getElementById("id-itemized").innerHTML = usdFormat(itemDed);
  document.getElementById("id-std-ded").innerHTML = usdFormat(stdDed);
  document.getElementById("id-ord-inc-rate").innerHTML = percentFormat(ordIncRate);
  document.getElementById("id-ord-inc-tax").innerHTML = usdFormat(taxableIncNoLtcgTax);

  document.getElementById("id-holding-period").innerHTML = "> 1 year"
  document.getElementById("id-ltcg").innerHTML = usdFormat(ltcg);
  document.getElementById("id-ltcg-rate").innerHTML = percentFormat(ltcgRate);
  document.getElementById("id-ltcg-tax").innerHTML = usdFormat(ltcgTax);

  document.getElementById("id-nii").innerHTML = usdFormat(nii);
  document.getElementById("id-niit-rate").innerHTML = percentFormat1Dec(niitRate);
  document.getElementById("id-niit-tax").innerHTML = usdFormat(niit);

  document.getElementById("id-total-tax").innerHTML = usdFormat(totalTax);
  document.getElementById("id-summary-amount").innerHTML = usdFormat(totalTax);
  

 document.getElementById("id-item5").innerHTML = "Wages";
 document.getElementById("id-item6").innerHTML = usdFormat(1000000);
 document.getElementById("id-item7").innerHTML = usdFormat(0);
 document.getElementById("id-item8").innerHTML = "Capital gains";
 document.getElementById("id-item9").innerHTML = usdFormat(0);
 document.getElementById("id-item10").innerHTML = usdFormat(1000000);
 document.getElementById("id-item11").innerHTML = "Standard deduction";
 document.getElementById("id-item12").innerHTML = usdFormat(12400);
 document.getElementById("id-item13").innerHTML = usdFormat(12400);
 document.getElementById("id-item14").innerHTML = "Taxable income";
 document.getElementById("id-item15").innerHTML = usdFormat(987600);
 document.getElementById("id-item16").innerHTML = usdFormat(987600);
 document.getElementById("id-item17").innerHTML = "Tax after credits";
 document.getElementById("id-item18").innerHTML = usdFormat(329839);
 document.getElementById("id-item19").innerHTML = usdFormat(171928);
 document.getElementById("id-item20").innerHTML = "Other taxes";
 document.getElementById("id-item21").innerHTML = usdFormat(7200);
 document.getElementById("id-item22").innerHTML = usdFormat(30400);
 document.getElementById("id-item23").innerHTML = "Total tax";
 document.getElementById("id-item24").innerHTML = usdFormat(337039);
 document.getElementById("id-item25").innerHTML = usdFormat(202328);



} catch (error) {
  console.error("Error: promises did not complete before calculation function", error);
};
}