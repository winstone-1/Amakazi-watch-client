// Role definitions and permissions
export const ROLES = {
  PUBLIC: 'public',
  SURVIVOR: 'survivor',
  COUNSELOR: 'counselor',
  ORG_STAFF: 'org_staff',
  COUNTY_OFFICIAL: 'county_official',
  ADMIN: 'admin',
};

export const PERMISSIONS = {
  // Report permissions
  VIEW_REPORTS: 'view_reports',
  CREATE_REPORT: 'create_report',
  EDIT_REPORT: 'edit_report',
  DELETE_REPORT: 'delete_report',
  MODERATE_REPORTS: 'moderate_reports',
  
  // Safety permissions
  USE_SAFETY_TOOLS: 'use_safety_tools',
  VIEW_VAULT: 'view_vault',
  UPLOAD_EVIDENCE: 'upload_evidence',
  
  // Peer support permissions
  USE_PEER_SUPPORT: 'use_peer_support',
  MANAGE_PEER_SESSIONS: 'manage_peer_sessions',
  
  // Organization permissions
  VIEW_ORGANISATIONS: 'view_organisations',
  REGISTER_ORGANISATION: 'register_organisation',
  VERIFY_ORGANISATION: 'verify_organisation',
  MANAGE_INVENTORY: 'manage_inventory',
  VIEW_CASE_MATCHING: 'view_case_matching',
  
  // Admin permissions
  VIEW_ADMIN_PANEL: 'view_admin_panel',
  MANAGE_USERS: 'manage_users',
  MANAGE_CONTENT: 'manage_content',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_SCORECARDS: 'view_scorecards',
};

// Role to permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.PUBLIC]: [
    PERMISSIONS.CREATE_REPORT,
    PERMISSIONS.VIEW_ORGANISATIONS,
  ],
  [ROLES.SURVIVOR]: [
    PERMISSIONS.CREATE_REPORT,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.USE_SAFETY_TOOLS,
    PERMISSIONS.VIEW_VAULT,
    PERMISSIONS.UPLOAD_EVIDENCE,
    PERMISSIONS.USE_PEER_SUPPORT,
    PERMISSIONS.VIEW_ORGANISATIONS,
  ],
  [ROLES.COUNSELOR]: [
    PERMISSIONS.USE_PEER_SUPPORT,
    PERMISSIONS.MANAGE_PEER_SESSIONS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ORGANISATIONS,
  ],
  [ROLES.ORG_STAFF]: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ORGANISATIONS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.VIEW_CASE_MATCHING,
    PERMISSIONS.REGISTER_ORGANISATION,
  ],
  [ROLES.COUNTY_OFFICIAL]: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ORGANISATIONS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_SCORECARDS,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_ADMIN_PANEL,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VERIFY_ORGANISATION,
    PERMISSIONS.MODERATE_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_SCORECARDS,
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const canAccessRoute = (userRole, requiredRole) => {
  if (!userRole) return false;
  const roleHierarchy = {
    [ROLES.PUBLIC]: 0,
    [ROLES.SURVIVOR]: 1,
    [ROLES.COUNSELOR]: 2,
    [ROLES.ORG_STAFF]: 3,
    [ROLES.COUNTY_OFFICIAL]: 4,
    [ROLES.ADMIN]: 5,
  };
  return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
};

export default {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  canAccessRoute,
};
