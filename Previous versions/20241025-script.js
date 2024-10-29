function calcFn() {
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

  function getLtcgBracket(num) {
    return num > 518900 && num < 999999999
      ? (ltcgRate = 0.2)
      : num > 47025 && num < 518900
      ? (ltcgRate = 0.15)
      : num > 0 && num < 47025
      ? (ltcgRate = 0.0)
      : console.log("Error.");
  }

  function getTaxableInc(num) {
    return num > 0
      ? (taxableInc = prelimTaxableInc)
      : num <= 0
      ? (taxableInc = 0)
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
  ltcg = Math.round(Math.random() * 260000 + 20000);
  addtlInc = 0;
  totalInc = ordInc + ltcg + addtlInc;
  adjToInc = 0;
  agi = ordInc + ltcg + addtlInc - adjToInc;

  stdDed = 14600;
  prelimTaxableInc = agi - stdDed;

  getTaxableInc(prelimTaxableInc);
  getBracket(taxableInc);

  ordIncBrkt = Math.round((taxableInc - ordIncFloor) * ordIncRate);
  ordIncTax = Math.round(ordIncLwrBrkts + ordIncBrkt);

  getLtcgBracket(taxableInc);
  ltcgTax = Math.round(ltcg * ltcgRate);

  magi = agi + adjToInc;
  niiThreshold = 200000;

  getNiitThreshold(magi);
  nii = Math.round(magi - niiThreshold);
  niit = Math.round(nii * niitRate);

  totalTax = ordIncTax + ltcgTax + niit;

  console.log(`Tax Breakdown:
    \n
    \n+ ${ordIncTax} ord inc tax 
    \n+ ${ltcgTax} cap gains tax 
    \n+ ${niit} NIIT
    \n= ${totalTax} total tax
    \n
    \n+ ${ordInc} W2 income
    \n+ ${addtlInc} Sch 1 additional income
    \n+ ${totalInc} Total income
    \n (${adjToInc}) Sch 1 adjustments to income
    \n= ${agi} AGI
    \n (${stdDed}) Standard deduction
    \n= ${taxableInc} Taxable income
    \n
    \n  ${taxableInc} Taxable income
    \n (${ordIncFloor}) Bracket floor
    \n= ${taxableInc - ordIncFloor} Income in bracket
    \n  ${ordIncRate}% Tax rate
    \n= ${ordIncBrkt} Tax from bracket
    \n+ ${ordIncLwrBrkts} Tax from lower brackets
    \n= ${ordIncTax} Ordinary income tax
    \n
    \n+ ${agi} AGI
    \n+ ${adjToInc} add-back adjustments
    \n= ${magi} Modified AGI
    \n (${niiThreshold}) NIIT threshold
    \n= ${nii} Modified AGI over threshold
  `);

  document.getElementById("id-ord-inc").innerHTML = usdFormat(ordInc);
  document.getElementById("id-std-ded").innerHTML = usdFormat(stdDed);
  document.getElementById("id-tax-inc").innerHTML = usdFormat(taxableInc);
  document.getElementById("id-ord-inc-rate").innerHTML =
    percentFormat(ordIncRate);
  document.getElementById("id-ord-inc-min").innerHTML =
    usdFormat(ordIncLwrBrkts);
  document.getElementById("id-ord-inc-brkt").innerHTML = usdFormat(ordIncBrkt);
  document.getElementById("id-ord-inc-tax").innerHTML = usdFormat(ordIncTax);

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
