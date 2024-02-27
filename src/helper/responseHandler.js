exports.successResponse = (ctx, res, status = 200) => {
  console.log(res);
  ctx.status = status;
  ctx.body = { data: res, responseStatus: "Successful", statusCode: status };
};

exports.failedResponse = (ctx, error) => {
  if (error.status) {
    ctx.status = error.status;
  } else {
    ctx.status = 500;
  }
  ctx.body = {
    message: error.message,
    responseStatus: "Failed",
    statusCode: ctx.status,
  };
  return;
};
