exports.successResponse = (
  ctx,
  { data = null, message = "success", info = null, status = 200, link = null }
) => {
  ctx.status = status;
  ctx.body = {
    message: message,
    info: info,
    data: data,
    statusCode: status,
    link: link,
  };
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
    hints: error?.hints,
  };
  return;
};
