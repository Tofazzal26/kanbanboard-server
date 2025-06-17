import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rgxjhma.mongodb.net/kanban?retryWrites=true&w=majority&appName=Cluster0`
    );
    // console.log(`✅ MongoDB Connected`);
  } catch (error) {
    // console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
