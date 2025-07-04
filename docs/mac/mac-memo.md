---
layout: default
---

# ✅MBA環境構築

[← 前のページに戻る](/index.html)

## 🔹Homeblew

- https://brew.sh/にアクセス
- インストールのコマンドをコピーしてターミナルに貼り付けて実行

```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- しばらく待つ
- インストール後の画面で「Next Step」と書かれた3行をターミナルに張り付けてそれぞれ実行
- 環境変数の設定みたい
- 以下のコマンドでバージョンが表示されればOK

```
    brew --version
```

## 🔹VSCodeの拡張機能インストール

- 左側のサイドバーにある四角のテトリスクリック
- 検索ボックスに入力してインストール

```
    Lint系
        ESLint
        Prettier
        npm Inttellisense

    Iac系
        HashiCorp
        AWS Toolkit
        YAML
```

### Gitのadd対象の除外

- .gitignoreを作成して以下の編集

```
    node_modules/
    dist/
    .env
    .vscode/
    .DS_Store
```

## 🔹Gitインストールと設定

### brewでインストール

```
    brew install git
```

- 以下コマンドで「git version 2.39.5 (Apple Git-154)」と表示されるのは、初期インストールされているGitらしい

```
    git --version
```

- ホームディレクトリ（~）をlsで確認し、[.zshrc]がなければtouch
- Finderで[command]+[shift]+[.]で非表示のファイルが表示される
- [.zshrc]ダブルクリックして「export PATH=/usr/local/bin/git:$PATH」を貼り付けて保存
- ターミナルで[source ~/.zshrc]と[git --version]でバージョンに「(Apple Git-154)」なくなってればＯＫ

### GitHubの情報登録

```
   git config --global user.name "(githubのユーザー名)"
   git config --global user.email "(githubに登録したメールアドレス)"
```

### GitHub接続のSSHキー作成

```
    ssh-keygen -t ed25519 -C "GitHubに登録しているメールアドレス"
    -fで、SSHキーにファイル名をつけれる
```

### SSHエージェントを起動して鍵を追加する

```
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
```

### 作成したSSHキーの表示

```
    cat id_ed25519.pub
```

### Github Pageに作成したSSHキーを登録する

- Github pageの右上のプロフィールアイコンをクリックして「Setting」を選択
- SSH and GPG keysを選択
- New SSH Key
- key typeはAuthentication key
- keyの部分に作成したSSHキーを貼り付ける

### GitHub接続テスト

```
    ssh -T git@github.com
```

## CI/CD (CI　継続的インテグレーション)

- Gitコマンドは、ローカルのGitホームディレクトリから実施
- ~/Git　を作成した

|command| 説明 | 備考 |
|git clone xx|Git上のリモートリポジトリをクライアントのローカルリポジトリに作成|Github page - code - 緑のCodeボタンクリック - SSHタブに表示される情報を指定|

### Github → Macへクローン

- Git上のリモートリポジトリをクライアントのローカルリポジトリに作成

```
    ~/Gitを作成して移動した
    git clone (Github page - code - 緑のCodeボタンクリック - SSHのタブに表示される情報)
```

### Git -> Macへの展開

- Git上のリモートリポジトリをローカルリポジトリにマージする

```
   cd (GitHubのリポジトリ)
   git pull origin main
```

### Git -> Macへの強制同期（ローカルの変更は破棄される）

- Git上の最新のリモートリポジトリの状態確認（マージはしない）
- ローカルリポジトリの状態を強制的にリモートリポジトリの状態にする

```
    git fetch origin
    git reset --hard origin/main
```

### Macの変更をステージング

```
    git add （ファイル名） または
    git add .
```

### Macの変更ステージングをキャンセル

```
    git reset
```

### Macの変更をコミット

```
    git commit -m "変更内容の説明メッセージ"
```

### Macのローカルリポジトリのコミットをリモートリポジトリへ送信（Push）

```
    git push origin main
```

### その他のGitコマンド

|command|description|memo|
|git status|変更を確認する|どのファイルが追加・変更・削除されたかがわかる|

### Lint導入

- 最低限のチェックをクライアントで実施する仕組み

### Node+npmインストール　　→　ESLintとPretterとmarkdownlintのインストール

```
    brew install node                                  # macにNode.jsとnpmをインストール（npmもnodeに含まれている）
    npm init -y                                        # package.jsonをデフォルト値で一発作成（"yes"で全部スキップ）
    npm install --save-dev eslint @eslint/js prettier  # ESLint(Linter)とPrettier(整形ツール)を開発用依存に追加する(V9) ※
    npm install --save-dev markdownlint-cli2           # Markdown用のLintツールを追加(開発用依存)
```

### ※ ESLint用のeslint.config.jsを作成

```
    import js from '@eslint/js';
    import prettier from 'eslint-config-prettier';

    export default [
      {
        ignores: ['node_modules/**', 'dist/**'],
      },
      js.configs.recommended,
      {
        files: ['assets/js/**/*.js'], // ← ブラウザ用JSの場所を指定
        languageOptions: {
          globals: {
            document: true,
            console: true,
            fetch: true,
            setTimeout: true,
          },
        },
        rules: {
          'no-console': 'warn',
        },
      },
      prettier,
    ];

    それと、以下実行デリネーム(pacakge.jsonで競合しちゃってるので)
    mv eslint.config.js eslint.config.mjs
    このあと
    npm install --save-dev eslint-config-prettier

```

### 除外path設定

- 以下のファイルへの整形処理が不要なので除外設定しておく
  - .estintignore
  - .prettierignore
  - .markdownlint-cli2.jsonc

```
    .estintignore, .prettierignore
        node_modules/
        dist/
        coverage/

    .markdownlint-cli2.jsonc
        "globs": [
            "**/*.md",            // 対象ファイル
            "!node_modules",       // 除外
            "!dist",
            "!docs/generated",
            "!CHANGELOG.md"
            }
```

### ymlファイルのrunから呼ばれるコマンドを登録

- Scriptの登録（短縮コマンドみたいな感じ ~\.github\workflows\xxx.ymlのrunから呼ばれる)
- package.jsonを更新

```
     "scripts": {
        "lint": "eslint . --ext .js,.jsx",
        "format": "prettier --write .",
        "lint:md": "markdownlint-cli2 '**/*.md' '#node_modules' '#dist' '#coverage'"
        "check-all": "npm run lint && npm run format && npm run lint:md"
      },
```

- 以下のコマンドでフォーマット整形してくれるので、早めに実行しとく

```
    npm run lint
    npm run format
    npm run lint:md
```

## CIまでのざっくりフロー

```
    クライアントでソース修正
    lintやformatで、クライアント側での最低限のチェック実施
    addでステージングへ
    statusで状況確認（自分の変更が含まれてる？）
    commit
    push　⭐️ここがCIのトリガー
```

## CI/CD (CD　継続的デリバリー / デプロイ)

### つづく

## 🔹Safariのデバッグ

- Safariのメニューバー「Safari」 - 「環境設定」を選択﻿
- 「詳細」 - 「Webデベロッパ用の機能を表示」にチェック
- 「開発」 - 「Webインスペクタを表示」

-
