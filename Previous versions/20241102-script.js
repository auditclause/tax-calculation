async function syncCoinDesk() {
  const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const response = await fetch(url);
  const data = await response.json();
  console.log("CoinDesk Fetch " + data.bpi.USD.rate);
  costBasis = Math.round(parseFloat(data.bpi.USD.rate.replace(/,/g,'')));
  document.getElementById("id-cost-basis").innerHTML = costBasis;
}

async function syncDataJsonPlaceholder() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  document.getElementById("id-company").innerHTML = data[randomIndex].company.name;
  document.getElementById("m-id-asyncUser1").innerHTML = data[randomIndex].company.name;
  document.getElementById("m-id-asyncUser2").innerHTML = data[randomIndex].address.city;
  document.getElementById("m-id-asyncUser3").innerHTML = data[randomIndex].website;
}

async function syncDataBank() {
  const url = "https://random-data-api.com/api/v2/banks";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  document.getElementById("m-id-asyncBank").innerHTML = data.bank_name;
}

async function syncDataCountries() {
  const url = "https://restcountries.com/v3.1/all ";
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  console.log(data[randomIndex].capital[0]);
  document.getElementById("id-tp-city").innerHTML = data[randomIndex].capital[0];
}

async function syncDataTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const randomIndex = Math.floor(Math.random() * json.length);
    console.log(json[randomIndex]);
    document.getElementById("m-id-asyncTodo").innerHTML =
      json[randomIndex].title;
  } catch (error) {
    console.error(error.message);
  }
}

async function calcFn() {

  try {
    await Promise.all([
      syncCoinDesk(),
      syncDataJsonPlaceholder(),
      syncDataBank(),
      syncDataCountries(),
      syncDataTodo()
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

  ordInc = Math.round(Math.random() * 900000 + 1000);
  // USE LINE FOR TESTING ordInc = 714600;
  salesPrice = Math.round(Math.random() * 260000) + 68369;
  // costBasis is defined in the syncCoinDesk() function.
  ltcg = salesPrice - costBasis;
  // USE LINE FOR TESTING ltcg = 300000;

  console.log(`Test:
    \n ${salesPrice} sales price
    \n ${costBasis} cost basis
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

  console.log(`Test:
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

  document.getElementById("id-ltcg").innerHTML = usdFormat(ltcg);
  document.getElementById("id-ltcg-rate").innerHTML = percentFormat(ltcgRate);
  document.getElementById("id-ltcg-tax").innerHTML = usdFormat(ltcgTax);

  document.getElementById("id-nii").innerHTML = usdFormat(nii);
  document.getElementById("id-niit-rate").innerHTML = percentFormat1Dec(niitRate);
  document.getElementById("id-niit-tax").innerHTML = usdFormat(niit);

  document.getElementById("id-total-tax").innerHTML = usdFormat(totalTax);
  document.getElementById("id-summary-amount").innerHTML = usdFormat(totalTax);
  
} catch (error) {
  console.error("Error: promises did not complete before calculation function", error);
};
}