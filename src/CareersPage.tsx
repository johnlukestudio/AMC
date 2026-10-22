import { useState } from "react"
import { Eyebrow } from "./App"

const field =
  "w-full border-b border-black/50 bg-transparent px-3 py-4 text-body2-s text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"

const MAX_BYTES = 50 * 1024 * 1024

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
            src="/assets/factory/e307e871_image.png"
            alt=""
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

      {/* Application */}
      <section className="mx-auto grid max-w-[1750px] grid-cols-1 gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:gap-16 md:px-10 md:pt-28 md:pb-32">
        <div>
          <Eyebrow>apply</Eyebrow>
          <h2 className="mt-6 max-w-[520px] text-h3-s md:text-h3-m xl:text-h3-l leading-[1.15] text-dark-950 ">
            Build your career with us.
          </h2>
          <p className="mt-6 max-w-md text-body1-s leading-[1.6] text-black/60">
            Join our fast paced, award winning, growing company. We have a great company culture. If you want to move
            ahead in your career, American Millwork &amp; Cabinetry is the right choice for you.
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
