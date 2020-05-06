describe("Calendar view", () => {
  it("Should have correct URL", () => {
    cy.url().should("include", "/calendar");
  });

  it("Should display calendar component", () => {
    cy.get(".fc").should("exist");
  });

  it("Should display user events in month view", () => {
    cy.get(".fc-event")
      .should("have.length", 1)
      .as("todayEvent");
    cy.get("@todayEvent").contains("Test event");
  });

  it("Should display event detail when clicking on it", () => {
    cy.get(".fc-event").click();
  });
});
