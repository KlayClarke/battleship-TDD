test("tester", () => {
  expect(fakeTest(2)).toBe(2);
});

function fakeTest(x) {
  return x;
}

// only have to test objects public interface (methods and properties that are used out of the ship object / interact with code out of the object)
