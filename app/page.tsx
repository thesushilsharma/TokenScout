import Honeypot from "@/components/Honeypot";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <section className="flex flex-col items-center justify-center md:h-[40rem] w-full rounded-md relative overflow-hidden mx-auto py-10 md:py-10">
        <div className="rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <Honeypot />
        </div>
        
      </section>
      
    </main>
  );
}
