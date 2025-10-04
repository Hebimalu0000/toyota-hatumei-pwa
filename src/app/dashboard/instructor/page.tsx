import DashboardLayout from '@/components/DashboardLayout';

export default function InstructorDashboardPage() {
  return (
    <DashboardLayout role="instructor">
      <h2>指導員ダッシュボード</h2>
      
      <section>
        <h3>🗓️ 次回のシフト日時</h3>
        {/* Firestoreから指導員のシフト情報を取得し表示 */}
        <p>（次回のシフト）：2025年11月10日 (土) 14:00〜17:00</p>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>📣 担当クラスの状況</h3>
        {/* 担当クラスの全体状況（出欠、進捗概要など）を表示 */}
        <p>担当クラスA: 全員出席予定。特別な連絡事項はありません。</p>
      </section>
    </DashboardLayout>
  );
}