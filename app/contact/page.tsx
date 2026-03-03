"use client";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { APP_CONFIG } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Github,
  Globe,
  Info,
  LifeBuoy,
  Linkedin,
  MessageSquare,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import React, { useState } from "react";

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactInfo = [
    {
      icon: <LifeBuoy className="text-cyan-400" />,
      title: "Technical Support",
      description:
        "Dedicated support for all your workspace and task management needs.",
      email: APP_CONFIG.TECH_SUPPORT_EMAIL,
      linkText: "Help Documentation",
      link: "mailto:" + APP_CONFIG.TECH_SECURITY_EMAIL,
      color: "cyan",
    },
    {
      icon: <Briefcase className="text-purple-400" />,
      title: "Sales Inquiries",
      description:
        "Custom solutions and enterprise-grade features for large organizations.",
      email: APP_CONFIG.SALES_EMAIL,
      linkText: "Schedule a Demo",
      link: "mailto:" + APP_CONFIG.TECH_SECURITY_EMAIL,
      color: "purple",
    },
    {
      icon: <Globe className="text-emerald-400" />,
      title: "Partnerships",
      description:
        "Collaborate with us to build integrated workflows for modern teams.",
      email: APP_CONFIG.PARTNERS_EMAIL,
      linkText: "Inquire about Partnering",
      link: "mailto:" + APP_CONFIG.TECH_SECURITY_EMAIL,
      color: "emerald",
    },
    {
      icon: <ShieldCheck className="text-pink-400" />,
      title: "Security & Trust",
      description:
        "Our team is dedicated to maintaining the highest security standards.",
      email: APP_CONFIG.TECH_SECURITY_EMAIL || "security@trackr.so",
      linkText: "Security Center",
      link: "mailto:" + APP_CONFIG.TECH_SECURITY_EMAIL,
      color: "pink",
    },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: APP_CONFIG.GITHUB_URL, name: "GitHub" },
    {
      icon: <Linkedin size={20} />,
      href: APP_CONFIG.LINKEDIN_URL,
      name: "LinkedIn",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark-0 text-white selection:bg-brand/30">
      <Navbar />

      <main className="relative pt-40 pb-32 px-4 md:px-8 overflow-hidden">
        {/* Persistent Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand/5 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/5 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Beta Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-px rounded-4xl bg-linear-to-r from-brand/30 via-brand/10 to-transparent border border-white/5 backdrop-blur-md overflow-hidden group shadow-2xl shadow-brand/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-5 rounded-[1.95rem] bg-bg-dark-0/60 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                  <Info size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">
                    Active Beta
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                      Response Guaranteed
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-400 font-light flex-1 text-center md:text-left leading-relaxed">
                Trackr is currently in public beta. Dedicated 24/7 support is
                temporarily unavailable, but anyone can contact us at{" "}
                <span className="text-white font-bold">
                  {APP_CONFIG.TECH_SUPPORT_EMAIL}
                </span>
                . We will definitely respond to all inquiries as quickly as
                possible.
              </p>
              <a
                href={`mailto:${APP_CONFIG.TECH_SUPPORT_EMAIL}`}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 hover:border-brand/40 transition-all flex items-center gap-2 group/mail"
              >
                Mail Us
                <MessageSquare
                  size={14}
                  className="group-hover/mail:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </motion.div>

          <div className="text-center mb-24 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-brand mb-8"
            >
              Get in Touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-white to-white/40"
            >
              Let's build the <br /> <span className="text-brand">future</span>{" "}
              of work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-500 font-light leading-relaxed"
            >
              Whether you're a startup or an enterprise, our team is here to
              help <br className="hidden md:block" /> you build a more efficient
              and productive organization.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-brand/30 hover:bg-white/4 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between min-h-[320px] relative overflow-hidden"
              >
                {/* Subtle highlight glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-${info.color}-500/10 blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700`}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand/10 group-hover:border-brand/20 transition-all duration-500">
                    {React.cloneElement(info.icon as React.ReactElement)}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    {info.title}
                  </h3>
                  <p className="text-lg text-neutral-500 font-light leading-relaxed max-w-sm mb-8">
                    {info.description}
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/5">
                  <a
                    href={`mailto:${info.email}`}
                    className="flex flex-col group/email"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                      Direct Line
                    </span>
                    <span className="text-lg font-medium text-white group-hover/email:text-brand transition-colors">
                      {info.email}
                    </span>
                  </a>

                  <a
                    href={info.link}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-neutral-300 hover:text-white hover:bg-white/10 hover:border-brand/50 transition-all active:scale-95 flex items-center gap-2 group/btn"
                  >
                    {info.linkText}
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Book a Call Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[3rem] bg-linear-to-br from-brand/10 via-purple-500/5 to-transparent border border-white/10 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(0,186,199,0.1),transparent_70%) opacity-50" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Schedule a discovery{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-purple-400">
                  consultation.
                </span>
              </h2>
              <p className="text-lg text-neutral-400 font-light">
                Ready to take your organization to the next level? Book a
                30-minute discovery call with our team to explore a customized
                workspace solution.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 cursor-pointer py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover hover:shadow-2xl hover:shadow-brand/30 transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  Book a Call
                  <Phone size={18} fill="currentColor" />
                </button>
                <div className="flex items-center gap-4 px-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-bg-dark-0 bg-neutral-800 overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                          alt="Team member"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">
                      Available now
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] text-neutral-500 font-medium">
                        Average response: 2h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-8">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium group"
                >
                  <span className="p-2 rounded-lg bg-white/2 border border-white/5 group-hover:bg-white/5 group-hover:text-brand transition-all">
                    {React.cloneElement(social.icon as React.ReactElement)}
                  </span>
                  {social.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-neutral-600 text-xs font-bold uppercase tracking-[0.2em]">
              <div className="w-2 h-2 rounded-full bg-brand/50" />
              HQ: {APP_CONFIG.HEADQUARTERS}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Book a Call Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-bg-dark-0/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl p-8 md:p-12 rounded-[3rem] bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden shadow-brand/10"
            >
              <div className="absolute top-0 right-0 p-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 text-neutral-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative z-10 space-y-8 text-center">
                <div className="w-16 h-16 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto text-brand">
                  <MessageSquare size={32} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    Direct booking is <br />{" "}
                    <span className="text-brand">coming soon.</span>
                  </h2>
                  <p className="text-lg text-neutral-400 font-light leading-relaxed">
                    We&apos;re currently in public beta. To ensure you get the
                    best experience, please email us directly to coordinate your
                    1-on-1 discovery consultation.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href={`mailto:${APP_CONFIG.TECH_SUPPORT_EMAIL}`}
                    className="w-full py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover hover:shadow-2xl hover:shadow-brand/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Email us to Book a Call
                    <ArrowRight size={18} />
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 bg-white/5 border border-white/5 text-sm font-bold text-neutral-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                  >
                    Maybe later
                  </button>
                </div>

                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
                  Typical response time: &lt; 2 hours
                </p>
              </div>

              {/* Decorative background for modal */}
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ContactPage;
