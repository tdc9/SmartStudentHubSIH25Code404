import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ useNavigate added
import Cookies from 'js-cookie'; // ✅ import Cookies
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = ({ onMenuToggle, isMenuOpen = false, userRole = 'student', studentName = 'Student' }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New achievement unlocked', time: '2 min ago', unread: true },
    { id: 2, title: 'Portfolio review completed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Institution approval pending', time: '3 hours ago', unread: false },
  ]);

  const location = useLocation();
  const navigate = useNavigate(); // ✅ now available

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleSignOut = () => {
      localStorage.removeItem("token");
      Cookies.remove("token");
      Cookies.remove("role");
      navigate("/");
  }

  const unreadCount = notifications?.filter((n) => n?.unread)?.length;

  const getPageTitle = () => {
    const path = location?.pathname;
    switch (path) {
      case '/student-dashboard':
        return 'Student Dashboard';
      case '/achievement-tracker':
        return 'Achievement Tracker';
      case '/student-portfolio':
        return 'Student Portfolio';
      case '/institution-dashboard':
        return 'Institution Dashboard';
      default:
        return 'Smart Student Hub';
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 bg-card border-b border-border z-30">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName={isMenuOpen ? 'X' : 'Menu'}
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Page Title */}
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            {getPageTitle()}
          </h1>
        </div>

        {/* Search, Notifications, Profile */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 pr-10"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2"
                  iconName="X"
                  iconSize={16}
                >
                  <span className="sr-only">Close search</span>
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                iconName="Search"
                iconSize={20}
              >
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden"
            iconName="Search"
            iconSize={20}
          >
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              iconSize={20}
              className="relative"
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary-foreground)" />
              </div>
              <span className="sr-only">Profile menu</span>
            </Button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-sm text-foreground">{studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {userRole === 'student' ? 'Student' : 'Administrator'}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Icon name="User" size={16} />
                      Profile
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Icon name="Settings" size={16} />
                      Settings
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Icon name="LogOut" size={16} />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="button" variant="ghost" onClick={() => setIsSearchOpen(false)}>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
