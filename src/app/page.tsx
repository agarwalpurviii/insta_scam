import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, UserCheck, FileWarning, ShieldCheck, Heart, MessageCircle, Camera, UserPlus, AtSign } from "lucide-react";
import Link from "next/link";
import { HomeTestimonialCard } from '@/components/home-testimonial-card';
import { homeTestimonials } from '@/lib/testimonials';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-transparent overflow-x-hidden">
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <Heart className="absolute text-red-500/80 w-32 h-32 -top-16 -left-16 animate-float" />
            <MessageCircle className="absolute text-sky-400/80 w-24 h-24 -bottom-24 right-8 animate-float animation-delay-3000" />
            <Camera className="absolute text-purple-500/80 w-20 h-20 top-1/2 left-1/3 animate-float animation-delay-6000" />
            <UserPlus className="absolute text-green-500/80 w-28 h-28 -bottom-16 left-24 animate-float animation-delay-[4s]" />
            <AtSign className="absolute text-yellow-500/80 w-24 h-24 top-24 right-1/4 animate-float animation-delay-[8s]" />
            <Shield className="absolute text-primary/80 w-40 h-40 bottom-1/2 right-1/4 animate-float animation-delay-[10s]" />
        </div>

        <div className="container mx-auto text-center px-4 relative z-10">
          <div className="flex justify-center items-center gap-4 mb-6 animate-in fade-in zoom-in-50 duration-500">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 font-headline uppercase animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            Stop <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">Instagram Scams</span>
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            Community-driven protection against fraudulent Instagram sellers. Search, report, and help others avoid scams.
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <p className="italic">"Scammers copy, sellers create. Spot the difference."</p>
            <p className="italic font-semibold text-primary/90">"Be InstaSmart. Report scams. Stay safe."</p>
          </div>
          <div className="mt-8 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <form className="flex gap-2" action="/search">
              <div className="relative flex-grow">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="q"
                  placeholder="Search Instagram username or seller ID..."
                  className="flex-grow pl-10 !h-12"
                />
              </div>
              <Button type="submit" size="lg">
                Check Seller
              </Button>
            </form>
          </div>
           <div className="mt-8 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <Button size="lg" asChild>
              <Link href="/report">Report a Scam</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/directory">Browse Directory</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A simple, community-powered process to keep you safe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center animate-in fade-in-up duration-500 delay-100">
              <Card className="p-6 bg-card/50 w-full max-w-xs">
                <CardContent className="p-0">
                  <div className="flex justify-center items-center bg-secondary rounded-lg h-24 mb-6">
                    <UserCheck className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">1. Search</h3>
                  <p className="text-muted-foreground">Enter the Instagram username to check our database for scam reports and user testimonials.</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col items-center animate-in fade-in-up duration-500 delay-200">
              <Card className="p-6 bg-card/50 w-full max-w-xs">
                <CardContent className="p-0">
                   <div className="flex justify-center items-center bg-secondary rounded-lg h-24 mb-6">
                    <ShieldCheck className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">2. Verify</h3>
                  <p className="text-muted-foreground">Review detailed reports, evidence, and community feedback to verify a seller's legitimacy.</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col items-center animate-in fade-in-up duration-500 delay-300">
              <Card className="p-6 bg-card/50 w-full max-w-xs">
                <CardContent className="p-0">
                   <div className="flex justify-center items-center bg-secondary rounded-lg h-24 mb-6">
                    <FileWarning className="w-12 h-12 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">3. Report</h3>
                  <p className="text-muted-foreground">Submit your own experience with evidence to help expand our database and protect others.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24 bg-card/40">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Community Says</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Real stories from users who have been protected and empowered by InstaSafe.
                </p>
            </div>
             <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in-up duration-500 delay-200"
              >
                <CarouselContent>
                    {homeTestimonials.map((testimonial) => (
                        <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                             <div className="p-1 h-full">
                                <HomeTestimonialCard testimonial={testimonial} />
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="mt-20 max-w-3xl mx-auto bg-card rounded-lg p-8 text-center animate-in fade-in-up duration-500 delay-300">
                 <h3 className="text-2xl font-bold font-headline">Share Your Experience</h3>
                 <p className="mt-2 text-muted-foreground">Help others by sharing your story - whether you were protected or victimized.</p>
                 <div className="mt-6 flex justify-center gap-4">
                     <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">Share Success Story</Button>
                     <Button size="lg" variant="destructive" asChild>
                         <Link href="/report">Report Scam Experience</Link>
                     </Button>
                 </div>
            </div>
          </div>
      </section>

      <section className="w-full pb-20 md:pb-24">
        <div className="container mx-auto px-4">
            <div className="border-t border-border/40 pt-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-500">
                        <p className="text-4xl font-bold text-primary">2,347</p>
                        <p className="text-muted-foreground mt-1">Scams Reported</p>
                    </div>
                     <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
                        <p className="text-4xl font-bold text-primary">15,892</p>
                        <p className="text-muted-foreground mt-1">Users Protected</p>
                    </div>
                     <div className="animate-in fade-in slide-in-from-right-8 duration-500 delay-200">
                        <p className="text-4xl font-bold text-primary">$485K</p>
                        <p className="text-muted-foreground mt-1">Losses Prevented</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
