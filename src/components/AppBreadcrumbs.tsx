import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  current?: boolean;
}

interface AppBreadcrumbsProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppBreadcrumbs({ currentView, onNavigate }: AppBreadcrumbsProps) {
  const viewConfig: Record<string, { label: string; parent?: string; icon?: React.ReactNode }> = {
    dashboard: { 
      label: 'Inicio', 
      icon: <Home className="h-4 w-4" /> 
    },
    profile: { 
      label: 'Mi Perfil', 
      parent: 'dashboard' 
    },
    progress: { 
      label: 'Mi Progreso', 
      parent: 'dashboard' 
    },
    reminders: { 
      label: 'Recordatorios', 
      parent: 'dashboard' 
    },
    nutrition: { 
      label: 'Nutrición', 
      parent: 'dashboard' 
    },
    exercise: { 
      label: 'Ejercicio', 
      parent: 'dashboard' 
    },
    achievements: { 
      label: 'Logros', 
      parent: 'dashboard' 
    },
    settings: { 
      label: 'Configuración', 
      parent: 'dashboard' 
    }
  };

  const buildBreadcrumbs = (view: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];
    const config = viewConfig[view];
    
    if (!config) return breadcrumbs;

    // Add parent breadcrumbs recursively
    if (config.parent) {
      breadcrumbs.push(...buildBreadcrumbs(config.parent));
    }

    // Add current view
    breadcrumbs.push({
      label: config.label,
      path: view,
      current: true
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(currentView);

  // Don't show breadcrumbs for auth or onboarding
  if (['auth', 'onboarding'].includes(currentView)) {
    return null;
  }

  // Don't show breadcrumbs if only one item (dashboard)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="px-4 py-2 bg-header border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="text-blue-primary">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      onClick={() => onNavigate(crumb.path)}
                      className="text-muted-foreground hover:text-blue-primary cursor-pointer transition-colors"
                    >
                      {index === 0 && viewConfig[crumb.path]?.icon && (
                        <span className="mr-1 inline-flex items-center">
                          {viewConfig[crumb.path].icon}
                        </span>
                      )}
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}