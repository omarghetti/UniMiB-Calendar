describe("Create new event", () => {
  it("Should open when add button is clicked", () => {
    cy.visit("http://localhost:8080/app");
    cy.get("[data-test-id=calendar-btn-new-event]").click();
    cy.url().should("include", "/new");
  });

  it("Should create a new event", () => {
    const newEventTitle = "Test new event";
    cy.get("[data-test-id=event-editor-title-field]").type(newEventTitle);
    cy.get("[data-test-id=event-editor-place-field]").type("Test place");
    cy.get("[data-test-id=event-editor-notes-field]").type("Test notes");
    cy.get("[data-test-id=event-editor-btn-save]").click();
    cy.request("GET", "/api/events").then(response => {
      // response.body is automatically serialized into JSON
      console.info({ response });
      const newEvent = response.body.find(e => e.title === newEventTitle);
      expect(newEvent).to.have.property("type", "GENERIC_MEETING");
      expect(newEvent.participants).to.deep.eq(["fake-email"]);
      expect(newEvent).to.have.property("place", "Test place");
      expect(newEvent).to.have.property("notes", "Test notes");
    });
  });
});
