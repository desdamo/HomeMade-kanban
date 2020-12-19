const sanitizer = require('sanitizer');

const sanitize = obj => {
    for (const prop in obj)
        obj[prop] = sanitizer.escape(obj[prop]);
};

module.exports = (request, response, next) => {
    if (request.body)
        sanitize(request.body);
    sanitize(request.params);
    sanitize(request.query);
    next();
}

