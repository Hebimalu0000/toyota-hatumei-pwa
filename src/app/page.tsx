import AuthRedirector from '@/components/AuthRedirector';

// App Routerのルートページはデフォルトでサーバーコンポーネントです
export default function HomePage() {
  return (
    // クライアントコンポーネントを呼び出し、認証とルーティング処理を任せます
    <AuthRedirector />
  );
}