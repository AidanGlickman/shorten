export default (password) => (password.length > 7 && (/\d/.test(password)));
