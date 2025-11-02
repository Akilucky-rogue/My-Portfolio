import React from 'react'

const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => (
  // external links open in new tab by default
  <a className="text-[var(--color-primary)] hover:underline" {...props} target={props.target ?? '_blank'} rel={props.rel ?? 'noopener noreferrer'}>
    {children}
  </a>
)

const H1 = ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-semibold mt-6 mb-4">{children}</h1>
const H2 = ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-medium mt-6 mb-3">{children}</h2>
const H3 = ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>

const P = ({ children }: { children?: React.ReactNode }) => <p className="leading-relaxed mb-4">{children}</p>

const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => (
  <code className="bg-slate-800 text-[var(--color-primary)] px-1 rounded text-sm">{children}</code>
)

const Pre: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => (
  <pre className="my-4 overflow-auto rounded-md bg-[#071026] p-4 text-sm">{children}</pre>
)

const Ul = ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-6 mb-4">{children}</ul>
const Ol = ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>
const Li = ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>

const Img: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...props }) => (
  <img className="rounded-md my-4" alt={alt} {...props} />
)

const MDXComponents = {
  a: A,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  code: InlineCode,
  pre: Pre,
  ul: Ul,
  ol: Ol,
  li: Li,
  img: Img,
}

export default MDXComponents
