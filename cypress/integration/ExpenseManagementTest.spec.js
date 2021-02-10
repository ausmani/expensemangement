describe("Test Case to Check Expense Management Functionality", function () {

    it('First it should logged in to the system', function () {
        cy.visit("/");
        cy.get('h2').should('have.text', 'Sign In');
        cy.get('p').should('have.text', 'Enter you credentials.')
        cy.get('input[placeholder="User Email"]').type('awais.usmani@haud.com')
        cy.get('input[placeholder="User Password"]').type('greenpk123')
        cy.get('button').contains('Log In').click();
        cy.url().should('include', "/home");
    });

    it('Should Test It lands on Home page and have proper landing page', function () {
        cy.get('.navbar-wrapper > a').should('have.text', 'Dashboard Welcome Waleed usmani !!');
        cy.get('.welcome').should('have.text', 'Welcome Waleed usmani !!');
        cy.get('.active').should('have.text', 'Dashboard');
    });

    it('Test the Add new Expense', function () {

        cy.get('.nav').contains('Expense').should('have.attr', 'href', '/expense').click();
        cy.get('a').contains('Add Expense').should('have.attr', "href", '/expense/create').click()
        let expense = 'Lunch KFC';
        let amount = getRandomNumber();
        const targetDate = Cypress.moment().format("MM/DD/YY");
        cy.get('#expense').clear().type(expense);
        cy.get('#amount').clear().type(amount);
        cy.get('#date').clear().type(`${targetDate}{enter}`);
        cy.get('[type="checkbox"]').check();
        cy.get('button').contains('Create').click();
        cy.wait(500);
        cy.get('div.Toastify__toast-body').should('have.text', 'Expense Successfully Created');
        cy.wait(2500);
        cy.url().should("include", "/expense");
        let today = new Date().toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: '2-digit'});
        cy.get("tr:nth-child(1) > td:nth-child(1)").should("have.text", expense);

        cy.get("tr:nth-child(1) > td:nth-child(2)").should("have.text", amount);
        cy.get("tr:nth-child(1) > td:nth-child(3)").should("have.text", today);

    });
    it('Test The Edit Expense', function () {
        cy.get('tr:nth-child(1) > td:nth-child(5) > a:nth-child(1)').should('have.attr', 'href').and('include', 'expense/update').then((href) => {
            const editHref = href;
            cy.get('tr:nth-child(1) > td:nth-child(5) > a:nth-child(1)').click(); // Click Edit Button
            cy.url().should("eq", Cypress.config().baseUrl + editHref);
            let expenseEdit = 'Lunch KFC With Colleagues';
            let amountEdit = getRandomNumber();
            cy.get('#expense').clear().type(expenseEdit);
            cy.get('#amount').clear().type(amountEdit);
            cy.get('[type="checkbox"]').first().uncheck();
            cy.get('button').contains('Update').click();
            cy.wait(500);
            cy.get('div.Toastify__toast-body').should('have.text', 'Expense Successfully Updated');
            cy.wait(2500);
            cy.url().should("include", "/expense");
            let today = new Date().toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: '2-digit'});
            cy.get("tr:nth-child(1) > td:nth-child(1)").should("have.text", expenseEdit);
            cy.get("tr:nth-child(1) > td:nth-child(2)").should("have.text", amountEdit);
        })
    });

    it('should Delete the Expense', function () {
        cy.get('tr:nth-child(1) > td:nth-child(5) > a:nth-child(2)').click();
        cy.get('#react-confirm-alert > div > div > div > h1').should('have.text','Delete Expense');
        cy.get('#react-confirm-alert > div > div > div > div > button:nth-child(1)').should('have.text','Yes').click();
        cy.get('div.Toastify__toast-body').should('have.text', 'Expense Successfully Deleted');
    });

    it('should Logout from the system', function () {
        cy.get("#navigation > ul > li.nav-item.btn-rotate.dropdown > div > a").first().click()
        cy.get('a').contains('Logout').should('have.attr', "href", '/logout').click();
        cy.get('h2').should('have.text', 'Sign In');
    });

    function getRandomNumber() {
        return Math.floor(Math.random() * 501) + 50;
    }

})