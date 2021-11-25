const bcrypt = require('bcrypt');

const passport = require('../core/auth');

const { models: { User } } = require('../core/db');

module.exports = {
  /**
   * @swagger
   * tags:
   *   - name: Auth
   * components:
   *   requestBodies:
   *     RegistrationBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *             required:
   *               - "username"
   *               - "password"
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     ViaUsernameBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *             required:
   *               - "username"
   *               - "password"
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     ViaPhoneBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: "object"
   *             required:
   *               - "phone"
   *               - "password"
   *             properties:
   *               phone:
   *                 type: string
   *               password:
   *                 type: string
   *   responses:
   *     RegistrationResult:
   *       description: "Success"
   *       content:
   *         "application/json":
   *           schema:
   *             type: "object"
   *             required:
   *               - "id"
   *             properties:
   *               id:
   *                 type: "integer"
   *     ViaUsernameResult:
   *       description: "Success"
   *       content:
   *         "application/json":
   *           schema:
   *             type: "object"
   *             required:
   *               - "id"
   *               - "username"
   *               - "accessToken"
   *               - "refreshToken"
   *             properties:
   *               id:
   *                 type: "integer"
   *               username:
   *                 type: "string"
   *               accessToken:
   *                 type: "string"
   *               refreshToken:
   *                 type: "string"
   *     ViaPhoneResult:
   *       description: "Success"
   *       content:
   *         "application/json":
   *           schema:
   *             type: "object"
   *             required:
   *               - "id"
   *               - "phone"
   *               - "accessToken"
   *               - "refreshToken"
   *             properties:
   *               id:
   *                 type: "integer"
   *               phone:
   *                 type: "string"
   *               accessToken:
   *                 type: "string"
   *               refreshToken:
   *                 type: "string"
  */

  /**
   * @swagger
   * /auth/registration:
   *   post:
   *     tags: [ Auth ]
   *     security: []
   *     requestBody:
   *       $ref: '#/components/requestBodies/RegistrationBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/RegistrationResult'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/Error'
   */

  registration: async (ctx, next) => {
    const { username, email, password } = ctx.request.body;

    if (!username) ctx.throw(400, 'Username required.');
    if (!password) ctx.throw(400, 'Password required.');

    const existEmail = await User.findOne({ where: { email } });
    if (!!existEmail) ctx.throw(400, 'Email already exist.');

    const existUser = await User.findOne({ where: { username } });
    if (!!existUser) ctx.throw(400, 'Username already exist.');

    const userData = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role: 'user',
      active: 1
    };

    await User.create(userData)
      .then((data) => ctx.body = { id: data.id })
      .catch(err => ctx.throw(err));
  },

  /**
   * @swagger
   * /auth/via-username:
   *   post:
   *     tags: [ Auth ]
   *     security: []
   *     requestBody:
   *       $ref: '#/components/requestBodies/ViaUsernameBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ViaUsernameResult'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/Error'
   */

  viaUsername: (ctx, next) => {
    return passport.authenticate('local', (err, user, info) => {
      if (!!err) ctx.throw(500, err);

      if (user === false) {
        ctx.status = 400;
        ctx.body = info;
      } else {
        ctx.body = user;
      }
    })(ctx, next);
  },

  /**
   * @swagger
   * /auth/via-phone:
   *   post:
   *     tags: [ Auth ]
   *     security: []
   *     requestBody:
   *       $ref: '#/components/requestBodies/ViaPhoneBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ViaPhoneResult'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/Error'
   */

  viaPhone: (ctx, next) => {
    return passport.authenticate('phone', (err, user, info) => {
      if (!!err) ctx.throw(500, err);

      if (user === false) {
        ctx.status = 400;
        ctx.body = info;
      } else {
        ctx.body = user;
      }
    })(ctx, next);
  },

  // refresh: (ctx, next) => {
  //   ctx.body = 'Refresh token';
  // },

  /**
   * @swagger
   * /auth/health:
   *   get:
   *     tags: [ Auth ]
   *     description: Checking token health status.
   *     responses:
   *       200:
   *         $ref: '#/components/responses/Success'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */

  health: (ctx, next) => {
    ctx.body = 'Token is valid';
  }
}
