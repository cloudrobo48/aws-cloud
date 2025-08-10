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
- ターミナルで[source ~/.zshrc]と[git --version]でバージョンに「(Apple Git-154)」の記載がなくなってればＯＫ

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
|git init|リモートリポジトリをCloneするんじゃなくて、現在のディレクトリをGitによってバージョン管理する登録作業|空のプロジェクトから始める際に必要|
|git pull origin main|Git上のリモートリポジトリをローカルリポジトリにマージする||
|git fetch origin<br>git reset --hard origin/main|Git上の最新のリモートリポジトリの状態確認（マージはしない）<br>ローカルリポジトリの状態を強制的にリモートリポジトリの状態にする||
|git add （ファイル名） または<br>git add .|Macの変更をステージング||
|git reset|Macの変更ステージングをキャンセル||
|git commit -m "変更内容の説明メッセージ"|Macの変更をコミット|コメントはとても大切！|
|git push origin main|Macのローカルリポジトリのコミットをリモートリポジトリへ送信（Push）||
|git status|変更を確認する|どのファイルが追加・変更・削除されたかがわかる|
|git branch --show-current|ローカルでどこのブランチに向いているのか確認||

### Lint導入@クライアント

- 最低限のチェックをクライアントで実施する仕組み

### Node+npmインストール　　→　ESLintとPretterとmarkdownlintのインストール

```
    brew install node                                  # macにNode.jsとnpmをインストール（npmもnodeに含まれている）
    npm init -y                                        # package.jsonをデフォルト値で一発作成（"yes"で全部スキップ）
    npm install --save-dev eslint-config-prettier.     # ESLint(Linter)とPrettier(整形ツール)を開発用依存に追加する(V9) ※
    npm install --save-dev markdownlint-cli2           # Markdown用のLintツールを追加(開発用依存) 細かいチェックするので導入やめる？
```

### ※ ESLint用のeslint.config.mjsを作成

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
          'no-console': 'warn',        -> offの方がいいね「Console」のソースがWarningになる（本番にはConsoleの記載なない方がよいから）
        },
      },
      prettier,
    ];
```

### lint,prettier実行時の除外path設定

- 以下のファイルへの整形処理が不要なので除外設定しておく
  - eslint.config.mjs

```
  {
    ignores: ["node_modules/**", "dist/**", ".env", ".vscode/**", ".DS_Store"],
  },
```

- .prettierignore

```
    node_modules/
    dist/
    coverage/
```

### ymlファイルのrunから呼ばれる短縮コマンドを登録

- Scriptの登録（短縮コマンドみたいな感じ ~\.github\workflows\xxx.ymlのrunから呼ばれる)
- package.jsonを更新（これは例だよ）

```
     "scripts": {
        "lint": "eslint . --ext .js,.jsx",
        "format": "prettier --write .",
        "format:check": "prettier --check .",
        "lint:md": "markdownlint-cli2 '**/*.md' '#node_modules' '#dist' '#coverage'"
        "check-all": "npm run lint && npm run format && npm run lint:md"
      },
```

### クライアント上でのチェック実行

- 以下のコマンドでフォーマット整形のチェックなど実行（format:checkはチェックのみ、:writeを指定すると修正してくれる）
- このコマンドはpackage.jsonに登録したscriptsに対応している、要は短縮コマンドね

```
    npm run lint
    npm run format:check    # writeの方はソースを書き換えてしまうので、チェックだけにするのがおすすめらしい
    npm run lint:md         # えらい丁寧に指摘してくるので今の所実行しないわ
```

### Pushの時にクライアントの方が古いかをチェック

- ci.ymlに記載
- 詳細なコードは一旦省略
  - 最新のリモートの状態を取得
  - ローカルブランチのコミットを取得
  - リモートブランチの最新コミットを取得
  - 比較してローカルが最新ならOK、ダメならexit 1

## Hook

- 上記ではPUSHで動くymlファイルにファイルの最新チェックしてたけど、本来はHookですべき
- リポジトリディレクトリの下に.git\hooks\pre-pushを作成
- ここでLint、Prettier、ローカル最新チェックする
- git push origin main のコマンド実行前にこの「pre-push」が動くので、チェック漏れない
- ※このpre-pushはGitの仕組みで自動で呼んでくれるんだよ。だからymlファイルやPackage.jsonにも記載ないんだよ
- なぜpushでチェックするのがよくないか？
  - PUSHは動いたら止まらない
  - エラーとかフォーマット編でもそのまんまでマージされてしまう
  - だからHookで実装する
- chmod +x .git/hooks/pre-push で権限付与
- Hookは動いているかわからないのでTerminalで表示できるようにEcho入れた

## .husky/

- 上でHookで実装すべき！と言っていたけどあっさり修正
- Hookだとクライアント環境に依存してしまうので、開発者が複数いるなら.husky/で実装すべき
- また、開発者複数いるなら環境をDockerにすべし！
- というわけで、.husky/は一時中断

## Docker

- dockerとcolimaをインストール

```
    brew install docker    # dockerはLinux上で動くので、まだ動けない（次にインストールするColimaがあると動ける）
    brew install colima    # colimaインストールすると、先にインストールしたDocker Engilneを自身が起動した仮想マシン（Linuxベース）で動く設定する

    mac os -> colima -> 仮想マシン（Linux） -> Docekr Engine -> まだ出てきてないけどこの上にコンテナが載る。なんなら複数のコンテナが載る
```

- colima始動（コマンドのなかでDockerも起動してれてる）

```
    colima start
```

- とりあえずDockerの出番はなし、先のステップでDocker活躍する予定なので油断しないように！

## .hsuky/の続き

### huskyのinstall(npmコマンドはNode.jsのコマンドだよ)

-

```
    npm install -D husky

    [-D] は --save-dev の略で「開発用依存」に追加するって意味やね
    package.json の devDependencies に記録される
```

### Git連携の初期化

- gitにhuskyを連携させる

```
    npx husky install

    .gitのしたに.huskyってフォルダできてるはず
```

### HookをHuskyで実装（Commit編）

- ファイルを作る＋実行可能にする＋Gitとの連携対象にする(普通に作るだけじゃダメなんよ)

```
    npx husky add .husky/pre-commit "npm run lint"
```

- これで、git commitコマンド打ったら、.husky/pre-commitが呼び出され、lintが動くはずだったんだけど、このコマンドは非推奨らしい

```
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"
    npm run lint
```

- これで上書き、というか.husky/_/pre-commit　と言うふうに「_」アンダースコアのフォルダあるから、ここから.huskyに対象ファイル移動

```
    chomod +x .husky/pre-commit
```

- さらにhooksでの実装は二重管理になってしまうから、.git/hooksに追加したファイルはリネームしとこう！
- git commit -m "aaa"で.husky/pre-commitが動いてる形跡ない！（Echo入れてるので動いたらわかる）
- .git/hooks/pre-commitのシンボリックリンクなし（ちょっと表現微妙かも）

```
    ls -l .git/hooks | grep pre-commit
    -rwxr-xr-x  1 (username))  staff  1649  6 25 00:48 pre-commit.sample
```

- シンボリックリンクができない場合は以下の手順

```
    ln -s ../../.husky/pre-commit .git/hooks/pre-commit
```

- ln -s A B は「Bという名前でAを参照できるようにする」っていうこと
  - リポジトリのディレクトリからコマンドを打つとして、Bから見て、Aがどこにいるかと言う指定をするから../../.huskyとなっている

## Brach作成

- 追加機能が出てきたらFeatureブランチを切ろう

```
    git checkout -b feature/setup-ci
    Switched to a new branch 'feature/setup-ci'

    git push origin feature/setup-ci

    To github.com:cloudrobo48/aws-cloud.git
     * [new branch]      feature/setup-ci -> feature/setup-ci
```

- Push時にGithub Actionsが動かない、、
- ymlファイルの定義が必要
  - FeatureブランチにPUSHした時もCIが動くように修正する
- 注意⭐️
  - いつもの癖で、git push origin mainと言うふうにmainにPushしたらだめです！！！！
  - ここからはFeatureのBranchにPUSH ⇨ PR ⇨ Mainにマージと言う流れ

```
(修正前イメージ)
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

(修正後イメージ)
on:
  push:
    branches:
      - main
      - feature/*
  pull_request:
    branches:
      - main
      - feature/*
```

## TEST

- リポジトリルート直下に「test」フォルダ作成
- Jtestインストール

```
    npm install --save-dev jest
```

```Package.json
  "scripts": {
    "test": "jest",
```

- Jestは「xx.test.js」みたいなのを自動で見つけて、テストしてくれるので、このテストを実行しなさいという明示的な指示は不要

- node.jsがES Moduleに対応していないエラー

```
    import { validateInputs } from "../assets/js/validateInputs.js";
```

- 上記の書き方だとNode.jsがCommon.jsと混同してしまうらしい
- 対応方法はrequire()を使うか、pacakge.jsonにtype moduleの記載追加してES Module使う宣言するの2択
- ES Module使う方法で修正

## ES Module 対応

```package.json
    "type": "commonjs",    修正前
    "type": "module",      修正後
```

- babelインストール
  - jtestがES Moduleを理解できるようにするのがbabel

```
    npm install --save-dev babel-jest @babel/core @babel/preset-env
```

- babel.config.jsの作成

```babel.config.js
    export default {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    };
```

## テストのカバレッジ

- 以下のコマンドでテストのカバレッジが出る

```
    npm run test -- --coverage
```

- ただし、このままでは存在するテストソースに対してのカバレッジであり、テストされていない部分は出てこない
-

```jest.config.js
    export default {
      collectCoverageFrom: [
        "assets/js/**/*.js",  // ← テストすべきソースコードの範囲を指定！
      ],
    };
```

- リポジトリディレクトリ直下にcoverageが生成される
  - 無駄なので無視設定入れよう

```.gitignore
    coverage/
```

## pre-push

- pre-pushのおさらい

```
    npx husky add .husky/pre-push
    cd .git/_/
    copy pre-push ../
    cd  .git
    chmod +x pre-push
```

## mainへの直接PUSHを防ぐ設定@Github

- setting - Branches - Add Branch rule set
- Target Branch
  - main
- Restrict deletions
- Require a pull request before merging
- Require status check to pass
  - ymlで記載しているjob名を指定する
- Block force pushes

## Slack

- AppStoreからSlack for Desktopインストール
- githubと連携

## CIまでのざっくりフロー

```
    クライアントでソース修正
    lintやformatで、クライアント側での最低限のチェック実施
    lintやformatで、クライアント側での最低限のチェック実施
    addでステージングへ
    statusで状況確認（自分の変更が含まれてる？）
    commit
    push　⭐️ここがCIのトリガー
```

## 新しいリポジトリ@Python

- Githubでリポジトリ作成
- CodeタブからSSHの情報メモ
- Gitディレクト移動
- git clone (sshの情報)
- mkdir src
- mkdir node-cd
- mkdir tests
- npm init -y

- 以下はバージョン指定しないでインストールしたから、そのあとインストールする手順
- この手順はスルーして良い
- ※ Python開発ならEslint, Prettierは原則不要（Python関係のツールを使う）
  - prettier -> Black
  - eslint -> Flake8

```
    npm install --save-dev eslint prettier
    npm install --save-dev eslint-config-prettier
    npm uninstall eslint prettier eslint-config-prettier
```

- バージョン指定のインストール（ただし、Pythonでは不要）
- npm install --save-dev eslint@8.56.0 prettier@2.8.8
- npm install --save-dev eslint-config-prettier@9.0.0

- Package.jsonに追加

```
"scripts": {
  "lint": "eslint src/",
  "format": "prettier --write src/",
}
```

- requirement-dev.txtを作成する

```
flake8==6.1.0
black==24.3.0
pytest==8.0.0
pytest-cov==4.1.0
isort==5.12.0
mypy==1.10.0
coverage==7.4.4
boto3==1.34.102
moto==5.0.12
```

- PIPでインストール
- pip3 install -r requirements-dev.txt
- .zshrcにPath通そう
  - export PATH=$HOME/Library/Python/3.9/bin:$PATH
- ターミナルで設定したPathを読み込む
  - source ~/.zshrc

- .gitignore追加して整備
- npx eslint --init
  - 質問に答えて設定する
- ※ESLintで「Flat config」という設定方式となる
  - eslint.config.mjsができた場合はFlat config形式

- pre-commitをインストール
- pip3 install pre-commit

- .pre-commit-config.yamlを作成して中身作成

```
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/flake8
    rev: 6.1.0
    hooks:
      - id: flake8

  - repo: https://github.com/PyCQA/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy
```

- pre-commit installで、.git/hooks/pre-commitに登録
- .gitフォルダは通常見れないよ

- testsフォルダ作成

- テスト実行
  - PYTHONPATH=./ pytest --cov=src --cov-report=term-missing
  - pytest --cov=src --cov-report=term-missing

## 今後の予定

```
    ブランチ保護ルール → テスト導入前でもCIを効かせられる
    Slack通知 → PUSH失敗を見逃さない環境づくり
    ブランチ戦略 → 開発ルールを整備して PR運用へ
    テスト導入 → PR時の自動品質チェック化
    PR → CIとセットでレビュー体験
    デプロイ → CDとして完成に近づく
```

## CI/CD (CD　継続的デリバリー / デプロイ)

### つづく

## 🔹Safariのデバッグ

- Safariのメニューバー「Safari」 - 「環境設定」を選択﻿
- 「詳細」 - 「Webデベロッパ用の機能を表示」にチェック
- 「開発」 - 「Webインスペクタを表示」

-
