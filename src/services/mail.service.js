const nodemailer = require('nodemailer');

const createMail = async body => {
  console.log(body);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //enable lesssecureapps from account.gmail
      //enter your credentials here
      user: 'sales@dipixels.com',
      pass: 'pixels123@A1',
    },
  });

  //list for who the mail will come to =>
  const recipents = [
    'azharbhuj@gmail.com',
    'info@dipixels.com',
    'ceo@dipixels.com',
  ];
  //email from where the email will come from

  //mail id from which the mail goes from
  const sendingMail = 'Di Pixels';
  // customers mail
  const orderConfirmedMail = body.email;

  const orderId = new Date().getTime().toString();

  const messageForClient =
    '<p style=' +
    'font-size:18px' +
    '>Dear Customer,<br> <span style=' +
    'color:green' +
    " >Your order is confirmed</span>, thank you for choosing Dipixels, our  customer representative will contact you shortly, you can find your order's detail below:\n\n\n \t\t\t" +
    '\t\t\t\t\t\t\t<h1 style=' +
    'display:' +
    'flex' +
    ';justify-content:' +
    'center' +
    '>ORDER SUMMARY</h1>' +
    '\n\n\n' +
    'Order-ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    orderId +
    '<br><br>Package Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.name +
    '<br><br>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' +
    body.price +
    '<br><br>Reference Idea:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.referenceIdea +
    '<br><br>Brief:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.brief +
    '<br><br>Targeted Audience:&nbsp;&nbsp;' +
    body.targetedAudience +
    '</p>';

  const messageForVendor =
    '<p style=' +
    'font-size:18px' +
    '><span style=' +
    'color:green' +
    ' >New order is received</span>\n\n\n \t\t\t' +
    '\t\t\t\t\t\t\t<h1 style=' +
    'display:' +
    'flex' +
    ';justify-content:' +
    'center' +
    '>ORDER SUMMARY</h1>' +
    '\n\n\n' +
    'Order-ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    orderId +
    '<br><br>Package Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.name +
    '<br><br>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.email +
    '<br><br>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' +
    body.price +
    '<br><br>Reference Idea:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.referenceIdea +
    '<br><br>Brief:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    body.brief +
    '<br><br>Targeted Audience:&nbsp;' +
    body.targetedAudience +
    '</p>';

  const mailOptions = {
    from: sendingMail,
    to: recipents,
    subject: 'Dipixels, Order recieved: ' + orderId + ' from ' + body.email,
    html: messageForVendor,
  };

  const orderConfirmOptions = {
    from: sendingMail,
    to: orderConfirmedMail,
    subject: 'Di-pixelz ,your order is confirmed, orderId :' + orderId,
    // text: messageForClient,
    html: messageForClient,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return {message: 'email sent'};
    }
    return 'mail Sent';
  });
  transporter.sendMail(orderConfirmOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return {message: 'email sent'};
    }
    return 'mail Sent';
  });
};

const contactUsMail = body => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //enable lesssecureapps from account.gmail
      //enter your credentials here
      user: 'sales@dipixels.com',
      pass: 'pixels123@A1',
    },
  });

  //list for who the mail will come to =>
  const recipent = [
    'azharbhuj@gmail.com',
    'info@dipixels.com',
    'wnasi87@gmail.com',
  ];
  const sendingMail = 'Di Pixels';

  const messageForVendor =
    "<style>tr,td {border:solid 3px #000000} </style> <h2 style='text-align:center;'>Contact Details</h2><div><table style='border: 1px solid  #000000; width: 100%;align-item:center '" +
    '</td></tr><tr><td>Name:</td><td>' +
    body.name +
    '</td></tr><tr><td>Email:</td><td>' +
    body.email +
    '</td></tr><tr><td>Contact Details:</td><td>' +
    body.phoneNumber +
    '</td></tr><tr><td>Customer Address</td><td>' +
    body.address +
    '</td></tr></table><br><br>Customers Query:<br>' +
    body.message +
    '</div>';

  const messageForClient =
    "<p style='font-size:12'>Thank you for contacting Dipixels , our customer representative will contact you shortly.</p>";

  const mailOptionClient = {
    from: sendingMail,
    to: body.email,
    subject: 'Thank you for contacting Di-pixels',
    html: messageForClient,
  };
  const mailOptionVendor = {
    from: sendingMail,
    to: recipent,
    subject: body.email + ' has contacted you on Dipixels',
    html: messageForVendor,
  };

  transporter.sendMail(mailOptionClient, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return {message: 'email sent'};
    }
    return 'mail Sent';
  });

  transporter.sendMail(mailOptionVendor, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return {message: 'email sent'};
    }
    return 'mail Sent';
  });
};

module.exports = {createMail, contactUsMail};
