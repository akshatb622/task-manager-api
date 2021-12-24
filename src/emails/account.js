const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to : email,
        from : 'akshatb622@gmail.com',
        subject : 'Thanks for joining in!',
        text : `Welcome to the app, ${name}. Let me know how you get along wih the app.`
    });
};
const sendGoodbyeEmail = (email,name)=>{
    sgMail.send({
        to : email,
        from : 'akshatb622@gmail.com',
        subject : 'Sorry to see you go!',
        text : `GoodBye! ${name}. Let us know if we could do something to keep you onboard.`  
    });
};

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}