describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("creates a new email", () => {
    const mockEmail = "mockEmail@gmail.com";
    cy.get('[data-cy="search-bar"]').type(mockEmail).type("{enter}");
    cy.get(`[data-cy="${mockEmail}-selected"]`).should("exist");
  });

  it("moves individual recipient to selected recipients when clicked", () => {
    const mockEmail = "ann@timescale.com";
    cy.get(`[data-cy="${mockEmail}-not-selected"]`).click();
    cy.get(`[data-cy="${mockEmail}-selected"]`).should("exist");
  });

  it("moves all company's recipients when company is clicked", () => {
    const mockCompany = "timescale.com";
    const mockEmail = "ann@timescale.com";
    const mockEmail2 = "bob@timescale.com";

    // Validate that the emails are contained under the company
    cy.get(`[data-cy="${mockEmail}-not-selected"]`).should("exist");
    cy.get(`[data-cy="${mockEmail2}-not-selected"]`).should("exist");

    // Click the company
    cy.get(`[data-cy="${mockCompany}"]`).first().click();

    // Validate the emails have moved
    cy.get(`[data-cy="${mockEmail}-selected"]`).should("exist");
    cy.get(`[data-cy="${mockEmail2}-selected"]`).should("exist");
  });
});
