import mongoose from "mongoose";

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      username: {
				type: String,
				required: true,
        unique: true,
			},
      level: {
				type: Number,
				required: true,
			},
      password: {
				type: String,
				required: true,
			},
      profil: {
        name: String,
        nik: String,
      }
    },
    { timestamps: true }
  );
	
  const Login = mongoose.model('login', schema);

  return Login
}