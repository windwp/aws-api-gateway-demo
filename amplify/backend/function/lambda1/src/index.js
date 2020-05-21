exports.handler = async (event, context) => {
  const result = {
    message: "Hello from api 1",
    data: {
      context: event.requestContext,
      data: event.body,
    },
  };
  // TODO implement
  const response = {
    headers: ResponseHeaders,
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};

const ResponseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "content-type": "application/json;charset=UTF-8",
  connection: "close",
};
