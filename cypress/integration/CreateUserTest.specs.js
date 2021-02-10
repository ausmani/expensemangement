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

    let userEmail = getRandonUserName()+'@test.com';
    let pass = getRandonUserName()+'123';
    let firstName = getRandonUserName();
    let lastName = getRandonUserName();
    it('Should Test the functionality of Add User', function () {
        cy.get('.nav').contains('Users').should('have.attr','href','/user').click();
        cy.get('a').contains('Add User').should('have.attr',"href",'/user/create').click()
        cy.url().should("include","/user")
        cy.get('input[placeholder="First name"]').type(firstName)
        cy.get('input[placeholder="Last name"]').type(lastName)

        cy.get('input[placeholder="Email"]').type(userEmail)

        cy.get('input[placeholder="Password"]').type(pass)
        cy.get('input[placeholder="Confirm Password"]').type(pass)
        cy.get('button').contains('Create').click();
        cy.wait(500);
        cy.get('div.Toastify__toast-body').should('have.text', 'User Successfully Created');
        cy.wait(2500);
        cy.url().should("include","/user");
        cy.get("table").get("tr").contains(userEmail);

    });

    it('should Test The Functionality of Edit User', function () {

        cy.contains(userEmail).parent('tr').within(() => {
            // all searches are automatically rooted to the found tr element
            cy.get('td').eq(0).contains(firstName)
            cy.get('td').eq(1).contains(lastName)
            cy.get('td').eq(2).contains(userEmail)
            cy.get('td:nth-child(4) > a:nth-child(1)').should('have.attr', 'href').and('include', '/user/update').then((href) => {
                    const editHref = href
                    cy.get('td:nth-child(4) > a:nth-child(1)').click()
                    cy.url().should("eq", Cypress.config().baseUrl + editHref);

                }
            ); // Click Edit Button
        });
        let newFirstName = getRandonUserName();
        let newLastName = getRandonUserName();
        cy.get('input[placeholder="First name"]').clear()
        cy.get('input[placeholder="First name"]').type(newFirstName)
        cy.get('input[placeholder="Last name"]').clear()
        cy.get('input[placeholder="Last name"]').type(newLastName);
        cy.get('button').contains('Update').click();
        cy.wait(500);
        cy.get('div.Toastify__toast-body').should('have.text', 'User Successfully Updated');
        cy.wait(2500);
        cy.contains(userEmail).parent('tr').within(() => {
            // all searches are automatically rooted to the found tr element
            cy.get('td').eq(0).contains(newFirstName)
            cy.get('td').eq(1).contains(newLastName)
            cy.get('td').eq(2).contains(userEmail)

        });
        cy.url().should("include","/user");
        
    });

    it('should Delete User', function () {
        cy.contains(userEmail).parent('tr').within(() => {
            // all searches are automatically rooted to the found tr element
            cy.get('td:nth-child(4) > a:nth-child(2)').click()

        });
        cy.get('#react-confirm-alert > div > div > div > h1').should('have.text','Delete User');
        cy.get('#react-confirm-alert > div > div > div > div > button:nth-child(1)').should('have.text','Yes').click();
        cy.get('div.Toastify__toast-body').should('have.text', 'User Successfully Deleted');
    });

    it('Should Test The functionality of Logout', function () {
        cy.get("#navigation > ul > li.nav-item.btn-rotate.dropdown > div > a").first().click()
        cy.get('a').contains('Logout').should('have.attr',"href",'/logout').click();
        cy.get('h2').should('have.text','Sign In');
    });

    function getRandonUserName() {

        var text ="";
        var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5;i++){
            text+=possible.charAt(Math.floor(Math.random()*possible.length))
        }
        return text;
    }
})