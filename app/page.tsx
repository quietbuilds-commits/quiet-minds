


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ✏️ CHANGE THIS QUOTE EVERY WEEK
const WEEKLY_QUOTE = {
  text: "QUIET MINDS IS SOON GOING TO HIRE TECHNICAL SKILLED STUDENTS BE READY ",
  author: ".",
};

const recentUploads = [
  {
    title: "Recently added materials",
    description: "New notes and PDFs will appear here.",
    icon: "▤",
    color: "bg-[#B8E9DC]",
  },
  {
    title: "Your study resources",
    description: "Explore subjects to find your materials.",
    icon: "▣",
    color: "bg-[#DCC8F5]",
  },
];

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowDisclaimer(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8EE] text-[#292333]">
      {showDisclaimer && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3"
        >
          <div className="max-w-2xl rounded-xl border-2 border-[#292333] bg-[#FFF8EE] px-4 py-3 text-center text-xs font-medium leading-5 shadow-[4px_4px_0_#292333] sm:text-sm">
            <span className="font-black">A quick note: </span>
            QUIET MINDS is an independent educational resource and is not an official website of, or affiliated with, any educational institution.
          </div>
        </div>
      )}

      {/* WEEKLY QUOTE — FIRST THING VISITORS SEE */}
      <section className="relative border-b-[3px] border-[#292333] bg-[#FFE17A] px-5 py-9 sm:py-12">
        <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[3px] border-[#292333] opacity-20" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border-2 border-[#292333] bg-white px-4 py-1.5 text-[10px] font-black tracking-[0.2em] shadow-[3px_3px_0_#292333]">
            A THOUGHT FOR THIS WEEK ✦
          </span>

         <h1 className="mx-auto mt-5 max-w-3xl text-xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            “{WEEKLY_QUOTE.text}”
          </h1>

          <p className="mt-4 text-sm font-bold tracking-wide sm:text-base">
            — {WEEKLY_QUOTE.author}
          </p>
        </div>
      </section>

      {/* BRANCH BUTTONS */}
      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-5">

          <Link
            href="/ece"
            className="group relative rounded-2xl border-[3px] border-[#292333] bg-[#91C5F5] p-4 shadow-[5px_5px_0_#292333] transition duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_#292333] sm:rounded-3xl sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border-2 border-[#292333] bg-white px-2 py-1 text-[8px] font-black tracking-wider sm:px-3 sm:text-[10px]">
                AVAILABLE NOW
              </span>
              <span className="text-xl font-black sm:text-2xl">↗</span>
            </div>

            <h2 className="mt-5 text-3xl font-black sm:mt-8 sm:text-5xl">
              ECE
            </h2>
            <p className="mt-2 text-[11px] font-semibold leading-5 sm:text-sm">
              Years, semesters, subjects and study materials.
            </p>
          </Link>

          <div className="relative rounded-2xl border-[3px] border-[#292333] bg-[#FFB6A3] p-4 shadow-[5px_5px_0_#292333] sm:rounded-3xl sm:p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full border-2 border-[#292333] bg-white px-2 py-1 text-[8px] font-black tracking-wider sm:px-3 sm:text-[10px]">
                COMING SOON
              </span>
              <span className="text-xl sm:text-2xl">✿</span>
            </div>

            <h2 className="mt-5 text-xl font-black sm:mt-8 sm:text-4xl">
              Other Branches
            </h2>
            <p className="mt-2 text-[11px] font-semibold leading-5 sm:text-sm">
              More learning spaces are on the way.
            </p>
          </div>

        </div>
      </section>

      {/* HEADER */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between border-y-[3px] border-[#292333] bg-[#FFF8EE] px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group">
          <span className="text-xl font-black tracking-tight sm:text-2xl">
            QUIET MINDS<span className="text-[#9874C8]">.</span>
          </span>
          <span className="block text-[8px] font-bold tracking-[0.2em] text-[#766B7B] sm:text-[9px]">
            A LITTLE SPACE TO LEARN
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search coming soon"
            title="Search coming soon"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[#292333] bg-white shadow-[3px_3px_0_#292333] transition hover:-translate-y-0.5 sm:h-11 sm:w-11"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>

          <details className="group relative">
            <summary
              aria-label="Open menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border-[2px] border-[#292333] bg-[#C5B0F0] shadow-[3px_3px_0_#292333] transition hover:-translate-y-0.5 [&::-webkit-details-marker]:hidden sm:h-11 sm:w-11"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>

            <div className="absolute right-0 mt-3 w-64 rounded-2xl border-[2px] border-[#292333] bg-white p-3 shadow-[5px_5px_0_#292333]">
              <p className="px-3 pb-2 pt-1 text-xs font-black uppercase tracking-widest text-[#766B7B]">
                Quick links
              </p>

              <Link
                href="/admin"
                className="block rounded-xl px-3 py-3 text-sm font-bold transition hover:bg-[#F0E8FC]"
              >
                Admin Login
              </Link>

              {[
                "Guardian Angel Login",
                "The Protector Login",
                "Branch Admin Login",
                "Contact Admin",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#6F6877]"
                >
                  {item}
                  <span className="text-[9px] font-bold text-[#A093A6]">
                    Coming later
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative border-b-[3px] border-[#292333] px-5 py-10 sm:px-8 sm:py-16 lg:px-12"
        style={{
          backgroundImage: "url('/your-background.png')",
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_1fr] lg:gap-12">

          <div>
            <span className="inline-block rounded-full border-2 border-[#292333] bg-white px-3 py-1.5 text-[9px] font-black tracking-widest shadow-[3px_3px_0_#292333] sm:text-[10px]">
              WELCOME TO QUIET MINDS
            </span>

            <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              A quieter
              <br />
              place to{" "}
              <span className="text-[#9874C8]">study.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#2434FE] sm:text-base">
              Your notes, your subjects at one place.
              <br />
              Take a breath. Find what you need. Keep learning.
            </p>

            <Link
              href="/ece"
              className="mt-7 inline-flex items-center gap-3 rounded-xl border-[3px] border-[#292333] bg-[#FFE17A] px-5 py-3 text-sm font-black shadow-[5px_5px_0_#292333] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#292333]"
            >
              Explore your study space
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* ADD YOUR PNG TO public/quiet-minds-hero.png */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute inset-3 translate-x-2 translate-y-2 rounded-3xl border-[3px] border-[#292333] bg-[#FFB6A3]" />
            <div className="relative overflow-hidden rounded-3xl border-[3px] border-[#292333] bg-[#DCC8F5] p-3 shadow-[6px_6px_0_#292333]">
              <Image
                src="/quiet-minds-hero.png"
                alt="Cozy illustration for QUIET MINDS"
                width={900}
                height={700}
                priority
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SOCRATES QUOTE */}
      <section className="bg-[#C5B0F0] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl rounded-3xl border-[3px] border-[#292333] bg-[#FFF8EE] px-5 py-8 text-center shadow-[6px_6px_0_#292333] sm:px-12 sm:py-12">
          <span className="text-3xl">✦</span>
          <h2 className="mt-4 text-lg font-black leading-tight sm:text-2xl">
            “The only true wisdom is in knowing you know nothing.”
          </h2>
          <p className="mt-4 text-sm font-bold tracking-widest text-[#766B7B]">
            — SOCRATES
          </p>
        </div>
      </section>

      {/* UPCOMING EXAMS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#766B7B]">
              KEEP AN EYE OUT
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Upcoming Exams
            </h2>
          </div>
          <span className="text-3xl">📅</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl border-[3px] border-[#292333] bg-[#B8E9DC] p-6 shadow-[5px_5px_0_#292333] sm:p-8">
          <span className="text-3xl">🌱</span>
          <h3 className="mt-3 text-lg font-black">
            Stay prepared, not stressed.
          </h3>
          <p className="mt-2 max-w-lg text-sm font-medium leading-6 text-[#506E65]">
            Exam schedules and important announcements will find a home here.
            Check back for updates.
          </p>
        </div>
      </section>

      {/* RECENTLY UPLOADED */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#766B7B]">
              FRESH FROM THE LIBRARY
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Recently Uploaded
            </h2>
          </div>
          <span className="text-2xl">✦</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {recentUploads.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border-[3px] border-[#292333] ${item.color} p-5 shadow-[4px_4px_0_#292333]`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#292333] bg-white text-xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#62586B]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs font-medium text-[#8B8190]">
          Latest uploads from all semesters will appear here.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t-[3px] border-[#292333] bg-[#292333] px-5 py-10 text-center text-white">
        <p className="text-xl font-black tracking-tight">
          QUIET MINDS<span className="text-[#FFE17A]">.</span>
        </p>

        <p className="mt-2 text-sm text-[#E5D9ED]">
          A quieter way to study.
        </p>

        <div className="mx-auto mt-6 h-px max-w-xs bg-[#766B7B]" />

        <p className="mt-5 text-xs text-[#C3B8C9]">
          Made for curious minds. © {new Date().getFullYear()} QUIET MINDS
        </p>
      </footer>

    </main>
  );
}
