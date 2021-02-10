describe("Test Case to check the flow for expense management app", function () {

    it('Test a sign in page First', function () {

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
    })

    it('Should Test the functionality of User', function () {
        cy.get('.nav').contains('Deposits').should('have.attr', 'href', '/deposits').click();
        cy.url().should("include", "/deposits")
        cy.get('.active').should('have.text', 'Deposits');
        cy.get('a').contains('Add Deposit').should('have.attr', "href", '/deposit/create').click()
        let depositAmount = getRandomNumber();
        cy.url().should("include", "/deposit/create")
        cy.get('input[placeholder="Amount"]').type(depositAmount)
        cy.get('#participant').select('Awais Munawar Usmani').should('have.value', 1);
        const targetDate = Cypress.moment().format("MM/DD/YY");
        cy.get('#date').clear().type(`${targetDate}{enter}`);
        cy.get('button').contains('Create').click();
        cy.wait(500);
        cy.get('div.Toastify__toast-body').should('have.text', 'Deposit Successfully Created');
        cy.wait(2500);

        cy.url().should("include", "/deposits");
        let today = new Date().toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: '2-digit'});
        cy.get("tr:nth-child(1) > td:nth-child(1)").should("have.text", "Awais Munawar Usmani");

        cy.get("tr:nth-child(1) > td:nth-child(2)").should("have.text", depositAmount);
        cy.get("tr:nth-child(1) > td:nth-child(3)").should("have.text", today);

        // Check for Edit
        //let url = Cypress.env('LOCAL_HOST');

        cy.get('tr:nth-child(1) > td.text-right > a:nth-child(1)').should('have.attr', 'href').and('include', '/deposit/update').then((href) => {
                const editHref = href
                cy.get('tr:nth-child(1) > td.text-right > a:nth-child(1)').click(); // Click Edit Button
                cy.url().should("eq", Cypress.config().baseUrl + editHref);
                let editDepositAmont = getRandomNumber();
                cy.get('input[placeholder="Amount"]').clear()
                cy.get('input[placeholder="Amount"]').type(editDepositAmont)
                cy.get('button').contains('Update').click();
                cy.get('div.Toastify__toast-body').should('have.text', 'Deposit Successfully Updated');
            }
        ); // Click Edit Button

        // Delete functionality
        cy.get('tr:nth-child(1) > td.text-right > a:nth-child(2)').click();
        cy.get('#react-confirm-alert > div > div > div > h1').should('have.text','Delete Deposit');
        cy.get('#react-confirm-alert > div > div > div > div > button:nth-child(1)').should('have.text','Yes').click();
        cy.get('div.Toastify__toast-body').should('have.text', 'Deposit Successfully Deleted');

        // Logout
        cy.get("#navigation > ul > li.nav-item.btn-rotate.dropdown > div > a").first().click()
        cy.get('a').contains('Logout').should('have.attr', "href", '/logout').click();
        cy.get('h2').should('have.text', 'Sign In');
    });

    function getRandonUserName() {

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text;
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 501) + 50;
    }
})