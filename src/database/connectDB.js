import mongoose from "mongoose";

export default async function () {
  try {
    mongoose.connect(process.env.DATABASE_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });
    connection.on("error", (err) => {
      console.error("Failed to Connect", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database Connection Error: ", error);
  }
}
