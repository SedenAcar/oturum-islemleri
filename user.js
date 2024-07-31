import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true}, // 'mail' yerine 'email' kullanıyoruz
    phone: {type: String, required: true}, // Number yerine String kullanıyoruz
    password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

export default User;