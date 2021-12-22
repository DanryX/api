/**
 * @swagger
 * components:
 *   requestBodies:
 *     MailBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mail'
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
 *     Unauthorized:
 *       description: "Unauthorized"
 *     NoPermission:
 *       description: "No Permission"
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
 *   schemas:
 *     Mail:
 *       type: "object"
 *       required:
 *         - "username"
 *         - "password"
 *       properties:
 *         to:
 *           type: string
 *         subject:
 *           type: string
 *         html:
 *           type: string
 *         text:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Common
 * 
 * /mail:
 *   post:
 *     operationId: 'mailPost'
 *     tags: [ Common ]
 *     security: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/MailBody'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/Error'
 * 
 */
