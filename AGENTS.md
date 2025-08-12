# 前提

- これは Godot Engine 4 を使用したゲームのプロジェクトである
- コードは Godot Engine 専用言語の GDScript によって記述されている

# 基本のルール

- Codex の回答, Notes, Summary には日本語を使用する
- コード内のコメント, Commit メッセージ, Pull Request のタイトルおよび説明文 には日本語を使用する
- 人間の作業箇所と区別するために Codex が作成した Commit メッセージ, Pull Request のタイトル には頭に 🤖 の絵文字をつける
  - (例) 🤖 誤字を修正した

# コードのルール

- 変更箇所にはコメントを記載する
  - `.tscn` ファイルにはコメントを記載しない
- インデントにはタブではなくスペース4つを使用する
- `.uid` ファイルは Godot Engine が自動で生成するファイルなので Codex では作成しない
- 三項演算子 (`true_expr if cond else false_expr`) は使用しない
- `get_meta()` や `set_meta()` などのメタデータを扱う関数は使用しない
