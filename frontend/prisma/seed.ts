import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    await prisma.learningCard.createMany({
        data: [
            { word: "你好 (Nǐ hǎo)", description: "Hello in Chinese", example: "你好，我是小明。 (Hello, I am Xiaoming.)" },
            { word: "谢谢 (Xièxiè)", description: "Thank you in Chinese", example: "谢谢你的帮助。 (Thank you for your help.)" },
            { word: "再见 (Zàijiàn)", description: "Goodbye in Chinese", example: "再见！明天见。 (Goodbye! See you tomorrow.)" },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })