'use client';

import React, { PropsWithChildren } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext'; 

// ★ 仮のナビゲーションアイコン。生徒向けに追加された9点ボタンをシミュレート
const NavIcon = () => (
    <button style={{ 
        background: 'none', border: 'none', cursor: 'pointer', padding: '8px', 
        borderRadius: '50%', color: '#333', fontSize: '24px' 
    }}>
        &#x22EE; {/* 縦三点リーダーまたは代替アイコン */}
    </button>
);

const DashboardLayout: React.FC<PropsWithChildren<{ role: string }>> = ({ children, role }) => {
  const { colors } = useTheme();
  const { currentUser } = useAuth();
  
  // Googleイメージに基づいたシンプルなヘッダー
  const Header = () => (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 24px', 
      height: '64px', 
      backgroundColor: '#FFFFFF', // 白基調
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // 控えめな影
      borderBottom: `4px solid ${colors.primary}`, // アクセントカラーを下に適用
    }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary }}>
        豊田少年少女発明クラブ ({role.toUpperCase()})
      </h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {role === 'student' && <NavIcon />} {/* 生徒にのみ機能一覧ボタンを表示 */}
        {/* ユーザーアバターやログアウトボタンをここに配置 */}
        <span style={{ marginLeft: '16px', fontSize: '14px', color: '#555' }}>
          {currentUser?.email || 'ユーザー名'}
        </span>
      </div>
    </header>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <Header />
      
      {/* メインコンテンツエリア */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
      
      {/* 必要であればフッターをここに配置 */}
    </div>
  );
};

export default DashboardLayout;