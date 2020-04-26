describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://localhost:3000");
    cy.get("button")
      .contains("Login")
      .click();
  }); // Should be on a new URL which includes '/commands/actions'
});
