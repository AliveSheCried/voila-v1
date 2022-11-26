export const mutations = `
generateAccessToken(
    "Required for both payments and data API"
    client_id: String!
    client_secret: String!
    grant_type: String!
    
    "Required for payments API"
    scope: String
    
    "Required for data API"
    redirect_uri: String
    code: String
    
    ): AccessToken
`;
