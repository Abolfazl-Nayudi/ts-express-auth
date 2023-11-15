import mongoose from 'mongoose';

const { DB_NAME, DB_URI } = process.env;
export const connectDB = (): void => {
  mongoose
    .connect(`${DB_URI}/${DB_NAME}`)
    .then(() => console.log('connected to database successfully'))
    .catch((err) => {
      console.log(`ERROR: could not connect to mongodb ${err}`);
    });
};
