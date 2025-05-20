export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {currentYear} Akshat Vora. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
