import { getServerSession } from "next-auth";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";
import Book from "./components/Book";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  const { contents } = await getAllBooks();

  let purchasesData = [];
  let purchasedIds: number[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );

    purchasesData = await response.json();
    purchasedIds = purchasesData.map((purchase: Purchase) => purchase.bookId);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-16 mt-10">
        <h2 className="text-center w-full font-bold text-3xl mb-2">商品一覧</h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchasedIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
