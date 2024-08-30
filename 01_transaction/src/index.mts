import { PrismaClient } from "@prisma/client";

async function main() {
  // DBに接続
  const prisma = new PrismaClient({
    log: ["query"], // 実行したSQLクエリを出力
  });

  // トランザクション
  prisma.$transaction(async (tx) => {
    try {
      // ユーザーカラムを作成
      await tx.user.create({
        data: {
          name: "User",
          email: "user@email.com",
        },
      });
      // ユーザーカラムを更新(エラーでロールバックとなるため、１つ前のユーザー作成処理は反映されない)
      await tx.user.update({
        where: { email: "guest@email.com" }, // ユニークキーで検索
        data: {
          name: "Guest",
          email: "guest@gmail.com",
        },
      });
    } catch (e) {
      throw new Error(e); // throw new Errorすると、ロールバックする。
    }
  });

  // DBとの接続を切断
  prisma.$disconnect();
}

main();
