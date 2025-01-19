const redis = require('redis')
require('dotenv').config()

// Membuat client Redis
const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

// Menangani event koneksi
client.on('connect', () => {
    console.log('Client connected to Redis')
})

// Menangani event saat client siap
client.on('ready', () => {
    console.log('Client connected to Redis and ready to use')
})

// Menangani error
client.on('error', (err) => {
    console.log('Redis error:', err.message)
})

// Menangani event saat koneksi ditutup
client.on('end', () => {
    console.log('Client disconnected from Redis')
})

// Menangani signal SIGINT untuk menutup koneksi saat aplikasi dihentikan
process.on('SIGINT', async () => {
    await client.quit() // Gunakan await untuk memastikan client ditutup dengan benar
    process.exit() // Menyelesaikan proses
});

// Menghubungkan ke Redis
async function connectRedis() {
    try {
        await client.connect();
        console.log('Connected to Redis')
    } catch (err) {
        console.log('Error connecting to Redis:', err.message)
    }
}

// Panggil fungsi connectRedis untuk menghubungkan ke Redis
connectRedis()

module.exports = client
