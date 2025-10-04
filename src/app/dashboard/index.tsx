import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const DashboardRoot = () => {
  const currentUser = true ; // useAuth();
  const role = "student"; // useAuth();
  const loading = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 認証状態のロードが完了してから処理を実行
    if (!loading) {
      if (!currentUser) {
        // 未認証の場合はログインページへリダイレクト
        // ★ Logtoの認証フロー開始ページに設定してください
        router.replace('/login'); 
        return;
      }

      // ロールに基づいて適切なダッシュボードにリダイレクト
      switch (role) {
        case 'student':
          router.replace('/dashboard/student');
          break;
        /* case 'instructor':
          router.replace('/dashboard/instructor');
          break;
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        case 'venue':
          router.replace('/dashboard/venue');
          break; */
        default:
          // ロールが未設定などの場合
          console.error('Unknown role or role not set:', role);
          // エラーページまたはログインページにリダイレクト
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

  return null; // リダイレクトが完了するため何も表示しない
};

export default DashboardRoot;