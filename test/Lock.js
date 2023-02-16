const { expect, assert } = require("chai");

describe("My Test Group", () => {
  const myname = "shaun";
  const myAge = 36;
  const myCOlor = "blue"

  it("tests my name is 'shaun'", () => {
    expect(myname).equals("shaun")
  })

  it("My age is not 100", () => {
    expect(myAge).not.equals(100)
  })

  describe("My color check", () => {
    it("has myColor", () => {
      assert(myCOlor)
    })

    it("has got my color as blue", () => {
      expect(myCOlor).equals("blue")
    })
  })
});
