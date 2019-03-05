const prisma = require('../prisma');
const sendMail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.templates');

// The callback that is invoked when the user submits the form on the client.
exports.forgotPassword = async (req, res) => {
    const { email } = req.body
    
    const dbUser = await prisma.query.user({
        where: {
            username: email
        }
    })
    
    if (!dbUser || !dbUser.localProvider) {
        return res.json({msg: msgs.problemOccured})
    }

    const uuid = require('uuid/v4')();

    const result = await prisma.mutation.updateUser({
        where: {
            username: email
        },
        data: {
            resetPasswordUuid: uuid // todo jku - omezena platnost
        }
    })

    if (result) {
        sendMail(result.username, templates.resetPassword(result.resetPasswordUuid))
        .then(() => res.json({ msg: msgs.confirm }))
    }
    else {
        res.json({ msg: msgs.problemOccured })
    }
}

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = async (req, res) => {
    const { uuid } = req.params
  
    const dbUser = await prisma.query.user({where: {verificationUuid: uuid}})
    if (!dbUser) {
        return res.json({ msg: msgs.couldNotFind })
    }

    if (dbUser.confirmed) {
        return res.json({ msg: msgs.alreadyConfirmed })
    }

    // Confirm user
    const result = await prisma.mutation.updateUser({
        where: {
            verificationUuid: uuid
        },
        data: {
            confirmed: true,
            verificationUuid: null
        }
    })

    if (result) {
        return res.json({ msg: msgs.confirmed })
    }

    res.json({msg: msgs.problemOccured})
}