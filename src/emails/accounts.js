const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgmail.send({
    to: email,
    from: "hirdeshhirru@gmail.com",
    subject: "Thanks for joining in!",
    text: `welcome to the app, ${name} . Let me know how you get along`,
    // html: ""
  });
};

// Goal: Send email to user on cancellation
//
// 1. Setup a new function for sending an email on cancellation
//     - email and name as args
// 2. Include their name in the email and ask why they have cancelled
// 3. Call it just after the account is removed
// 4. Run the request and check the inbox!

const sendCancellationEmail = (email, name) => {
  console.log(email, name);
  sgmail.send({
    to: email,
    from: "hirdeshhirru@gmail.com",
    subject: "Sorry to see you go",
    text: `Goodbye, ${name}. I hope to see you back in sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

//
// Goal: Pull JWT secret and database URL into env vars
//
// 1. Create two new env vars: JWT_SECRET and MONGODB_URL
// 2. Setup values for each in the development env files
// 3. Swap out three hardcoded values
// 4. Test your work. Creat new user and get their profile
