import Link from "next/link";
import { Shield, Search, FileText, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight font-headline">ScamGuard</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" asChild>
            <Link href="/search" className="flex items-center gap-2">
                <Search className="h-4 w-4" /> Search
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/report" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Report
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/directory" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Directory
            </Link>
          </Button>
        </nav>
        <Button asChild variant="destructive">
            <Link href="/report">Report Scam</Link>
        </Button>
      </div>
    </header>
  );
}
