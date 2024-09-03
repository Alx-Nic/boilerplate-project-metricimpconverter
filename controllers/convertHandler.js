function getNumFromFraction(input) {
  const split = input.split("/");
  if (split.length !== 2) return "invalid number";

  const num = parseFloat(split[0]);
  const denom = parseFloat(split[1]);

  if (isNaN(num) || isNaN(denom) || denom === 0) return "invalid number";
  return num / denom;
}

const supportedUnits = ["gal", "L", "mi", "km", "lbs", "kg"];

function ConvertHandler() {
  this.getNum = function (input) {
    if (!input) return "invalid number";

    if (input.includes("/")) return getNumFromFraction(input);

    const result = parseFloat(input);

    return isNaN(result) ? 1 : result;
  };

  this.getUnit = function (input) {
    if (!input) return "invalid unit";

    const match = input.match(/[a-zA-Z]+$/);

    const isSupportedUnit =
      supportedUnits.filter((x) => x === match[0]).length > 0;

    if (!match || !isSupportedUnit) {
      return "invalid unit";
    }

    return match[0];
  };

  this.getReturnUnit = function (unit) {
    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "L":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "L":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "invalid unit";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = 0;
    }

    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    const result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    return result;
  };
}

module.exports = ConvertHandler;
