describe("API testing",()=>{
  
    let authToken = null;

    before("creating access token", ()=>{
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'Contant-Type': 'application/json'
         },
         body:{
            clientName: 'Abc',
            clientEmail: Math.random().toString(5).substring(2)+"gmail.com"
         }
        }). then ((response) =>{
            authToken=response.body.accessToken;
    })
});

        before("creating new order", ()=>{
            cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/orders/',
                headers: {
                    'Contant-Type': 'application/json',
                    'Authorization': 'Bearer '+authToken
             },
             body:{
                "bookId": 1,
                "customerName": "xyzabc"
             }
            }). then ((response) =>{
                expect(response.status).to.eq(201);
                expect(response.body.created).to.eq(true);
    
        })
    })

    it("creating new order", ()=>{
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'Contant-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
         },
         body:{
           "bookId": 1,
            "customerName": "xyzabc"
         }
        }). then ((response) =>{
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);

    })
    })

})