const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    return bcrypt.hash(password, 10)
}

module.exports = hashPassword