import React from 'react';

export function renderSafeContent(content: string) {
  if (!content) return null;

  // Split into structural blocks separated by blank lines
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-slate-300 leading-relaxed text-base">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Level 1 Heading
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight">
              {trimmed.replace('# ', '')}
            </h1>
          );
        }

        // Level 2 Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2 tracking-tight">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // Level 3 Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl font-semibold text-cyan-400 mt-6 mb-3">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-cyan-500 pl-4 py-2 italic bg-slate-900/60 text-slate-200 rounded-r-md my-4"
            >
              {trimmed.replace(/^>\s*/gm, '')}
            </blockquote>
          );
        }

        // Code Blocks
        if (trimmed.startsWith('```')) {
          const codeText = trimmed.replace(/```[a-z]*/g, '').trim();
          return (
            <pre
              key={idx}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl overflow-x-auto text-xs font-mono text-cyan-300 my-4"
            >
              <code>{codeText}</code>
            </pre>
          );
        }

        // Unordered Lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map((line) => line.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 text-slate-300 my-4">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-slate-300 leading-7">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}