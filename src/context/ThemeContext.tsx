'use client';

import React, { createContext, useContext, PropsWithChildren } from 'react';
import { useAuth } from './AuthContext';

type RoleColor = {
  primary: string; // メインのパステルカラー
  background: string; // ダッシュボードの背景色など
};

// ロールごとのパステルカラー定義
const ROLE_COLORS: Record<string, RoleColor> = {
  student: { primary: '#90CAF9', background: '#E3F2FD' },      // パステルブルー
  instructor: { primary: '#A5D6A7', background: '#E8F5E9' },  // パステルグリーン
  admin: { primary: '#FFF59D', background: '#FFFDE7' },        // パステルイエロー
  venue: { primary: '#CE93D8', background: '#F3E5F5' },        // パステルパープル
  default: { primary: '#BDBDBD', background: '#F5F5F5' }, // ロール未設定時
};

interface ThemeContextType {
  colors: RoleColor;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: ROLE_COLORS.default,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { role } = useAuth();

  // 現在のロールに基づいてカラーテーマを決定
  const currentColors = role ? ROLE_COLORS[role] || ROLE_COLORS.default : ROLE_COLORS.default;

  return (
    <ThemeContext.Provider value={{ colors: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};