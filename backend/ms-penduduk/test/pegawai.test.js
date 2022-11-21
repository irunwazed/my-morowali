import app from '../app/app';
import request from 'supertest';
import db from '../app/models';
import bcrypt from 'bcrypt';

const table = db.pegawai;

var TOKEN = '';
var user = {};
var password = '123456';


describe("Pegawai /", () => {

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
				await table.deleteMany({})

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

  test("get load data", async () => {
    const response = await request(app).get("/api/pegawai").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
  })

  test("get find id", async () => {
		// input data
		let users = await db.users.find({});

		let data2 = {
			nama: 'admin1',
			login_id: users[0].id
		}
    const response1 = await request(app).post("/api/pegawai").set('Authorization', `Bearer ${TOKEN}`).send(data2)
    .expect(200)
    .expect("Content-Type", /json/);
		// . input data

    let data = await table.find({});
    
    expect(data[0].id).toBeDefined();
    data = data[0]

    const response = await request(app).get("/api/pegawai/"+data.id).set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
  })

  test("get create to find id not found", async () => {

		
    const response = await request(app).get("/api/pegawai/111").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(500)
    .expect("Content-Type", /json/);
  })

  test("post create", async () => {

		let datas = await table.find({});
		let users = await db.users.find({});

		let data = {
			nama: 'admin1',
			login_id: users[0].id
		}
    const response = await request(app).post("/api/pegawai").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);

		let datas2 = await table.find({});
		expect(datas2.length - 1).toBe(datas.length);

  })

  test("put create to update", async () => {

		// input data
		let users = await db.users.find({});

		let data = {
			nama: 'admin1',
			login_id: users[0].id
		}
    const response1 = await request(app).post("/api/pegawai").set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);
		// . input data

		let datas = await table.find({});
    expect(datas[0].id).toBeDefined();
    datas = datas[0]
		let rand = Math.random();
		data = {
			nama: 'admintes123'+rand,
		}

    const response = await request(app).put("/api/pegawai/"+datas.id).set('Authorization', `Bearer ${TOKEN}`).send(data)
    .expect(200)
    .expect("Content-Type", /json/);

		datas = await table.findById(datas.id);
		expect(datas.nama).toBe('admintes123'+rand)
  })
})