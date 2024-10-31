import Image from "next/image";
import EmailResponseGenerator from "./email-response/components/EmailResponse";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mb-48">
        <EmailResponseGenerator />
      </main>
    </div>
  );
}
