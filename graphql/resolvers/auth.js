const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async (args, req) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, _id: result._doc._id, password: null };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Incorrect Passsword");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "secretKeyForToken",
        { expiresIn: "1h" }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  },
};

// # mutation{
//   #   createEvent(eventInput:{title:"title",description:"titli udi badi tej",price:100,date:"Fri May 08 2020 21:39:59 GMT+0530"}){
//   #     _id,
//   #     title,
//   # 		description,
//   #     price,
//   #     date,
//   #     creator{
//   #       email
//   #     }
//   #   }
//   # }

//   # query{
//   #   events{
//   #     _id,
//   #     title,
//   #     description,
//   #     price,
//   #     date,
//   #     creator{
//   #       _id,
//   #       email
//   #     }
//   #   }
//   # }

//   # mutation{
//   #   createUser(userInput:{email:"jjjjkoj",password:"dcjsndcjsdcn"}){
//   #     _id,
//   #     email,
//   #     password
//   #   }
//   # }

//   # query{
//   #   login(email:"jjjjkoj",password:"dcjsndcjsdcn"){
//   #     userId,
//   #     token,
//   #     tokenExpiration
//   #   }
//   # }

//   # mutation{
//   #   bookEvent(eventId:"5eb5cdfcba728539116be689"){
//   #     _id,
//   #     event{
//   #       price,
//   #       date,
//   #       description
//   #     },
//   #     user{
//   #       _id
//   #     }
//   #   }
//   # }

//   # query{
//   #   bookings{
//   #     _id,
//   #     createdAt,
//   #     event{
//   #       price,
//   #       date,
//   #       creator{
//   #         email
//   #       }
//   #     }
//   #   }
//   # }

//   # mutation{
//   #   cancelBooking(bookingId:"5eb89e70dc7fa53ff94efc36"){
//   #     _id,
//   #     description,
//   #     date,
//   #     price,
//   #     creator{
//   #       email
//   #     }
//   #   }
//   # }
