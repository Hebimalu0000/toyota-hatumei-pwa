'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

// AchexのWebSocket URL。ユーザーの実際のIDに置き換えてください
const WS_URL = "wss://cloud.achex.ca/thatumei"; // ★ XXXXXXを実際のチャンネルIDに置き換える

const ChatComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const [inputMsg, setInputMsg] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  
  // ユーザーIDとしてdisplayNameを使用
  const userId = currentUser?.displayName || 'Guest';

  // YYYY/MM/DD HH:DD:MI:SS形式で日時を取得
  const getDateTime = useCallback(() => {
    const date = new Date();
    const toDoubleDigits = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = toDoubleDigits(date.getMonth() + 1);
    const day = toDoubleDigits(date.getDate());
    const hour = toDoubleDigits(date.getHours());
    const min = toDoubleDigits(date.getMinutes());
    const sec = toDoubleDigits(date.getSeconds());
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
  }, []);

  // チャットメッセージの追加
  const addChat = (id: string, msg: string) => {
    const messageLine = `${id} : ${msg}（${getDateTime()}）`;
    setChatMessages(prev => [messageLine, ...prev]);
  };
  
  // メッセージの自動スクロール
  useEffect(() => {
    if (chatBottomRef.current) {
      // 新しいメッセージが上に追加される形式なので、常に最上部を表示
      // ここでは特にスクロールは不要ですが、一番新しいメッセージに焦点を当てる場合に利用
    }
  }, [chatMessages]);

  // WebSocketの接続と切断のライフサイクル管理
  useEffect(() => {
    //if (userId === 'Guest') return; // ユーザー情報がない場合は接続しない

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('WS open');
      // 認証（auth, passwordは何でもOK） - サンプルに従い、ハードコードされた認証を使用
      ws.current?.send(JSON.stringify({"auth": "hoge", "password": "1234"}));
      
      // ログイン通知
      ws.current?.send(JSON.stringify({"to": "hoge", "id": userId, "message": 'Login'}));
      addChat('System', `You ID : ${userId} にてログインしました`);
    };

    ws.current.onmessage = (e) => {
      console.log('WS message received');
      try {
        const obj = JSON.parse(e.data);
        if(obj.auth === 'OK'){
          return; // 認証OKのメッセージは無視
        }
        // 受信したメッセージを表示
        addChat(obj.id, obj.message);
      } catch (error) {
        console.error('Failed to parse WS message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('WS closed');
      // 切断時の通知は、`onclosed`ではなくコンポーネントのクリーンアップで実施
    };
    
    ws.current.onerror = (error) => {
        console.error("WS Error:", error);
    };

    // クリーンアップ関数
    return () => {
      if (ws.current) {
        // ログアウト通知
        ws.current.send(JSON.stringify({"to": "hoge", "id": userId, "message": 'Logout'}));
        ws.current.close();
      }
    };
  }, [userId, getDateTime]); // 依存配列にuserIdを含める

  // メッセージ送信
  const sendChat = () => {
    if (!inputMsg || ws.current?.readyState !== WebSocket.OPEN) return;

    // 自分自身のチャットにも表示
    addChat(userId, inputMsg);

    // WSで送信
    ws.current.send(JSON.stringify({"to": "hoge", "id": userId, "message": inputMsg}));
    
    setInputMsg(''); // 入力欄をクリア
  };
  
  // Enterキーでの送信を許可
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  return (
    <div style={{ 
      border: 'solid 1px #E0E0E0', 
      borderRadius: '8px', 
      padding: '16px', 
      backgroundColor: '#FAFAFA' // 白基調に合わせた薄い背景
    }}>
      <div id="id" style={{ width: '100%', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        接続ID: {userId}
      </div>
      
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <input 
          id="msg" 
          type="text" 
          style={{ 
            flexGrow: 1, 
            padding: '10px', 
            border: 'solid 1px #BDBDBD', 
            borderRadius: '4px',
            marginRight: '8px'
          }} 
          value={inputMsg} 
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力..."
        /> 
        <button 
          id="send" 
          type="button" 
          onClick={sendChat} 
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#00B0FF', // パステルブルーに近いアクセントカラー
            color: '#FFFFFF', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          送信
        </button>
      </div>
      
      <div 
        id="chat" 
        style={{ 
          width: '100%', 
          height: '300px', 
          border: 'solid 1px #BDBDBD', 
          overflowY: 'auto', 
          padding: '10px', 
          backgroundColor: '#FFFFFF', 
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column-reverse' // 最新メッセージが上に来るようにする
        }}
        ref={chatBottomRef}
      >
        {chatMessages.map((msg, index) => (
          // indexをkeyとして使用（メッセージ永続化しないため安全）
          <p key={index} style={{ margin: '4px 0', borderBottom: '1px dotted #EEE', paddingBottom: '4px' }}>
            {msg}
          </p>
        ))}
        {chatMessages.length === 0 && (
            <p style={{ margin: 'auto', color: '#999' }}>チャットを開始できます。</p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;