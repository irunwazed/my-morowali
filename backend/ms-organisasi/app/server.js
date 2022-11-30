import app from './app'
import db from './models';

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ${process.env.APP_NAME||''} is running on port ${PORT}.`);
});