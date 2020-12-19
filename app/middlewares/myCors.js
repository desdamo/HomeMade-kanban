const myCors = (request, response, next) => {
    //on va autoriser n'importe qui à consulter notre API
    response.setHeader('Access-Control-Allow-Origin', '*');

    if (request.method === "OPTIONS") {
        response.setHeader('Allow', 'GET,POST,PATCH,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    }

    next();
};

module.exports = myCors;