import React, { createContext, useContext, useState } from 'react';
import { User, UserRole, AgentStatus } from '../types';
import { CURRENT_USER } from '../mock/data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  maskSensitiveData: boolean;
  setMaskSensitiveData: (mask: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setAgentStatus: (status: AgentStatus) => void;
  hasPermission: (permission: string) => boolean;
  login: (employeeId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [maskSensitiveData, setMaskSensitiveData] = useState<boolean>(true);

  const setUserRole = (role: UserRole) => {
    if (!user) return;
    let permissions = ['READ_CUSTOMER', 'READ_ORDER', 'READ_TICKET', 'CREATE_TICKET'];
    if (role === 'SENIOR_SUPPORT_AGENT') {
      permissions = [...permissions, 'UPDATE_TICKET', 'ESCALATE_TICKET', 'READ_PAYMENT', 'REQUEST_REFUND', 'APPROVE_REFUND', 'READ_DELIVERY', 'REASSIGN_CAPTAIN', 'READ_AUDIT'];
    } else if (role === 'SUPPORT_ADMIN') {
      permissions = [...permissions, 'UPDATE_TICKET', 'ESCALATE_TICKET', 'READ_PAYMENT', 'REQUEST_REFUND', 'APPROVE_REFUND', 'MANAGE_SETTINGS', 'MANAGE_AGENTS', 'READ_AUDIT'];
    } else if (role === 'OPERATIONS_SUPPORT') {
      permissions = [...permissions, 'UPDATE_TICKET', 'READ_DELIVERY', 'REASSIGN_CAPTAIN', 'READ_STORE', 'READ_CATALOGUE'];
    } else if (role === 'FINANCE_SUPPORT') {
      permissions = [...permissions, 'READ_PAYMENT', 'REQUEST_REFUND', 'APPROVE_REFUND', 'READ_COD', 'READ_WALLET', 'READ_SETTLEMENT'];
    }
    setUser({ ...user, role, permissions });
  };

  const setAgentStatus = (status: AgentStatus) => {
    if (!user) return;
    setUser({ ...user, status });
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.role === 'SUPPORT_ADMIN') return true;
    return user.permissions.includes(permission);
  };

  const login = (_employeeId: string) => {
    setUser(CURRENT_USER);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        maskSensitiveData,
        setMaskSensitiveData,
        setUserRole,
        setAgentStatus,
        hasPermission,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
