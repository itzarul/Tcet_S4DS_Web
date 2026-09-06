import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinUsModal: React.FC<JoinUsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cohortYear: '2024',
    affiliation: '',
    researchFocus: 'Frontier AI & Large Models',
    githubOrOrcid: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [credentialId, setCredentialId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockId = `S4DS-${formData.cohortYear}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setCredentialId(mockId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#F2F2F0] border-2 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-black"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-black text-white mx-auto flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-black/70 font-bold block mb-1">
                  CREDENTIAL DISPATCHED
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight font-display">
                  WELCOME TO S4DS ALUMNI
                </h3>
              </div>

              {/* Digital Pass / Credential Badge */}
              <div className="p-4 bg-white border-2 border-black font-mono-tech text-left text-xs space-y-2 my-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between border-b border-black/15 pb-2">
                  <span className="text-black/60 font-semibold">MEMBER ID</span>
                  <span className="font-bold text-black">{credentialId}</span>
                </div>
                <div className="flex justify-between border-b border-black/15 pb-2">
                  <span className="text-black/60 font-semibold">NAME</span>
                  <span className="font-bold text-black">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-black/15 pb-2">
                  <span className="text-black/60 font-semibold">COHORT / CHAPTER</span>
                  <span className="font-bold text-black">CLASS OF {formData.cohortYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60 font-semibold">STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> VERIFIED ACTIVE
                  </span>
                </div>
              </div>

              <p className="text-xs text-black/80 font-mono-tech">
                Confirmation packet sent to <strong className="text-black">{formData.email}</strong>. Welcome to the global collective.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-black text-white border-2 border-black font-mono-tech font-bold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                RETURN TO NETWORK CONSOLE
              </button>
            </div>
          ) : (
            <div>
              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-black/70">
                <Shield className="w-4 h-4 text-black" />
                <span className="font-bold uppercase tracking-widest text-black">
                  ALUMNI NETWORK ADMISSION
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display mb-2">
                JOIN S4DS ALUMNI
              </h2>
              <p className="text-xs sm:text-sm text-black/75 mb-6 font-normal leading-relaxed">
                Connect with fellow researchers, access closed-door compute grants, collaborate across laboratories, and participate in international delegations.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5 font-mono-tech text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-black/70 font-bold mb-1">
                    Full Legal / Academic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Julian Vance"
                    className="w-full px-3 py-2 border-2 border-black bg-white focus:outline-none text-xs font-mono-tech shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-black/70 font-bold mb-1">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@lab.org or univ.edu"
                      className="w-full px-3 py-2 border-2 border-black bg-white focus:outline-none text-xs font-mono-tech shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-black/70 font-bold mb-1">
                      S4DS Cohort Year
                    </label>
                    <select
                      value={formData.cohortYear}
                      onChange={(e) => setFormData({ ...formData, cohortYear: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-black bg-white focus:outline-none text-xs font-mono-tech shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="2024">2024 (Current Fellow)</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="Founding">Founding Cohort (2014-2019)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-black/70 font-bold mb-1">
                      Current Institute / Company
                    </label>
                    <input
                      type="text"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      placeholder="e.g. Stanford AI / DeepMind"
                      className="w-full px-3 py-2 border-2 border-black bg-white focus:outline-none text-xs font-mono-tech shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-black/70 font-bold mb-1">
                      GitHub / ORCID / Scholar
                    </label>
                    <input
                      type="text"
                      value={formData.githubOrOrcid}
                      onChange={(e) => setFormData({ ...formData, githubOrOrcid: e.target.value })}
                      placeholder="e.g. github.com/username"
                      className="w-full px-3 py-2 border-2 border-black bg-white focus:outline-none text-xs font-mono-tech shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white border-2 border-black font-mono-tech font-bold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <span>SUBMIT CREDENTIAL APPLICATION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
