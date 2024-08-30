import { PrismaClient } from "@prisma/client";

async function main() {
  // DBに接続
  const prisma = new PrismaClient({
    log: ["query"], // 実行したSQLクエリを出力
  });
  // ユーザーカラムを作成
  await prisma.user.create({
    data: {
      name: "User",
      email: "user@email.com",
    },
  });
  // ユーザーカラムを更新
  await prisma.user.update({
    where: { email: "user@email.com" }, // ユニークキーで検索
    data: {
      name: "User",
      email: "user@gmail.com",
    },
  });
  // すべてのユーザーカラムを取得
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  // 特定のユーザーカラムを取得
  const user = await prisma.user.findUnique({
    where: { email: "user@email.com" },
  });
  console.log(user);
  // ユーザーカラムを削除
  await prisma.user.delete({
    where: { email: "user@gmail.com" }, // ユニークキーで検索
  });
  // DBとの接続を切断
  prisma.$disconnect();
}

main();
