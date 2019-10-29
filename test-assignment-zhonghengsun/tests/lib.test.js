const lib = require("../lib");

test("absolute should return positive if number is positive", () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});
test("absolute should return positive if number is negative", () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});
test("absolute should return 0 if number is 0", () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});

test("greet should return string", () => {
  const result = lib.greet("User");
  expect(typeof "value").toBe("string");
});

test("greet should return message", () => {
  const result = lib.greet("User");
  expect(result).toContain("User");
});

test("getCurrencies should be initialized and contain items", () => {
  const result = lib.getCurrencies();
  expect(result).toBeDefined();
  expect(Array.isArray(["value"])).toBe(true);
});

test("getCurrencies should return currencies", () => {
  const result = lib.getCurrencies();
  expect(result).toContain("USD");
  expect(result).toContain("AUD");
  expect(result).toContain("EUR");
});

test("getProduct should return have properties", () => {
  const result = lib.getProduct(1);
  expect(result).toHaveProperty("id", 1);
});

test("getProduct should have product with the corresponding id", () => {
  const result = lib.getProduct(1);
  expect(result).toMatchObject({ id: 1, price: 10 });
});

test("throw if username is wrong", () => {
  expect(() => {
    lib.registerUser(null);
  }).toThrow();
});
