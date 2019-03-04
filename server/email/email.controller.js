const prisma = require('../prisma');
const sendMail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.templates');

// The callback that is invoked when the user submits the form on the client.
exports.collectEmail = async (req, res) => {
    const { email } = req.body
    
    const dbUser = await prisma.query.user({
        where: {
            username: email
        }
    })
    
    if (!dbUser) {
        return res.json({msg: msgs.problemOccured})
    }
    
    if (dbUser && !dbUser.confirmed) {
        sendMail(dbUser.username, templates.confirm(dbUser.verificationUuid))
        .then(() => res.json({ msg: msgs.resend }))
    }

    // The user has already confirmed this email address
    else {
        res.json({ msg: msgs.alreadyConfirmed })
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