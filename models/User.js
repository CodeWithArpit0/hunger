import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      maxlength: 25,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        title: {
          type: String,
          maxlength: 60,
        },
        desc: {
          type: String,
          maxlength: 200,
        },
        img: {
          type: String,
        },
        price: {
          type: Number,
        },
        extraOptions: {
          type: [
            {
              text: { type: String, required: true },
              price: { type: Number, required: true },
            },
          ],
        },
        total: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
