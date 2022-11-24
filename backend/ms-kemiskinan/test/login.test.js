import app from '../app/app';
import request from 'supertest';
import db from '../app/models'
import bcrypt from 'bcrypt';

var TOKEN = '';
var user = {};
var password = '123456';


describe("GET /", () => {

  beforeEach(async () => {

		db.mongoose
				.connect('mongodb://localhost:27017/db_tes', {
					useNewUrlParser: true,
					useUnifiedTopology: true
				})
				.then(() => {
					// console.log("Connected to the database!");
				})
				.catch(err => {
					// console.log("Cannot connect to the database!", err);
					process.exit();
				});

    await db.users.deleteMany({})

    const users = new db.users({
			username: 'admin',
			password: bcrypt.hashSync(password, 10),
		})

    await users.save(users);

    await db.users.find({})
              .then(data => {
                user = data[0]
              })
              .catch(err => {
                console.log(err.message)
              });
  });

  test("login test", async () => {
    const response = await request(app).get("/api/tes").send({}).expect(200)
    .expect("Content-Type", /json/);
    expect(response.statusCode).toBe(200);
  })

  test("login post 1", async () => {
    const response = await request(app).post("/api/login").send({
      username: user.username,
      password: password
    })
    .expect(200)
    .expect("Content-Type", /json/);
    expect(response.body.token).toBeDefined();
    TOKEN = response.body.token;
    
  })

  test("login post username not found", async () => {
    const response = await request(app).post("/api/login").send({
      password: password
    })
    .expect(422)
    .expect("Content-Type", /json/);
    // TOKEN = response.body.token;
  })

  test("login post password not found", async () => {
    const response = await request(app).post("/api/login").send({
      username: password
    })
    .expect(422)
    .expect("Content-Type", /json/);
    // TOKEN = response.body.token;
  })

  test("login post wrong username", async () => {
    const response = await request(app).post("/api/login").send({
      username: 'admin11',
      password: password
    })
    .expect(400)
    .expect("Content-Type", /json/);
    // TOKEN = response.body.token;
  })

  test("login post wrong password", async () => {
    const response = await request(app).post("/api/login").send({
      username: 'admin',
      password: password+'123sdfsdfsd'
    })
    .expect(400)
    .expect("Content-Type", /json/);
    // TOKEN = response.body.token;
  })

  test("login check", async () => {
    const response = await request(app).get("/api/cek-login").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })

  test("login check fake credentials", async () => {
    const response = await request(app).get("/api/cek-login").set('Authorization', `Bearer ${TOKEN}2`).send({})
    .expect(500)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })

  test("login check fake authorrization", async () => {
    const response = await request(app).get("/api/cek-login").set('Authorization', `Bearer${TOKEN}`).send({})
    .expect(404)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })

  test("login check no authorrization", async () => {
    const response = await request(app).get("/api/cek-login").send({})
    .expect(404)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })
})