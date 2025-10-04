// src/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 役割とパスの対応マップ
const rolePathMap: { [key: string]: string } = {
  admin: '/admin',
  instructor: '/instructor',
  venue: '/venue',
};

// 制限が必要なパス
const protectedRoutes = ['/admin', '/instructor', '/venue', '/dashboard'];

export function middleware(request: NextRequest) {
  // 💡 ミドルウェアでは、セッション情報（JWTなど）を確認する必要があります。
  //    Firebaseのクライアント認証はサーバーサイド(ミドルウェア)では直接扱えないため、
  //    ここでは一旦、簡易的にログインページへのリダイレクトのみを制御します。

  const path = request.nextUrl.pathname;

  // 1. ログインページ、APIルート、静的ファイルは許可
  if (path.startsWith('/login') || path.startsWith('/_next') || path.startsWith('/api')) {
    return NextResponse.next();
  }

  // 2. 保護されたルートのチェック
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute) {
    // 💡 本来はここでFirebase Auth Tokenを検証し、認証状態を確認する
    //    （今回の簡易実装では、ユーザーはクライアント側で認証状態をチェックする前提）

    // 認証されていない場合はログインページへ
    // 実際にはクッキーからトークンを読み取る処理が入りますが、今回はスキップします。
    
    // クライアント側で認証チェックが行われるように処理を継続
    return NextResponse.next(); 
  }

  // 3. その他は許可
  return NextResponse.next();
}

// ミドルウェアの実行対象パスを定義
export const config = {
  matcher: [
    /*
     * 以下のパスを除く全ての受信リクエストにミドルウェアを適用
     * - /api (API ルート)
     * - /_next/static (静的ファイル)
     * - /_next/image (画像最適化ファイル)
     * - /favicon.ico (ファビコン)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};