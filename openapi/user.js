/**
 * @swagger
 * tags:
 *   - name: User
 * components:
 *   responses:
 *     MeResult:
 *       description: "Success"
 *       content:
 *         "application/json":
 *           schema:
 *             type: "object"
 *             required:
 *               - "id"
 *               - "username"
 *               - "email"
 *               - "phone"
 *               - "role"
 *               - "language"
 *               - "active"
 *               - "updatedAt"
 *               - "createdAt"
 *               - "permissions"
 *             properties:
 *               id:
 *                 type: "integer"
 *               username:
 *                 type: "string"
 *               email:
 *                 type: "string"
 *               phone:
 *                 type: "string"
 *               role:
 *                 type: "string"
 *               language:
 *                 type: "string"
 *               active:
 *                 type: "boolean"
 *               updatedAt:
 *                 type: "string"
 *               createdAt:
 *                 type: "string"
 *               permissions:
 *                 type: "string"
 *               profile:
 *                 type: "object"
 *                 required:
 *                   - "firstName"
 *                   - "lastName"
 *                   - "patronymic"
 *                   - "gender"
 *                   - "dob"
 *                 properties:
 *                   firstName:
 *                     type: "string"
 *                   lastName:
 *                     type: "string"
 *                   patronymic:
 *                     type: "string"
 *                   gender:
 *                     type: "string"
 *                   dob:
 *                     type: "string"
 *     RolesResult:
 *       description: "Success"
 *       content:
 *         "application/json":
 *           schema:
 *             type: "array"
 *             items:
 *               type: "object"
 *               required:
 *                 - "name"
 *                 - "title"
 *                 - "permissions"
 *               properties:
 *                 name:
 *                   type: "string"
 *                 title:
 *                   type: "string"
 *                 permissions:
 *                   type: "string"
 */

/**
 * @swagger
 * 
 * /user/me:
 *   get:
 *     operationId: 'userMeGet'
 *     tags: [ User ]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MeResult'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/Error'
 * 
 * /user/roles:
 *   get:
 *     operationId: 'userRolesGet'
 *     tags: [ User ]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RolesResult'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/NoPermission'
 *       500:
 *         $ref: '#/components/responses/Error'
 * 
 */
