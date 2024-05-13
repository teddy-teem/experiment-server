// hi.js
const bunyan = require("bunyan");
const { v4: uuidv4 } = require("uuid");

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
  const tracingId = uuidv4();
  // ctx.set("Cache-Control", "public, max-age=2000");
  ctx.set("X-Tracing-ID", tracingId);
  this.logger.info({
    tracing_id: tracingId,
    req: ctx.request.body,
    // header: ctx.request.header,
    ip: ctx.request.ip,
    res: ctx.response.body,
  });
};
