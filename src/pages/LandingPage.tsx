import LandingHeader from "@/widget/landing/LandingHeader"
import LandingBanner from "@/widget/landing/LandingBanner"
import LandingHero from "@/widget/landing/LandingHero"
import LandingCard from "@/widget/landing/LandingCard"
import LandingFooter from "@/widget/landing/LandingFooter"
import LandingGuide from "@/widget/landing/LandingGuide"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <LandingHeader />

            <main className="flex-1">
                <LandingBanner />
                <LandingHero />
                <LandingCard />
                <LandingGuide />
            </main>

            <LandingFooter />
        </div>
    )
}