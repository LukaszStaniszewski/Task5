const{ Schema, model } = require("mongoose");

const userSchema  = new Schema({
  username: {
    type: String, 
    required: [true, 'Username cannot be blank'],
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true
  }
})


// userSchema.pre('save', async function(next) {
//   if(!this.isModified('password')) return next()
//   const salt = await bcrypt.genSalt(12);
//   const hashedPassword = await bcrypt.hash(this.password, salt)
//   this.password = hashedPassword
//   return next()
// })

// userSchema.pre('save', function(next) {
//   this.lastLogin = Date.now();
//   next()
// })

// userSchema.methods.comparePassword = async function(plaintextPassword) {
//   const result = await bcrypt.compare(plaintextPassword, this.password)
//   .catch(e => false)
//   return result
// }

const UserModel =  model('User', userSchema);
module.exports = UserModel