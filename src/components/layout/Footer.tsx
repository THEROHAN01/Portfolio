export function Footer() {
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/everythingoholic" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rohansalunkhe" },
    { label: "Twitter", href: "https://twitter.com/everythingoholic" },
    { label: "Email", href: "mailto:rohan@example.com" },
  ];

  return (
    <footer id="contact" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Let&apos;s build something.
            </h3>
            <p className="text-text-muted text-sm">
              Open to collaborations, conversations, and interesting problems.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted font-mono">
          <p>&copy; {new Date().getFullYear()} Rohan Salunkhe</p>
          <p>Built with Next.js &middot; Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
