import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingBag, User, Menu, X, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlist, user, logout } = useStore();

  const handleProtectedNavigation = (path) => {
    if (!user) {
      toast.error("Please log in to access this feature");
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/collections', label: 'Collection' },
    { href: '/style-scan', label: 'AI Style Scan' },
    ...(user ? [{ href: '/saved-styles', label: 'Saved Styles' }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass shadow-subtle py-3' : 'bg-background/50 backdrop-blur-sm py-4'
      )}
    >
      <div className="container flex items-center justify-between">

        {/* Left Section: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-wide font-medium">
            <span className="text-3xl"></span>
            Heer Enterprise
          </Link>
        </div>

        {/* Center Section: Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-accent relative py-1 group",
                location.pathname === link.href ? "text-accent" : "text-foreground"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                location.pathname === link.href && "scale-x-100"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right Section: Icons */}
        <div className="flex items-center justify-end gap-1 flex-1">
          {/* Search */}
          <div className={cn(
            "flex items-center transition-all duration-300 overflow-hidden",
            isSearchOpen ? "w-48 sm:w-64 mr-2" : "w-10"
          )}>
            {isSearchOpen ? (
              <div className="relative w-full">
                <Input
                  ref={searchInputRef}
                  placeholder="Search..."
                  className="h-9 pr-8 bg-transparent border-b border-border border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50"
                  onBlur={() => !searchInputRef.current?.value && setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9 hover:bg-transparent text-muted-foreground"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:text-accent transition-colors"
            onClick={() => handleProtectedNavigation('/wishlist')}
          >
            <Heart className="h-5 w-5" />
            {user && wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-rose rounded-full animate-pulse" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:text-accent transition-colors"
            onClick={() => handleProtectedNavigation('/cart')}
          >
            <ShoppingBag className="h-5 w-5" />
            {user && cartCount() > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] font-medium rounded-full flex items-center justify-center text-primary-foreground">
                {cartCount()}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-accent transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved-styles">Saved Styles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="hover:text-accent transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-fade-in h-screen">
          <nav className="container py-8 flex flex-col gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-2xl font-display font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-12 h-px bg-border my-4" />

            <div className="flex gap-6">
              <button
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleProtectedNavigation('/wishlist');
                }}
              >
                <Heart className="h-6 w-6" />
                <span className="text-xs uppercase tracking-wide">Wishlist</span>
              </button>

              {user ? (
                <Link to="/profile" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-6 w-6" />
                  <span className="text-xs uppercase tracking-wide">Account</span>
                </Link>
              ) : (
                <Link to="/login" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-6 w-6" />
                  <span className="text-xs uppercase tracking-wide">Login</span>
                </Link>
              )}
              {user && (
                <Link to="/my-orders" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  <Package className="h-6 w-6" />
                  <span className="text-xs uppercase tracking-wide">Orders</span>
                </Link>
              )}
            </div>

            {user && (
              <Button variant="ghost" className="mt-4 text-destructive" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                Log out
              </Button>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}
