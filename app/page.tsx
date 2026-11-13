
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F7F2] px-6 py-12">
      <section className="w-full max-w-3xl rounded-[2rem] bg-white px-7 py-12 text-center shadow-sm sm:px-14 sm:py-16">
        <p className="mb-8 text-sm font-semibold tracking-[0.3em] text-[#78968A]">
          QUIET MINDS
        </p>

        <div className="mx-auto mb-8 inline-flex rounded-full bg-[#EAF3E9] px-5 py-2 text-xs font-semibold tracking-[0.15em] text-[#587B68]">
          UNDER DEVELOPMENT
        </div>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#35483E] sm:text-5xl">
          Something thoughtful is growing.
        </h1>

        <p className="mx-auto mb-9 max-w-lg text-base leading-7 text-[#718078] sm:text-lg">
          We're building a quieter place for learning, sharing notes,
          and exploring ideas. We'll be back soon!
        </p>

        <div className="mx-auto mb-8 w-full max-w-[280px] overflow-hidden rounded-3xl bg-[#F8F5EE]">
          <Image
            src="/cat.jpeg"
            alt="Our little QUIET MINDS supervisor"
            width={600}
            height={600}
            priority
            className="h-auto w-full object-cover"
          />
        </div>

        <p className="text-sm text-[#89968E]">
          In the meantime, our supervisor is keeping an eye on things. 🐈
        </p>

        <p className="mt-10 text-xs tracking-wide text-[#A0AAA3]">
          A QUIETER WAY TO STUDY
        </p>
      </section>
    </main>
  );
}
