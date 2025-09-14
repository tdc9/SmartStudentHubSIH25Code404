import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ userRole = 'student' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbItems = () => {
    const path = location?.pathname;
    const items = [];

    // Always start with Dashboard
    const dashboardPath = userRole === 'student' ? '/student-dashboard' : '/institution-dashboard';
    items?.push({
      label: 'Dashboard',
      path: dashboardPath,
      isActive: path === dashboardPath
    });

    // Add specific breadcrumb based on current path
    switch (path) {
      case '/achievement-tracker':
        items?.push({
          label: 'Achievement Tracker',
          path: '/achievement-tracker',
          isActive: true
        });
        break;
      case '/student-portfolio':
        items?.push({
          label: 'Student Portfolio',
          path: '/student-portfolio',
          isActive: true
        });
        break;
      case '/institution-dashboard':
        // Dashboard is already added, no need for additional items
        break;
      case '/student-management':
        items?.push({
          label: 'Student Management',
          path: '/student-management',
          isActive: true
        });
        break;
      case '/reports':
        items?.push({
          label: 'Reports',
          path: '/reports',
          isActive: true
        });
        break;
      case '/settings':
        items?.push({
          label: 'Settings',
          path: '/settings',
          isActive: true
        });
        break;
      case '/profile':
        items?.push({
          label: 'Profile',
          path: '/profile',
          isActive: true
        });
        break;
      default:
        // For unknown paths, just show the current page name
        if (path !== dashboardPath && path !== '/') {
          const pageName = path?.split('/')?.pop()?.replace(/-/g, ' ') || 'Page';
          items?.push({
            label: pageName?.charAt(0)?.toUpperCase() + pageName?.slice(1),
            path: path,
            isActive: true
          });
        }
    }

    return items;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't render breadcrumb if only one item (Dashboard) or on landing/login pages
  if (breadcrumbItems?.length <= 1 || location?.pathname === '/landing-page' || location?.pathname === '/login') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            {item?.isActive ? (
              <span className="text-foreground font-medium">
                {item?.label}
              </span>
            ) : (
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item?.path)}
                className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground transition-colors"
              >
                {item?.label}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;