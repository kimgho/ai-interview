import LandingHeader from "@/components/landing/LandingHeader"
import LandingBanner from "@/components/landing/LandingBanner"
import LandingHero from "@/components/landing/LandingHero"
import LandingCard from "@/components/landing/LandingCard"
import LandingFooter from "@/components/landing/LandingFooter"
import LandingGuide from "@/components/landing/LandingGuide"

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