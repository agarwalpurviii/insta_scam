import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

type MiniProfileCardProps = {
  className?: string;
  username: string;
  followers: string;
  following: string;
  isScam?: boolean;
};

export function MiniProfileCard({ className, username, followers, following, isScam = false }: MiniProfileCardProps) {
  const initial = username.charAt(1).toUpperCase();

  return (
    <div className={cn(
        "bg-card/80 border border-border/50 backdrop-blur-sm rounded-lg p-4 w-64 shadow-lg text-left transform-gpu",
        className
    )}>
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary text-lg">{initial}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <h4 className="font-bold text-sm text-foreground truncate">{username}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <div><span className="font-bold text-foreground">{followers}</span> followers</div>
                    <div><span className="font-bold text-foreground">{following}</span> following</div>
                </div>
            </div>
        </div>
        {isScam && (
            <Badge variant="destructive" className="mt-3 w-full justify-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Verified Scam
            </Badge>
        )}
    </div>
  );
}
