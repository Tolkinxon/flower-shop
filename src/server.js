import express from 'express';
import { serverConfig } from './config.js';
import { mainRouter } from './routes/main.routes.js';
import cron from "node-cron";
import { fetchQuery } from './lib/connection.js';

const app = express();

// Har hafta dushanba kuni 23:30 da ishga tushadi
cron.schedule('30 23 * * 1', async () => {
  try {
    console.log('🧹 Cron ishga tushdi: payments va orders tozalanmoqda...');

    await fetchQuery('DELETE FROM payments WHERE paid_date < NOW() - INTERVAL 7 DAY;');
    await fetchQuery('DELETE FROM orders WHERE order_date < NOW() - INTERVAL 7 DAY AND status_id = 3;');

    console.log("✅ Ma'lumotlar muvaffaqiyatli o'chirildi!");
  } catch (error) {
    console.error("❌ Xatolik yuz berdi:", error.message);
  }
});

app.use(express.json());
app.use('/api', mainRouter);


const { PORT } = serverConfig;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));