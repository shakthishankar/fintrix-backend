const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const connectPostgres = async () => {
    try {
        await prisma.$connect();
        console.log('✅ PostgreSQL connected successfully via Prisma');
    } catch (error) {
        console.error('❌ PostgreSQL connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = { connectPostgres, prisma };