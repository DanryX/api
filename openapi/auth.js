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
 * 
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
 * 
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
 * 
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
 * 
 * /auth/health:
 *   get:
 *     tags: [ Auth ]
 *     description: Checking token health status.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 */
