describe("api testing", ()=>{

it("Approach1-Hard coded json object", ()=>{

    const requestBody={
        name: Math.random().toString(5).substring(2),
        description: "Test body",
        permission: "push",
        notification_setting: "notifications_enabled",
        privacy: "closed"

    }

    cy.request(
        {
            method: 'POST',
            url: ' https://api.github.com/user',
            body: requestBody
        } )

    .then((response) =>{
    expect(response.status).to.eq(201)
    expect(response.body.name).to.eq(requestBody.name)
    expect(response.body.description).to.eq(requestBody.description)
    expect(response.body.notification_setting).to.eq("notifications_enabled")
    expect(response.body.privacy).to.eq("closed")

    })
})

})