const axios = require('axios');
// Events - retrieves post data, headers, ect...
// Context - retrieves user info ect...
// Callback - function we run to send a response back to the user
exports.handler = function (events, context, callback) {
    const API_URL = 'https://api.yelp.com/v3/businesses';
    const YELP_BUSINESS_ID = events.queryStringParameters.id
    const API_CLIENT_SECRET = 'eMzcAJQAJ-APZTlwRU0SY_FkYEMmFGGsi4SJNeAHmr5dJJbtKbC6vMgKNVXlGPtWDXaCuIjPLwVbkPFUr_h5Vj78HsZDqMB8hxq608EKt6Kerkp02fLXzd8NrJgvXHYx';
    const URL = `${API_URL}/${YELP_BUSINESS_ID}`;
    // Send user response
    const send = body => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body),
        })
    }
    // Perform API call
    const getYelpInfo = () => {
        axios.get(URL,
            {
                method: 'get',
                headers: { 'Authorization': 'Bearer ' + API_CLIENT_SECRET }
            })
            .then((response) => {
                send(response.data);
            })
            .catch((error) => {
                send(error);
            });
    }
    // Make sure method is GET
    events.httpMethod === 'GET' && getYelpInfo();
};