# LinGhost

AI を活用した多言語ストーリー生成 Web アプリケーション。Anthropic Claude API でストーリーを生成し、タイムラインで共有できる。

## Tech Stack

- **Framework**: Next.js 14.2 / React 18 / TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (@anthropic-ai/sdk)
- **Auth**: Firebase Authentication (Google ログイン)
- **DB**: Cloud Firestore
- **Streaming**: Server-Sent Events (SSE)

## Setup

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` をプロジェクトルートに作成し、以下の変数を設定する。

```env
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin SDK
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Firebase プロジェクトの準備

[Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成し、以下を有効化する。

- **Authentication** — Google プロバイダを有効化
- **Cloud Firestore** — データベースを作成

### 4. Firestore セキュリティルールのデプロイ

Firestore のセキュリティルールは `firestore.rules` で管理している。ルールを変更した場合は、以下のコマンドでデプロイする。

```bash
firebase deploy --only firestore:rules
```

> Firebase CLI が未インストールの場合は、先に `npm install -g firebase-tools` でインストールし、`firebase login` でログインする。

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできる。

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/     # ストーリー生成 API (SSE)
│   │   └── like/          # Like トグル API
│   ├── library/           # 自分のストーリー一覧・詳細
│   ├── timeline/          # 公開タイムライン・詳細
│   ├── layout.tsx
│   └── page.tsx           # ストーリー生成ページ
├── components/
├── contexts/              # AuthContext
└── lib/
    ├── claude.ts           # Claude API クライアント
    ├── prompts.ts          # プロンプトテンプレート
    ├── types.ts
    └── firebase/
        ├── admin.ts             # Firebase Admin SDK (サーバー専用)
        ├── client.ts            # Firebase Client SDK
        ├── firestore-server.ts  # サーバー側 Firestore 操作
        └── firestore-client.ts  # クライアント側 Firestore 読み取り
```

## Firestore Data Model

- `users/{uid}/stories/{YYYY-MM-DD}` — ユーザーごとのストーリー (日付が doc ID、1日1件制限)
- `users/{uid}/likes/{timelineStoryId}` — ユーザーの Like 状態
- `timeline/{storyId}` — 公開タイムライン (認証不要で読み取り可)

## Scripts

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint 実行 |
| `firebase deploy --only firestore:rules` | Firestore ルールのデプロイ |
