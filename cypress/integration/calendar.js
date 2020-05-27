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

  it("Should display event detail when clicking on it and bring the user back to calendar view when the back button is clicked", () => {
    cy.get(".fc-event").click();

    // type
    cy.get('[data-test-id="event-detail-type-value"]').as("eventType");
    cy.get("@eventType").contains("Chiarimenti lezione");

    // participants
    cy.get('[data-test-id="event-detail-participants-value"]').as(
      "eventParticipants"
    );
    cy.get("@eventParticipants").contains("fake-email");

    // back
    cy.get('[data-test-id="event-detail-btn-back"]').click();
    cy.get(".fc").should("exist");
  });
});
