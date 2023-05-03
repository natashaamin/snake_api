import dotenv from 'dotenv';
import { app } from '/Users/natashaamin/Documents/snake/snake_api/src/app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})