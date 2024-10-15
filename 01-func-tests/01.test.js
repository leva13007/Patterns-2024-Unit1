"use strict";

const { describe, it } = require("node:test");
const { parseDataToArray } = require("../01-func");
const assert = require("assert");

describe("parseDataToArray", () => {
  it("should throw an error if the input data is not a string", () => {
    assert.throws(() => parseDataToArray());
  });

  it("should parse data into a 2D array and remove the header line by default", () => {
    const data = `city,population,area,density,country
    Shanghai,24256800,6340,3826,China
    Delhi,16787941,1484,11313,India`;

    const expected = [
      ["    Shanghai", "24256800", "6340", "3826", "China"],
      ["    Delhi", "16787941", "1484", "11313", "India"],
    ];

    const result = parseDataToArray(data);
    assert.deepStrictEqual(result, expected);
  });

  it("should parse data into array and keep the header line", () => {
    const data = `city,population,area,density,country
    Shanghai,24256800,6340,3826,China
    Delhi,16787941,1484,11313,India`;

    const expected = [
      ["city", "population", "area", "density", "country"],
      ["    Shanghai", "24256800", "6340", "3826", "China"],
      ["    Delhi", "16787941", "1484", "11313", "India"],
    ];

    const result = parseDataToArray(data, false);
    assert.deepStrictEqual(result, expected);
  });

  it("should parse data into a 2D array using a custom divider", () => {
    const data = `city|population|area|density|country
    Shanghai|24256800|6340|3826|China
    Delhi|16787941|1484|11313|India`;

    const expected = [
      ["    Shanghai", "24256800", "6340", "3826", "China"],
      ["    Delhi", "16787941", "1484", "11313", "India"],
    ];

    const result = parseDataToArray(data, true, "|");
    assert.deepStrictEqual(result, expected);
  });

  it("should return an empty array if the input data is empty", () => {
    const data = "";
    const expected = [];
    const result = parseDataToArray(data);
    assert.deepStrictEqual(result, expected);
  });
});
