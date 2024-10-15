"use strict";

/**
 * @typedef {Object} City
 * @property {string} city
 * @property {number} population
 * @property {number} area
 * @property {number} density
 * @property {string} country
 * @property {number} normalizedDensity
 */

/**
 * @param {string} data
 * @param {boolean} removeHeaderLine
 * @param {string} divider
 * @returns {Array<Array<string>>}
 */
const parseDataToArray = (
  str,
  removeHeaderLine = true,
  endOfRow = "\n",
  divider = ",",
) => {
  const parsedData = str.split(endOfRow).map((line) => line.split(divider));
  if (removeHeaderLine) parsedData.shift();
  return parsedData;
};

/**
 * @param {Array<Array<string>>} arr
 * @param {function} filterFn
 * @param {function} buildFn
 * @returns {Array<Array>}
 * */
const filterAndBuildData = (arr, filterFn = (el) => el, buildFn) => {
  const filteredData = arr.filter(filterFn);
  if (buildFn) return filteredData.map(buildFn);
  return filteredData;
};

/**
 * @param {string} value
 * @returns {number}
 * */
const convertToNumber = (value) => Number(value) || 0;

/**
 * @param {Array<string>} match
 * @returns {City}
 * */
const transformToObj = (match) => {
  const city = match[0].trim();
  const population = convertToNumber(match[1]);
  const area = convertToNumber(match[2]);
  const density = convertToNumber(match[3]);
  const country = match[4].trim();
  const responce = {
    city,
    population,
    area,
    density,
    country,
    normalizedDensity: 0,
  };
  return responce;
};

/**
 * @param {Array<string>} row
 * @returns {boolean}
 * */
const filterHandler = (row) => {
  const isValid = row.length === 5;
  if (!isValid) console.log("Invalid row:", row);
  return isValid;
};

/**
 * @param {Array<City>} cities
 * @returns {number}
 * */
const getMaxDensity = (cities) =>
  Math.max(...cities.map((city) => city.density));

/**
 * @param {Array<City>} cities
 * @param {number} maxDensity
 * @returns {Array<City>}
 */
const setDensityToEveryCity = (cities, maxDensity) =>
  cities.map((city) => {
    city.normalizedDensity = Math.round((city.density * 100) / maxDensity);
    return city;
  });

/**
 * @param {Array<City>} cities
 * @returns {void}
 */
const displayTable = (cities) => {
  for (const city of cities) {
    let s = city.city.padEnd(18);
    s += city.population.toString().padStart(10);
    s += city.area.toString().padStart(8);
    s += city.density.toString().padStart(8);
    s += city.country.padStart(18);
    s += city.normalizedDensity.toString().padStart(6);
    console.log(s);
  }
};

/**
 * @param {Array<City>} cities
 * @param {string} key
 * @returns {Array<City>}
 */
const sortCitiesByKey = (cities, key) =>
  [...cities].sort((c1, c2) => c2[key] - c1[key]);

/**
 * @param {string} data
 * @returns {void}
 */
const main = (data) => {
  if (!data) throw new Error("Invalid data");
  const citiesArray = parseDataToArray(data);
  const filteredData = filterAndBuildData(
    citiesArray,
    filterHandler,
    transformToObj,
  );
  const maxDensity = getMaxDensity(filteredData);
  const rowArray = setDensityToEveryCity(filteredData, maxDensity);
  const sortedArray = sortCitiesByKey(rowArray, "normalizedDensity");
  displayTable(sortedArray);
};

module.exports = {
  parseDataToArray,
  filterAndBuildData,
  convertToNumber,
  transformToObj,
  filterHandler,
  getMaxDensity,
  setDensityToEveryCity,
  displayTable,
  sortCitiesByKey,
  main,
};
