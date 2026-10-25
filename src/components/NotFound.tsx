import React from 'react';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0D10] text-[#F3F4F6]">
      <div className="max-w-md w-full p-8 rounded-[8px] bg-[#111418] border border-[#1F242D] space-y-6 text-center">
        <div className="inline-flex p-3 rounded-[6px] bg-[#0B0D10] border border-[#1F242D] text-[#00F5FF]">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // ERROR 404
          </span>
          <h1 className="font-syne font-bold text-3xl text-[#F3F4F6]">
            Endpoint Not Found
          </h1>
          <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
            The requested resource or system route does not exist in this repository tree.
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#00F5FF] hover:bg-white text-[#0B0D10] font-mono text-xs font-semibold uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </a>
      </div>
    </div>
  );
};
