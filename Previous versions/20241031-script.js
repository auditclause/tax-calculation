
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", getData);
});

function getData(ev) {
  const type = "users";
  const url = new URL(`https://random-data-api.com/api/v2/${type}`);
  let params = new URLSearchParams();
  params.set("size", 1);
  params.set("response_type", "json");
  url.search = params;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Bad things happened");
      return response.json();
    })
    .then(buildUserHTML)
    .catch(console.warn);
}

function buildUserHTML(data) {
  data = Array.isArray(data) ? data : [data];
  let main = document.getElementById("m-id-event");
  main.innerHTML = data
    .map(
      ({
        first_name,
        last_name,
        employment,
        email,
        id,
        avatar,
        date_of_birth,
      }) => {
        return `<div class="card" data-ref="${id}">
        <img src="${avatar}" alt="robohash api" />
        <h3>${first_name} ${last_name}</h3>
        <p>${employment.title}</p>
        <p>${email}</p>
        <p>${date_of_birth}</p>
      </div>`;
      }
    )
    .join("");
  document.getElementById("id-tp-info").innerHTML =
    data[0].first_name + " " + data[0].last_name;
  document.getElementById("id-occ").innerHTML = data[0].employment.title;
  console.log(data);
}

async function syncData() {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const randomIndex = Math.floor(Math.random() * json.length);
    console.log(json[randomIndex]);
    document.getElementById("m-id-async").innerHTML = json[randomIndex].title;
  } catch (error) {
    console.error(error.message);
  }
}

function calcFn() {
  
  syncData();

  function getBracket(num) {
    return num >= 609351 && num < 1000000000
      ? ((ordIncRate = 0.37),
        (ordIncLwrBrkts = 183647.25),
        (ordIncCeiling = 1000000000),
        (ordIncFloor = 609350))
      : num >= 243726 && num <= 609350
      ? ((ordIncRate = 0.35),
        (ordIncLwrBrkts = 55678.5),
        (ordIncCeiling = 609350),
        (ordIncFloor = 243725))
      : num >= 191951 && num <= 243725
      ? ((ordIncRate = 0.32),
        (ordIncLwrBrkts = 39110.5),
        (ordIncCeiling = 243725),
        (ordIncFloor = 191950))
      : num >= 100526 && num <= 191950
      ? ((ordIncRate = 0.24),
        (ordIncLwrBrkts = 17168.5),
        (ordIncCeiling = 191150),
        (ordIncFloor = 100525))
      : num >= 47151 && num <= 100525
      ? ((ordIncRate = 0.22),
        (ordIncLwrBrkts = 5426),
        (ordIncCeiling = 100525),
        (ordIncFloor = 47150))
      : num >= 11601 && num <= 47150
      ? ((ordIncRate = 0.12),
        (ordIncLwrBrkts = 1160),
        (ordIncCeiling = 47150),
        (ordIncFloor = 11600))
      : num > 0 && num <= 11600
      ? ((ordIncRate = 0.1),
        (ordIncLwrBrkts = 0),
        (ordIncCeiling = 11600),
        (ordIncFloor = 0))
      : num <= 0
      ? ((ordIncRate = 0),
        (ordIncLwrBrkts = 0),
        (ordIncCeiling = 0),
        (ordIncFloor = 0))
      : console.log("Error.");
  }

  function getNoLtcgBracket(num) {
    return num >= 609351 && num < 1000000000
      ? ((taxableIncNoLtcgRate = 0.37),
        (taxableIncNoLtcgLwrBrkts = 183647.25),
        (taxableIncNoLtcgCeiling = 1000000000),
        (taxableIncNoLtcgFloor = 609350))
      : num >= 243726 && num <= 609350
      ? ((taxableIncNoLtcgRate = 0.35),
        (taxableIncNoLtcgLwrBrkts = 55678.5),
        (taxableIncNoLtcgCeiling = 609350),
        (taxableIncNoLtcgFloor = 243725))
      : num >= 191951 && num <= 243725
      ? ((taxableIncNoLtcgRate = 0.32),
        (taxableIncNoLtcgLwrBrkts = 39110.5),
        (taxableIncNoLtcgCeiling = 243725),
        (taxableIncNoLtcgFloor = 191950))
      : num >= 100526 && num <= 191950
      ? ((taxableIncNoLtcgRate = 0.24),
        (taxableIncNoLtcgLwrBrkts = 17168.5),
        (taxableIncNoLtcgCeiling = 191150),
        (taxableIncNoLtcgFloor = 100525))
      : num >= 47151 && num <= 100525
      ? ((taxableIncNoLtcgRate = 0.22),
        (taxableIncNoLtcgLwrBrkts = 5426),
        (taxableIncNoLtcgCeiling = 100525),
        (taxableIncNoLtcgFloor = 47150))
      : num >= 11601 && num <= 47150
      ? ((taxableIncNoLtcgRate = 0.12),
        (taxableIncNoLtcgLwrBrkts = 1160),
        (taxableIncNoLtcgCeiling = 47150),
        (taxableIncNoLtcgFloor = 11600))
      : num > 0 && num <= 11600
      ? ((taxableIncNoLtcgRate = 0.1),
        (taxableIncNoLtcgLwrBrkts = 0),
        (taxableIncNoLtcgCeiling = 11600),
        (taxableIncNoLtcgFloor = 0))
      : num <= 0
      ? ((taxableIncNoLtcgRate = 0),
        (taxableIncNoLtcgLwrBrkts = 0),
        (taxableIncNoLtcgCeiling = 0),
        (taxableIncNoLtcgFloor = 0))
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
  ltcg = Math.round(Math.random() * 260000 + 20000);
  // USE LINE FOR TESTING ltcg = 300000;
  addtlInc = 0;
  totalInc = ordInc + ltcg + addtlInc;
  adjToInc = 0;
  agi = ordInc + ltcg + addtlInc - adjToInc;
  console.log("Test: " + agi + " AGI");
  stdDed = 14600;
  prelimTaxableInc = agi - stdDed;
  console.log("Test: " + prelimTaxableInc + " Prelim. taxable income");

  noNegativeNumber(prelimTaxableInc);
  console.log(
    "Test: " + taxableIncLtcg + " A. Taxable income incl. capital gains"
  );
  getBracket(taxableIncLtcg);
  taxableIncLtcgBrkt = Math.round((taxableIncLtcg - ordIncFloor) * ordIncRate);
  console.log("Test: " + ordIncRate + " Ordinary income rate");
  taxableIncLtcgTax = Math.round(ordIncLwrBrkts + taxableIncLtcgBrkt);

  getLtcgBracket(taxableIncLtcg);
  ltcgTax = Math.round(ltcg * ltcgRate);

  prelimNii = 300000;
  magi = agi + adjToInc;
  niiThreshold = 200000;
  getNiitThreshold(magi);
  magiOverThreshold = magi - niiThreshold;
  nii = Math.min(magiOverThreshold, prelimNii);
  niit = Math.round(nii * niitRate);
  // USE LINE FOR TESTING niit = 0;

  taxableIncNoLtcg = taxableIncLtcg - ltcg;
  console.log(
    "Test: " + taxableIncNoLtcg + " B. Taxable income excl. capital gains"
  );
  getNoLtcgBracket(taxableIncNoLtcg);
  taxableIncNoLtcgBrkt = Math.round(
    (taxableIncNoLtcg - taxableIncNoLtcgFloor) * taxableIncNoLtcgRate
  );
  taxableIncNoLtcgTax = Math.round(
    taxableIncNoLtcgLwrBrkts + taxableIncNoLtcgBrkt
  );
  taxableIncLtcgTaxedSeparately = taxableIncNoLtcgTax + ltcgTax;

  lowerOfTwoTaxes = Math.min(taxableIncLtcgTax, taxableIncLtcgTaxedSeparately);
  totalTax = lowerOfTwoTaxes + niit;

  console.log(`Tax Breakdown:
    \n\n${taxableIncLtcgTax} Tax from A.
    \n${taxableIncLtcgTaxedSeparately} Tax from B.
    \n${lowerOfTwoTaxes} Lower of the 2 values
    \n\n+ ${taxableIncNoLtcgTax} ordinary income tax
    \n+ ${ltcgTax} capital gains tax
    \n+ ${niit} NIIT
    \n= ${totalTax} Total tax
  `);

  document.getElementById("id-ord-inc").innerHTML = usdFormat(ordInc);
  document.getElementById("id-std-ded").innerHTML = usdFormat(stdDed);
  document.getElementById("id-tax-inc").innerHTML = usdFormat(taxableIncLtcg);
  document.getElementById("id-ord-inc-rate").innerHTML =
    percentFormat(ordIncRate);
  document.getElementById("id-ord-inc-min").innerHTML =
    usdFormat(ordIncLwrBrkts);
  document.getElementById("id-ord-inc-brkt").innerHTML =
    usdFormat(taxableIncNoLtcgBrkt);
  document.getElementById("id-ord-inc-tax").innerHTML =
    usdFormat(taxableIncNoLtcgTax);

  document.getElementById("id-ltcg").innerHTML = usdFormat(ltcg);
  document.getElementById("id-ltcg-rate").innerHTML = percentFormat(ltcgRate);
  document.getElementById("id-ltcg-tax").innerHTML = usdFormat(ltcgTax);

  document.getElementById("id-nii").innerHTML = usdFormat(nii);
  document.getElementById("id-niit-rate").innerHTML =
    percentFormat1Dec(niitRate);
  document.getElementById("id-niit-tax").innerHTML = usdFormat(niit);

  document.getElementById("id-total-tax").innerHTML = usdFormat(totalTax);
  document.getElementById("id-summary").innerHTML = usdFormat(totalTax);
}
