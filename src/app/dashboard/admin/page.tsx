import DashboardLayout from '@/components/DashboardLayout';

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <h2>管理者ダッシュボード</h2>
      
      <section>
        <h3>👤 会員アカウント管理</h3>
        {/* 会員アカウントの検索、承認、編集などへのリンク */}
        <p>[リンク] 会員アカウント一覧へ</p>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>📢 アナウンス</h3>
        {/* 生徒・指導員向けのアナウンス作成・編集機能へのリンク */}
        <p>[リンク] 新規アナウンスを作成</p>
      </section>
    </DashboardLayout>
  );
}