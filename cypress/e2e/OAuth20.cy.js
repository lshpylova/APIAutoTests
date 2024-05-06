//Client ID Ov23ctwcTWzHSA2SbJvZ
//client secret 926e45d1fec469226080269319414eeae1d2f4cc
//https://github.com/login/oauth/authorize?client_id=Ov23ctwcTWzHSA2SbJvZ - this link for code generation.
// Need to regenerate each time whne you want to run the test
//authorization code=6c8700ad07c50e6b0b58

//1) Get the OAuth2 access token
/*https://github.com/login/oauth/acess_token
Query params 
________
client_id, client_secret, code
2) Send Get request by using access token
https://github.com/users/repos
Auth: accessToken

*/

describe("OAuth2",()=>{
    let accessToken = "";

    it("get Oauth2 accrss token",()=>{
        cy.request({
            method : 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs:{
                client_id: "Ov23ctwcTWzHSA2SbJvZ",
                client_secret: "926e45d1fec469226080269319414eeae1d2f4cc",
                code: "2fe9b6ec59c832469f3e"
            }

        })
        .then((response)=>{
            cy.log("Generated token is: "+ response.body)
            const params= response.body.split("&");
            accessToken = params[0].split("=")[1];
            cy.log("Generated token is: "+ accessToken)
        })
    })

    it("OAuth2 request",()=>{
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            form: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            }

        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.equal(795499502);
            cy.log("Generated token is: "+ accessToken)
        })
    } )
})