"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding NEP 2020 Timetable Database...');
    // Hash default password
    const passwordHash = await bcryptjs_1.default.hash('password123', 10);
    // 1. Create Users
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@university.edu' },
        update: {},
        create: {
            email: 'admin@university.edu',
            passwordHash,
            name: 'Dr. A. K. Sharma',
            role: 'COLLEGE_ADMIN',
            phone: '+91 9876543210'
        }
    });
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
