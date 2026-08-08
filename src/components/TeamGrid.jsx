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
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          All Members ({allMembers.length})
        </button>
        <button
          onClick={() => setFilter('core')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
            filter === 'core'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Core Team ({coreMembers.length})
        </button>
        <button
          onClick={() => setFilter('junior')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
            filter === 'junior'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
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
