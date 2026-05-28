import SiteHeader from '@/client/components/SiteHeader'
import SiteFooter from '@/client/components/SiteFooter'
import ApplyForm from '@/client/components/ApplyForm'

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[880px] flex-1 px-5 py-10 sm:py-14">
        <ApplyForm />
      </main>
      <SiteFooter />
    </div>
  )
}
