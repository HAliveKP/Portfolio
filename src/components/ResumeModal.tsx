import React, { useEffect } from 'react';
import {
  X,
  Download,
  GraduationCap,
  Briefcase,
  Code,
  MapPin,
  Mail,
  FileText,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B0D10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Harikrishna Pokhrel Resume"
    >
      <div className="w-full max-w-3xl max-h-[90vh] rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#161B22] px-6 py-4 border-b border-[#1F242D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#F3F4F6] font-semibold">
              CURRICULUM VITAE // HARIKRISHNA POKHREL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Harikrishna_Pokhrel_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#38BDF8] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded-[4px] hover:bg-[#0B0D10] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Formatted CV */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans text-[#F3F4F6]">
          {/* Header block */}
          <div className="border-b border-[#1F242D] pb-6 space-y-2">
            <h1 className="font-syne font-bold text-3xl text-[#F3F4F6]">
              Harikrishna Pokhrel
            </h1>
            <div className="font-mono text-xs text-[#38BDF8] tracking-wider uppercase">
              Artificial Intelligence Student & Systems Builder
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#9CA3AF] pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#4B5563]" />
                Kathmandu, Nepal
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#4B5563]" />
                hpokhrel794@gmail.com
              </span>
              <span>github.com/hpokhrel</span>
              <span>linkedin.com/in/harikrishna-pokhrel</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8] flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>
            <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-syne font-semibold text-base text-[#F3F4F6]">
                  BSc (Hons) Artificial Intelligence
                </div>
                <div className="font-mono text-xs text-[#9CA3AF]">
                  2024 — Present
                </div>
              </div>
              <div className="text-xs text-[#38BDF8] font-mono">
                Coventry University (delivered via Softwarica College of IT & E-Commerce), Kathmandu
              </div>
              <p className="text-xs text-[#9CA3AF] pt-2 leading-relaxed">
                Core coursework in Deep Learning, Vector Search & Embeddings, Linear Algebra & Multivariable Calculus, Natural Language Processing, and Distributed Cloud Computing.
              </p>
            </div>
          </div>

          {/* Key Leadership & Experience */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8] flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCE & COMMUNITY</span>
            </div>
            <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-syne font-semibold text-base text-[#F3F4F6]">
                  Founding Member & Technical Lead
                </div>
                <div className="font-mono text-xs text-[#9CA3AF]">
                  AWS Cloud Club (Kathmandu)
                </div>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Co-founded the AWS student chapter at Softwarica. Spearheaded technical labs on serverless architectures, cloud deployments, and integrating containerized ML inference on AWS infrastructure.
              </p>
            </div>
          </div>

          {/* Core Projects */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8] flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>PROJECTS & SYSTEMS CRAFTSMANSHIP</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-syne font-semibold text-sm text-[#F3F4F6]">
                    Khula Gyan — Grounded Curriculum RAG
                  </div>
                  <span className="font-mono text-[10px] text-[#00E5FF]">
                    Python · FastAPI · Vectors
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Open educational retrieval system binding synthesis to verified textbook pages and rejecting hallucinated content.
                </p>
              </div>

              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-syne font-semibold text-sm text-[#F3F4F6]">
                    SafeAgent Runtime — Human-in-the-Loop Gates
                  </div>
                  <span className="font-mono text-[10px] text-[#38BDF8]">
                    TypeScript · Node.js · Zod
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Programmatic confirmation barriers for side-effect-causing tool invocations in autonomous agents.
                </p>
              </div>

              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-syne font-semibold text-sm text-[#F3F4F6]">
                    Micro-GPT — Transformer From Scratch
                  </div>
                  <span className="font-mono text-[10px] text-[#00E5FF]">
                    PyTorch · NumPy · Math
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Pure PyTorch implementation of causal self-attention, positional encodings, and BPE tokenization.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
              TECHNICAL COMPETENCIES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#9CA3AF]">
              <div className="p-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="text-[#F3F4F6] font-semibold mb-1">LANGUAGES</div>
                <div>Python, TypeScript, JavaScript, SQL, C++ (basics)</div>
              </div>
              <div className="p-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="text-[#F3F4F6] font-semibold mb-1">AI / ML</div>
                <div>PyTorch, RAG Pipelines, Vector Search, Torchaudio, ONNX</div>
              </div>
              <div className="p-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="text-[#F3F4F6] font-semibold mb-1">INFRA / TOOLS</div>
                <div>AWS, Docker, FastAPI, Git, Linux, React, Tailwind CSS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161B22] px-6 py-4 border-t border-[#1F242D] flex items-center justify-between shrink-0">
          <span className="font-mono text-[11px] text-[#4B5563]">
            HARIKRISHNA POKHREL · KATHMANDU, NEPAL
          </span>
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            [ CLOSE ]
          </button>
        </div>
      </div>
    </div>
  );
};
