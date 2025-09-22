export function AppFooter() {
  return (
    <footer className="py-6 px-4 sm:px-6 md:px-8 mt-auto border-t border-border/40">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ScamWatch. All rights reserved.</p>
        <p className="text-sm mt-2">A community-driven initiative to fight online fraud.</p>
      </div>
    </footer>
  );
}
