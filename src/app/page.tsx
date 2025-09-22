import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldAlert, FileText, ListChecks } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto text-center px-4">
          <ShieldAlert className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 font-headline">
            Stay Safe from Instagram Scams
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Our community-powered app helps you verify sellers, report fraud, and browse a directory of known scammers.
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <form className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Instagram Seller ID (e.g., @seller_name)"
                className="flex-grow"
              />
              <Button type="submit" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-2">Check a seller before you buy.</p>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FileText className="h-12 w-12 text-accent" />
              <h3 className="text-2xl font-bold mt-4 font-headline">Report Scammers</h3>
              <p className="mt-2 text-muted-foreground">
                Submit detailed reports with evidence to warn others and help us track fraudulent sellers.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/report">Submit a Report</Link>
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <ListChecks className="h-12 w-12 text-accent" />
              <h3 className="text-2xl font-bold mt-4 font-headline">Browse Directory</h3>
              <p className="mt-2 text-muted-foreground">
                Explore our growing directory of accounts that have been identified as scams by the community.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/directory">View Directory</Link>
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <Search className="h-12 w-12 text-accent" />
              <h3 className="text-2xl font-bold mt-4 font-headline">Verify Sellers</h3>
              <p className="mt-2 text-muted-foreground">
                Use our search to instantly check if a seller has been reported for scamming activities.
              </p>
                <Button variant="outline" className="mt-4 invisible">
                    Learn More
                </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
