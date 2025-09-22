import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, AlertTriangle, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background">
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Shield className="h-12 w-12 text-primary" />
            <AlertTriangle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 font-headline uppercase">
            Stop <span className="text-primary">Instagram Scams</span>
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Community-driven protection against fraudulent Instagram sellers. Search, report, and help others avoid scams.
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <form className="flex gap-2">
              <div className="relative flex-grow">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search Instagram username or seller ID..."
                  className="flex-grow pl-10"
                />
              </div>
              <Button type="submit" size="lg">
                Check Seller
              </Button>
            </form>
          </div>
           <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/report">Report a Scam</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/directory">Browse Directory</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-24">
        <div className="container mx-auto px-4">
            <div className="border-t border-border/40 pt-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    <div>
                        <p className="text-4xl font-bold text-primary">2,347</p>
                        <p className="text-muted-foreground mt-1">Scams Reported</p>
                    </div>
                     <div>
                        <p className="text-4xl font-bold text-primary">15,892</p>
                        <p className="text-muted-foreground mt-1">Users Protected</p>
                    </div>
                     <div>
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
