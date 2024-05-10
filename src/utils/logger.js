// hi.js
const bunyan = require("bunyan");
exports.logger = bunyan.createLogger({
  name: "myapp",
  serializers: {
    req: bunyan.stdSerializers.req, // Serializes the request object
    ip: bunyan.stdSerializers.req, // Serializes the request object
    res: bunyan.stdSerializers.res, // Serializes the response object
    err: bunyan.stdSerializers.err, // Serializes error objects
  },
});

exports.log = async (ctx, next) => {
  await next();
  this.logger.info({
    req: ctx.request.body,
    // header: ctx.request.header,
    ip: ctx.request.ip,
    res: ctx.response.body,
  });
};
