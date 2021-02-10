describe ("Test Case to check the flow for expense management app",function () {

    it('Test a sign in page', function () {

        cy.visit("/");
        cy.get('h2').should('have.text','Sign In');
        cy.get('p').should('have.text','Enter you credentials.')
        cy.get('input[placeholder="User Email"]').type('awais.usmani@haud.com')
        cy.get('input[placeholder="User Password"]').type('greenpk123')
        cy.get('button').contains('Log In').click();
        cy.url().should('include',"/home");
    });

    it('Should Test It lands on Home page and have proper landing page',function () {
        cy.get('.navbar-wrapper > a').should('have.text','Dashboard Welcome Waleed usmani !!');
        cy.get('.welcome').should('have.text','Welcome Waleed usmani !!');
        cy.get('.active').should('have.text','Dashboard');
    })

})