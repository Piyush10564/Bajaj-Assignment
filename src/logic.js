const { askAI } = require("./ai");

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

async function processLogic(key, value) {
  switch (key) {

    case "fibonacci": {
      if (typeof value !== "number" || value < 0) {
        throw new Error("Invalid fibonacci input");
      }

      let series = [];
      let a = 0, b = 1;

      for (let i = 0; i < value; i++) {
        series.push(a);
        [a, b] = [b, a + b];
      }
      return series;
    }

    case "prime": {
      if (!Array.isArray(value)) {
        throw new Error("Prime input must be an array");
      }
      return value.filter(isPrime);
    }

    case "hcf": {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("HCF input must be a non-empty array");
      }
      return value.reduce(gcd);
    }

    case "lcm": {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("LCM input must be a non-empty array");
      }
      return value.reduce(lcm);
    }

    case "AI":
      return await askAI(value);

    default:
      throw new Error("Unsupported key");
  }
}

module.exports = {
  processLogic
};