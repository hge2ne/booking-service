const footerLinks = ['이용약관', '개인정보처리방침', '문의하기', '오시는 길']

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          NP Edu
        </span>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <a key={link} href="#" className="text-xs text-muted-foreground hover:text-primary">
              {link}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">© 2026 NP Academic Institute.</p>
      </div>
    </footer>
  )
}
