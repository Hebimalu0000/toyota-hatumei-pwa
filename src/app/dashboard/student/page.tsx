import DashboardLayout from '@/components/DashboardLayout';
import ChatComponent from '@/components/ChatComponent'; // ★ ChatComponentをインポート

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student">
      <h2>生徒ダッシュボードへようこそ！ 🚀</h2>
      
      {/* その他の生徒向けコンテンツ */}

      <section style={{ marginTop: '30px' }}>
        <h3>💬 チャットルーム</h3>
        {/* チャット機能コンポーネントを配置 */}
        <ChatComponent />
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>🛠️ 今日の活動進捗</h3>
        <p>（プロジェクト名）：現在「設計・計画」フェーズです。</p>
      </section>
    </DashboardLayout>
  );
}