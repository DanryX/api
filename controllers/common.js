module.exports = {
  /**
   * @swagger
   * components:
   *   responses:
   *     Success:
   *       description: "Success"
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *     BadRequest:
   *       description: "Bad Request"
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *             required:
   *               - "message"
   *             properties:
   *               code:
   *                 type: "integer"
   *               message:
   *                 type: "string"
   * 
   *     Unauthorized:
   *       description: "Unauthorized"
   *     Error:
   *       description: "Error"
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *             required:
   *               - "message"
   *             properties:
   *               code:
   *                 type: "integer"
   *               message:
   *                 type: "string"
   */

  main: ctx => {
    ctx.body = 'Common main route';
  }
}
