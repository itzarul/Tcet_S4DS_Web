import React, { useState } from 'react';
import TeamCard from './TeamCard';

export default function TeamGrid({ coreMembers, juniorMembers }) {
  const [filter, setFilter] = useState('all');

  const allMembers = [
    ...coreMembers,
    ...juniorMembers
  ];

  const filteredMembers = filter === 'all'
    ? allMembers
    : filter === 'core'
    ? coreMembers
    : juniorMembers;

  return (
    <div className="space-y-8 font-subheading">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2 text-xs font-subheading tracking-wider uppercase transition-all cursor-pointer border-2 ${
            filter === 'all'
              ? 'bg-blue-600 border-blue-300 text-white shadow-[3px_3px_0px_0px_#000]'
              : 'bg-[#0A132C] border-blue-600 text-sky-300 hover:bg-blue-900/80 hover:text-white shadow-[3px_3px_0px_0px_#1d4ed8]'
          }`}
        >
          All Members ({allMembers.length})
        </button>
        <button
          onClick={() => setFilter('core')}
          className={`px-5 py-2 text-xs font-subheading tracking-wider uppercase transition-all cursor-pointer border-2 ${
            filter === 'core'
              ? 'bg-blue-600 border-blue-300 text-white shadow-[3px_3px_0px_0px_#000]'
              : 'bg-[#0A132C] border-blue-600 text-sky-300 hover:bg-blue-900/80 hover:text-white shadow-[3px_3px_0px_0px_#1d4ed8]'
          }`}
        >
          Core Team ({coreMembers.length})
        </button>
        <button
          onClick={() => setFilter('junior')}
          className={`px-5 py-2 text-xs font-subheading tracking-wider uppercase transition-all cursor-pointer border-2 ${
            filter === 'junior'
              ? 'bg-blue-600 border-blue-300 text-white shadow-[3px_3px_0px_0px_#000]'
              : 'bg-[#0A132C] border-blue-600 text-sky-300 hover:bg-blue-900/80 hover:text-white shadow-[3px_3px_0px_0px_#1d4ed8]'
          }`}
        >
          Junior Core ({juniorMembers.length})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member, index) => (
          <TeamCard key={member.id} member={member} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
}
