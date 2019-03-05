// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

    confirm: uuid => ({
        subject: 'React Confirm Email',
        html: `
        <a href='${process.env.CLIENT_URL}/confirm/${uuid}'>
            click to confirm email
        </a>
        `,      
        text: `Copy and paste this link: ${process.env.CLIENT_URL}/confirm/${uuid}`
    }), 
    resetPassword: uuid => ({
        subject: 'Reset password',
        html: `
        <a href='${process.env.CLIENT_URL}/resetPassword/${uuid}'>
            click to reset password
        </a>
        `,
        text: `Copy and paste this link: ${process.env.CLIENT_URL}/resetPassword/${uuid} to reset a password`
    })
    
}