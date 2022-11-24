import app from '../app/app';
import request from 'supertest';
import db from '../app/models';
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

		const response = await request(app).post("/api/login").send({
			username: user.username,
			password: password
		})
		.expect(200)
		.expect("Content-Type", /json/);
		expect(response.body.token).toBeDefined();
		TOKEN = response.body.token;
  });

  test("login users", async () => {
    const response = await request(app).post("/api/login").send({
      username: user.username,
      password: password
    })
    .expect(200)
    .expect("Content-Type", /json/);
    expect(response.body.token).toBeDefined();
    // TOKEN = response.body.token;
  })

  test("users", async () => {
    const response = await request(app).get("/api/users").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
  })

  test("users find id", async () => {

    let users = await db.users.find({});
    
    expect(users[0].id).toBeDefined();
    users = users[0]

    const response = await request(app).get("/api/users/"+users.id).set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
  })

  test("users find id not found", async () => {

    const response = await request(app).get("/api/users/111").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(500)
    .expect("Content-Type", /json/);
  })

  test("users create", async () => {

		let users = await db.users.find({});

		let data = {
			username: 'admin1',
			password: password
		}
    const response = await request(app).post("/api/users").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);

		let users2 = await db.users.find({});
		expect(users2.length - 1).toBe(users.length);

    await request(app).post("/api/users").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);

		users2 = await db.users.find({});
		expect(users2.length - 2).toBe(users.length);
  })

  test("users create no username", async () => {
		let data = {
			password: '123456'
		}
    const response = await request(app).post("/api/users").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(422)
    .expect("Content-Type", /json/);
  })

  test("users create no password", async () => {
		let data = {
			username: 'admin1',
		}
    const response = await request(app).post("/api/users").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(422)
    .expect("Content-Type", /json/);
  })

  test("users update", async () => {

		let users = await db.users.find({});
    expect(users[0].id).toBeDefined();
    users = users[0]
		let rand = Math.random();
		let data = {
			username: 'admintes123'+rand,
		}

    const response = await request(app).put("/api/users/"+users.id).set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);

		users = await db.users.findById(users.id);
		expect(users.username).toBe('admintes123'+rand)
  })
  
  test("users change password", async () => {
    
    let data = {
      password: password,
      passwordReset: '1234567',
      passwordResetValid: '1234567',
    }
    
    const response = await request(app).put("/api/change-password").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);
    // console.log(response)
  })
})