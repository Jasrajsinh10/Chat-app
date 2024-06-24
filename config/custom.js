/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

   //custom response
  response: {
    status: 200,
    data: "",
    error: "",
    message: "",
    paymentError: {},
  },

  //added more prominent response
  newResponse: {
    status: 200,
    data: {},
    error: "",
    message: "",
    errorData: {},
    isError: false,
  },

  //AWS folder path
  AWS_FOLDER: {
    CONTENT: "images/content",
  },

  catchResponse: (err) => {
    let errorResponse = {
      status: 400,
      isError: true,
      message: "OOps! Something Went Wrong",
      error: "OOps! Something Went Wrong",
      errorData: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    };
    return errorResponse;
  },

  
};
