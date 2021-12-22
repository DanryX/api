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
 *             $ref: '#/components/schemas/Registration'
 *     ViaUsernameBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ViaUsername'
 *     ViaPhoneBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ViaPhone'
 *     ForgotBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Forgot'
 *     ResetPasswordBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
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
 *     ForgotResult:
 *       description: "Success"
 *       content:
 *         "application/json":
 *           schema:
 *             type: "object"
 *             required:
 *               - "link"
 *             properties:
 *               link:
 *                 type: "string"
 *   schemas:
 *     Registration:
 *       type: "object"
 *       required:
 *         - "username"
 *         - "password"
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     ViaUsername:
 *       type: "object"
 *       required:
 *         - "username"
 *         - "password"
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     ViaPhone:
 *       type: "object"
 *       required:
 *         - "phone"
 *         - "password"
 *       properties:
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *     Forgot:
 *       type: "object"
 *       properties:
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *     ResetPassword:
 *       type: "object"
 *       properties:
 *         password:
 *           type: string
*/

/**
 * @swagger
 * 
 * /auth/registration:
 *   post:
 *     operationId: 'authRegistrationPost'
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
 * 
 * /auth/via-username:
 *   post:
 *     operationId: 'authViaUsernamePost'
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
 * 
 * /auth/via-phone:
 *   post:
 *     operationId: 'authViaPhonePost'
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
 * 
 * /auth/forgot:
 *   post:
 *     operationId: 'authForgotPost'
 *     tags: [ Auth ]
 *     security: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/ForgotBody'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ForgotResult'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/Error'
 * 
 * /auth/reset-password/{token}:
 *   get:
 *     operationId: 'authResetPasswordTokenGet'
 *     tags: [ Auth ]
 *     security: []
 *     parameters:
 *       - in: "path"
 *         name: "token"
 *         schema:
 *           type: "string"
 *         required: true
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     operationId: 'authResetPasswordTokenPost'
 *     tags: [ Auth ]
 *     security: []
 *     parameters:
 *       - in: "path"
 *         name: "token"
 *         schema:
 *           type: "string"
 *         required: true
 *     requestBody:
 *       $ref: '#/components/requestBodies/ResetPasswordBody'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/Error'
 * 
 * /auth/health:
 *   get:
 *     operationId: 'authHealthGet'
 *     tags: [ Auth ]
 *     description: Checking token health status.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 */
