const request = require("supertest")
const app     = require("./index.js")


describe('Tests fonctionnel', () => {

	it('Réponse avec "HelloWorld" sur la requète GET /', async () => {
		const response = await request(app).get("/")
		expect(response.statusCode).toBe(200)
		expect(response.text).toBe("hello worl")
	})

})