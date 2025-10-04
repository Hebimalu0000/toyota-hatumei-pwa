'use client';

import { useRouter } from 'next/navigation'; // ★ App RouterのuseRouterをインポート
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const AuthRedirector: React.FC = () => {
  const { currentUser, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 認証状態のロードが完了してから処理を実行
    if (!loading) {
      if (!currentUser) {
        // 未認証の場合はログインページへリダイレクト
        router.replace('/login'); 
        return;
      }

      // ロールに基づいて適切なダッシュボードにリダイレクト
      switch (role) {
        case 'student':
          router.replace('/dashboard/student');
          break;
        case 'instructor':
          router.replace('/dashboard/instructor');
          break;
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        case 'venue':
          router.replace('/dashboard/venue');
          break;
        default:
          // ロールが未設定などの場合
          console.error('Unknown role or role not set:', role);
          router.replace('/login'); 
          break;
      }
    }
  }, [loading, currentUser, role, router]);

  // ロード中はユーザーにフィードバックを表示
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        ポータルをロード中...
      </div>
    ); 
  }

  // 認証済みだがロールがまだ解決していない場合、またはリダイレクト待ち
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      認証情報を確認中です...
    </div>
  );
};

export default AuthRedirector;