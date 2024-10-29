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

  ordInc = Math.round(Math.random() * 900000 + 1000);
  stdDed = 14600;
  taxableInc = ordInc - stdDed;
  getBracket(taxableInc);
  getLtcgBracket(taxableInc);

  ordIncBrkt = Math.round((taxableInc - ordIncFloor) * ordIncRate);
  ordIncTax = Math.round(ordIncLwrBrkts + ordIncBrkt);

  ltcg = Math.round(Math.random() * 260000 + 20000);
  ltcgTax = Math.round(ltcg * ltcgRate);
  totalTax = ordIncTax + ltcgTax;

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

  document.getElementById("id-total-tax").innerHTML = usdFormat(totalTax);
  document.getElementById("id-total-tax-2").innerHTML = usdFormat(totalTax);
}
