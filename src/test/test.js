const supertest = require('supertest')
const app = require('../server.js')



describe('Testing our Application', function() {
    it('GET /healthz end point of the application', (done) => {
        supertest(app)
            .get('/healthz')
            .expect(400)
            .end((err, response) => {
                if (err) return done(err)
                return done()
            })
    })
    it('GET 404 API endpoint', (done) => {
        supertest(app)
            .get('/notfoundendpoint')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})
