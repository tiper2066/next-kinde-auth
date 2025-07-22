// @/generated/prisma에서 PrismaClient 추출
import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};
// 프로덕션 버전이라면 새로 생성한 객체로 할당
const prisma = globalForPrisma.prisma || new PrismaClient();

// 만일 개발 버전이라면.. globalForPrisma.prisma 객체로 반환한다.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; // prisma 라는 이름으로 PrismaClient 객체 반환
