import DashboardLayout from '@/components/DashboardLayout';

export default function VenueDashboardPage() {
  return (
    // 会場は通常PWAとして全画面表示されるため、このレイアウトはシンプルに保つ
    <DashboardLayout role="venue">
      <h2>会場オペレーション</h2>
      
      <section>
        <h3>✅ 会員の出席登録</h3>
        {/* QRコード/バーコードリーダー連携または手動登録UIへのリンク */}
        <p>[ボタン] 出席登録画面を開く</p>
      </section>
      
      <section style={{ marginTop: '20px' }}>
        <h3>👨‍🏫 指導員表示（木札）</h3>
        {/* 現在の指導員リストを大きく表示するコンポーネント */}
        <p>[表示] 現在の指導員表示（木札スタイル）</p>
      </section>
    </DashboardLayout>
  );
}