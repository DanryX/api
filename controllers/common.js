module.exports = {
  main: (ctx, next) => {
    ctx.body = 'Common main route';
    next();
  },

  mail: async (ctx, next) => {
    await ctx.sendMail(ctx.request.body)
      .then(data => ctx.body = data)
      .catch(err => {
        ctx.status = 400;
        ctx.body = { message: err.message }
      });

    next();
  }
}
