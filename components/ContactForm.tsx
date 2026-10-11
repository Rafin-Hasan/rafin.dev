"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Alert, Check, Send, Spinner } from "./Icons";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const MAX = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Tell me your name";
  if (!EMAIL_RE.test(f.email)) e.email = "Enter a valid email address";
  if (f.message.trim().length < 10) e.message = "A little more detail, please (10+ characters)";
  return e;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [shakeKey, setShakeKey] = useState(0);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value.slice(0, k === "message" ? MAX : 200) }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      setShakeKey((k) => k + 1);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setTimeout(() => {
        setFields({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("failed");
    }
  }

  const sending = status === "sending";
  const field = (k: keyof Fields) => ({
    id: `contact-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    disabled: sending,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
  });
  const error = (k: keyof Fields) =>
    errors[k] && (
      <span key={shakeKey} id={`contact-${k}-error`} className="animate-shake flex items-center gap-1.5 text-xs text-[#fca5a5]">
        <Alert size={14} /> {errors[k]}
      </span>
    );

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex flex-col gap-6 rounded-3xl border border-white/9 bg-[rgb(14_16_14/0.6)] p-6 backdrop-blur-lg md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
          <input {...field("name")} type="text" autoComplete="name" placeholder="Your name" className="field h-13" />
          {error("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
          <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" className="field h-13" />
          {error("email")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
          <span className="font-mono text-xs text-subtle">{fields.message.length} / {MAX}</span>
        </div>
        <textarea {...field("message")} rows={7} placeholder="Tell me about your project, role or idea…" className="field resize-none py-3.5 leading-normal" />
        {error("message")}
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[13px] text-subtle" role="status">
          {status === "failed" ? (
            <>Couldn&apos;t send right now — email me at <a className="text-signal" href={`mailto:${site.email}`}>{site.email}</a>.</>
          ) : (
            "Your details are only used to reply to you."
          )}
        </p>
        {status === "sent" ? (
          <span className="btn border border-signal-line bg-signal-soft font-semibold text-signal">
            <Check className="[stroke-dasharray:24] [animation:draw_0.5s_var(--ease-out)_both]" /> Message sent
          </span>
        ) : (
          <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-80">
            {sending ? <><Spinner className="animate-spin-slow" /> Sending…</> : <>Send message <Send className="arrow" /></>}
          </button>
        )}
      </div>
    </form>
  );
}
