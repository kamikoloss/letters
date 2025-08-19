# 前提

- これは Backpack Battle のような非同期対戦ゲームのプロジェクトである

## ディレクトリ構成

- `client/`
  - ゲームアプリのクライアント部分
  - ゲームエンジンはGodot Engine 4 を使用している
  - プログラミング言語は Godot Engine 専用言語の GDScript を使用している
- `server/`
  - 非同期対戦の処理を行うサーバー部分
  - 言語は TypeScript, フレームワークは Hono を使用している
  - Cloudflare Workers にデプロイされる
- `server-debug/`
  - サーバーの処理をデバッグするための疑似クライアント部分 (SPA)
  - プログラミング言語は TypeScript, フレームワークは使用していない

# 基本のルール

- Codex の回答, Notes, Summary には日本語を使用する
- コード内のコメント, Commit メッセージ, Pull Request のタイトルおよび説明文 には日本語を使用する
- 人間の作業箇所と区別するために Codex が作成した Commit メッセージ, Pull Request のタイトル には頭に 🤖 の絵文字をつける
  - (例) 🤖 誤字を修正した

# コードのルール

- 変更箇所にはコメントを記載する
  - `.tscn` ファイルは Godot Engine が扱うリソースファイルなのでコメントを記載しない
- リファクタを行う際は元コード部分のコメントをなるべく転記する
- インデントにはタブではなくスペース4つを使用する
- `.uid` ファイルは Godot Engine が自動で生成するファイルなので Codex では作成しない
- 三項演算子 (`true_expr if cond else false_expr`) は使用しない
- `get_meta()` や `set_meta()` などのメタデータを扱う関数は使用しない
