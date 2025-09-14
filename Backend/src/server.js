require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

// connect to MongoDB
connectDB(process.env.MONGO_URI);

// ✅ Use app.listen, not server.listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
