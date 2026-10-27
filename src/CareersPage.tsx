import { useState } from "react"
import { Eyebrow, OutlineButton } from "./App"

const field =
  "w-full border-b border-black/50 bg-transparent px-3 py-4 text-body2-s text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"

const MAX_BYTES = 50 * 1024 * 1024

const GROWTH = [
  {
    name: "Tyler Ferrell",
    role: "Estimating",
    body: "Started after school, then summers, then full time. Led the milling department before moving into estimating. “Here at American Millwork I have a lot of options.”",
  },
  {
    name: "Kyle Morgan",
    role: "Custom Millwork Engineer",
    body: "Employee number three. Started on the bench, then team leader, production supervisor, production manager, and now lead engineer for custom work. “I want what nobody else wants to do.”",
  },
  {
    name: "Hunter",
    role: "Lead Engineer",
    body: "Joined right out of college as a drafter, then lead submittal engineer, then lead engineer. “American Millwork gives everyone opportunities to grow their career here.”",
  },
]

const CULTURE = [
  {
    title: "Continual improvement",
    body: "Lean here means getting better every day. Cross-training keeps skills sharp and moves people where the work needs them.",
  },
  {
    title: "QC at every handoff",
    body: "The next station is the customer. Edge-banders can push bad parts back. We check quality at every step, not five minutes before the truck leaves.",
  },
  {
    title: "Room to grow",
    body: "Stay on the bench if that is what you love, or move into estimating, engineering, or project management. The path is open if you go after it.",
  },
]

export function CareersPage() {
  const [sent, setSent] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")

  return (
    <>
      {/* Video opener */}
      <section className="mx-auto max-w-[1750px] px-6 pt-24 md:px-10 md:pt-[100px]">
        <button
          type="button"
          aria-label="Play video: We're hiring at American Millwork & Cabinetry"
          className="group relative block aspect-[16/9] w-full overflow-hidden bg-black text-left md:aspect-[21/9]"
        >
          <img
            src="/media/factory/e307e871_image.png"
            alt="AMC Emmaus shop floor"
            className="absolute inset-0 size-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black sm:size-24 md:size-32">
            <svg width="26" height="30" viewBox="0 0 22 26" fill="currentColor" className="ml-1">
              <path d="M22 13 0 26V0z" />
            </svg>
          </span>
          <span className="absolute left-6 top-6 text-body2-s text-white md:left-8 md:top-8">careers</span>
          <span className="absolute right-6 top-6 text-caption-s uppercase tracking-[0.16em] text-white/70 md:right-8 md:top-8">
            Video · 02:30
          </span>
          <h1 className="absolute bottom-6 left-6 max-w-[900px] text-h3-s sm:text-h2-m md:text-h1-m xl:text-h1-l leading-[1.05] tracking-[-0.02em] text-white md:bottom-10 md:left-8 ">
            We're hiring
            <br />
            in Emmaus.
          </h1>
        </button>
      </section>

      {/* Site visit CTA (George's applicant advice) */}
      <section className="mx-auto max-w-[1750px] px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-10 border-b border-black/15 pb-16 md:grid-cols-2 md:items-end md:pb-20">
          <div>
            <Eyebrow>visit first</Eyebrow>
            <h2 className="mt-6 max-w-[560px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.15] text-dark-950 ">
              Come for a site visit. Talk to the people who do the work.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <p className="max-w-md text-body1-s leading-[1.6] text-black/60 md:text-right">
              George&apos;s advice to applicants is simple: walk the shop, meet the team face to face, and see
              whether this is a place you want to be part of. Then apply below.
            </p>
            <a href="#/contact">
              <OutlineButton>Request a site visit</OutlineButton>
            </a>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="mx-auto max-w-[1750px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <Eyebrow>how we work</Eyebrow>
          <h2 className="max-w-[520px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.15] md:text-right ">
            Lean habits. Real handoffs. Room to grow.
          </h2>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CULTURE.map((c, i) => (
            <div key={c.title} className="border-t border-black/20 pt-6">
              <span className="text-caption-s text-black/50">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-h4-m leading-[1.25]">{c.title}</h3>
              <p className="mt-3 text-body2-s leading-[1.6] text-black/60">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Growth stories */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1750px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <Eyebrow>growth here</Eyebrow>
            <h2 className="max-w-[520px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.15] md:text-right ">
              If you want more, this is a place that has it.
            </h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {GROWTH.map((g) => (
              <blockquote key={g.name} className="border-l border-white/25 pl-5">
                <p className="text-body1-s leading-[1.6] text-white/80">{g.body}</p>
                <footer className="mt-6 text-caption-s uppercase tracking-[0.12em] text-white/50">
                  {g.name} · {g.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section className="mx-auto grid max-w-[1750px] grid-cols-1 gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:gap-16 md:px-10 md:pt-28 md:pb-32">
        <div>
          <Eyebrow>apply</Eyebrow>
          <h2 className="mt-6 max-w-[520px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.15] text-dark-950 ">
            Ready to build with us?
          </h2>
          <p className="mt-6 max-w-md text-body1-s leading-[1.6] text-black/60">
            After you visit, send a short note and your resume. We hire across skill levels when people show up
            ready to learn, work, and take pride in what leaves the dock.
          </p>
        </div>
        <div className="w-full md:max-w-[560px] md:justify-self-end">
        {sent ? (
          <p className="border-t border-black/10 pt-8 text-body2-s leading-[1.6] text-black/60">
            Thanks, your application is in. Our team will review it and get back to you shortly.
          </p>
        ) : (
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault()
              if (!fileError) setSent(true)
            }}
          >
            <input required name="name" placeholder="Name" className={field} />
            <input type="tel" name="phone" placeholder="Phone number" className={field} />
            <input required type="email" name="email" placeholder="Email" className={field} />

            <div className="border-b border-black/50 px-3 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-body2-s text-black/30">Upload resume</span>
                <label className="cursor-pointer rounded-full border border-dark-950 px-5 py-2 text-caption-s uppercase tracking-wide text-dark-950 transition-colors duration-300 hover:bg-dark-950 hover:text-white focus-within:bg-dark-950 focus-within:text-white">
                  {file ? "Replace file" : "Choose file"}
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null
                      setFile(f)
                      setFileError(f && f.size > MAX_BYTES ? "File exceeds 50 MB." : "")
                    }}
                  />
                </label>
              </div>
              {file && <p className="mt-3 truncate text-body2-s text-black">{file.name}</p>}
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-caption-s text-black/50">
                <span>Accepted file types: PDF, DOC, DOCX</span>
                <span>Max. file size: 50 MB</span>
              </div>
              {fileError && <p className="mt-2 text-caption-s text-gold-800">{fileError}</p>}
            </div>

            <textarea
              required
              name="message"
              placeholder="Message or relevant information"
              rows={3}
              className={`${field} resize-none`}
            />
            <button
              type="submit"
              className="mt-8 h-[50px] w-full max-w-[347px] rounded-full border border-dark-950 text-body2-s capitalize text-dark-950 transition-colors duration-300 hover:bg-dark-950 hover:text-white"
            >
              Submit
            </button>
          </form>
        )}
        </div>
      </section>
    </>
  )
}
