const sanitizer = require('sanitizer');


const str = '<script>alert("tu as été piraté")</script>';


const sanitizedString = sanitizer.escape(str);

console.log(str);
console.log(sanitizedString);