import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.links[0].display);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (contact.formspreeId === 'YOUR_FORM_ID') {
        // Mock successful submission for preview with deliberate realistic delay
        await new Promise((resolve) => setTimeout(resolve, 850));
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const response = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMessage(
          data?.error || 'Failed to dispatch transmission. Please email directly.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Network error encountered. Please contact directly via email.'
      );
    }
  };

  const getLinkIcon = (label: string) => {
    switch (label) {
      case 'EMAIL':
        return <Mail className="w-4 h-4 text-[#38BDF8]" />;
      case 'GITHUB':
        return <Github className="w-4 h-4 text-[#00E5FF]" />;
      case 'LINKEDIN':
        return <Linkedin className="w-4 h-4 text-[#38BDF8]" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-[#9CA3AF]" />;
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Contact and Communication Channels"
    >
      {/* Section Header: Aligned flush across grid */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 07
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            COMMUNICATION PROTOCOL · KATHMANDU
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F3F4F6] tracking-tight max-w-3xl">
          {contact.headline}
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          {contact.subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Large Mono Link Rows (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563] mb-2">
            DIRECT DIRECTORY
          </div>

          {contact.links.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/50 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                    {getLinkIcon(item.label)}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563] group-hover:text-[#9CA3AF] transition-colors">
                    {item.label}
                  </span>
                </div>

                {item.label === 'EMAIL' ? (
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 font-mono text-[10px] text-[#38BDF8] hover:text-white px-2 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-[#00E5FF]" />
                        <span className="text-[#00E5FF]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-[#38BDF8] transition-colors">
                    {item.actionLabel} ↗
                  </span>
                )}
              </div>

              <a
                href={item.href}
                target={item.label === 'EMAIL' ? undefined : '_blank'}
                rel={item.label === 'EMAIL' ? undefined : 'noopener noreferrer'}
                className="font-mono text-base font-semibold text-[#F3F4F6] group-hover:text-[#38BDF8] transition-colors break-all"
              >
                {item.display}
              </a>
            </div>
          ))}

          {/* Location & Timezone metadata container */}
          <div className="p-6 rounded-[8px] bg-[#07080A] border border-[#1F242D] space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#38BDF8]">
              LOCATION & TIMEZONE
            </div>
            <div className="font-mono text-xs text-[#F3F4F6]">
              Kathmandu, Nepal (NPT · UTC +5:45)
            </div>
            <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
              Typically responding within 24 hours. Open to technical collaborations, open-source projects, and research discussions.
            </p>
          </div>
        </div>

        {/* Right Column: Working Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 lg:p-10 rounded-[8px] bg-[#111418] border border-[#1F242D]">
            <div className="flex items-center justify-between border-b border-[#1F242D] pb-5 mb-8">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#38BDF8]" />
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#F3F4F6] font-semibold">
                  TRANSMISSION CONSOLE
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4B5563]">
                ENDPOINT: FORMSPREE
              </span>
            </div>

            {/* Notification messages */}
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-[4px] bg-[#0B0D10] border border-[#00E5FF]/60 text-[#F3F4F6] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold uppercase text-[#00E5FF]">
                    TRANSMISSION DISPATCHED
                  </div>
                  <div className="font-sans text-xs text-[#9CA3AF]">
                    Thank you. Your message has been received. I will get back to you shortly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-[4px] bg-[#0B0D10] border border-red-500/60 text-[#F3F4F6] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold uppercase text-red-400">
                    TRANSMISSION ERROR
                  </div>
                  <div className="font-sans text-xs text-[#9CA3AF]">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#9CA3AF]"
                  >
                    YOUR NAME <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#F3F4F6] font-sans text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] placeholder:text-[#4B5563]"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#9CA3AF]"
                  >
                    EMAIL ADDRESS <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@domain.org"
                    className="w-full px-4 py-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#F3F4F6] font-sans text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] placeholder:text-[#4B5563]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#9CA3AF]"
                >
                  SUBJECT // TOPIC
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Khula Gyan / Research / Collaboration"
                  className="w-full px-4 py-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#F3F4F6] font-sans text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] placeholder:text-[#4B5563]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#9CA3AF]"
                >
                  MESSAGE <span className="text-[#38BDF8]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note, question, or project inquiry..."
                  className="w-full px-4 py-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#F3F4F6] font-sans text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] placeholder:text-[#4B5563] resize-y"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-3.5 rounded-[4px] bg-[#38BDF8] hover:bg-white text-[#0B0D10] font-syne font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH MESSAGE</span>
                    </>
                  )}
                </button>

                <div className="font-mono text-[10px] text-[#4B5563]">
                  ID: {contact.formspreeId} (configured in data file)
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
