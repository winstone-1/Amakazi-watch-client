import { useStore } from '../store/store';

export const useAuth = () => {
  const { user, token, role, is2faVerified, setAuth, clearAuth, set2faVerified } = useStore();

  const isAuthenticated = !!token && is2faVerified;
  const hasRole = (allowedRoles) => {
    if (!allowedRoles) return true;
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return rolesArray.includes(role);
  };

  return {
    user,
    token,
    role,
    is2faVerified,
    isAuthenticated,
    hasRole,
    login: setAuth,
    logout: clearAuth,
    set2faVerified,
  };
};
export default useAuth;
