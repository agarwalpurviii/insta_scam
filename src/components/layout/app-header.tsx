import Link from "next/link";
import { ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline">ScamWatch</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/directory">Directory</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/report">Report a Scam</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
