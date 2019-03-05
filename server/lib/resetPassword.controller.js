const prisma = require('../prisma') 
const hashPassword = require('../utils/hashPassword')

exports.controller = async (req, res) => {
    const { password, uuid } = req.body;

    const user = await prisma.query.user({
        where: {
            resetPasswordUuid: uuid
        }
    });

    if (!user) {
        return res.status(400).send('Bad uuid');
    }

    const hashedPassword = await hashPassword(password);
    const result = await prisma.mutation.updateUser({
        where: {
            resetPasswordUuid: uuid
        },
        data: {
            password: hashedPassword,
            resetPasswordUuid: null
        }
    })
    if (!result) {
        return res.status(400).send('Error occured');
    }
    res.end()
  }