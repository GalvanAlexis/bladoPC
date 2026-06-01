import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-crimson max-w-none text-[#e8d5b0]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ ...props }) => <h1 className="text-cinzel text-3xl font-bold text-[#f5e6ce] mt-8 mb-4 border-b border-[#f5e6ce]/30 pb-2" {...props} />,
          h2: ({ ...props }) => <h2 className="text-cinzel text-2xl font-bold text-[#f5e6ce] mt-8 mb-4" {...props} />,
          h3: ({ ...props }) => <h3 className="text-cinzel text-xl font-bold text-[#f5e6ce] mt-6 mb-3" {...props} />,
          p: ({ ...props }) => <p className="text-crimson text-[17px] leading-relaxed mb-4" {...props} />,
          ul: ({ ...props }) => <ul className="text-crimson list-disc list-inside mb-4" {...props} />,
          ol: ({ ...props }) => <ol className="text-crimson list-decimal list-inside mb-4" {...props} />,
          li: ({ ...props }) => <li className="mb-2" {...props} />,
          a: ({ ...props }) => <a className="text-[#3b82f6] hover:text-[#60a5fa] underline decoration-[#3b82f6]/50" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-[#8b7355] pl-4 italic text-[#d4c3a3] my-4 bg-[#8b7355]/10 py-2 pr-4 rounded-r" {...props} />
          ),
          code: ({ inline, className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <code className={`${className} text-sm font-mono block p-4 bg-[#1a1a2e] rounded-md overflow-x-auto my-4 shadow-inner`} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-[#1a1a2e] text-[#f5e6ce] px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => <pre className="bg-transparent p-0 m-0" {...props} />,
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse" {...props} />
            </div>
          ),
          th: ({ ...props }) => <th className="border-b-2 border-[#8b7355] p-3 text-[#f5e6ce] font-cinzel bg-[#1f120a]" {...props} />,
          td: ({ ...props }) => <td className="border-b border-[#8b7355]/30 p-3 text-crimson" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
