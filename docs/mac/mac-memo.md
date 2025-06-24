---
layout: default
---
[← 前のページに戻る](/index.html)

# ✅MBA環境構築

## 🔹Homeblew

- https://brew.sh/にアクセス
- インストールのコマンドをコピーしてターミナルに貼り付けて実行
~~~
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
~~~
- しばらく待つ
- インストール後の画面で「Next Step」と書かれた3行をターミナルに張り付けてそれぞれ実行
- 環境変数の設定みたい
- 以下のコマンドでバージョンが表示されればOK
~~~
    brew --version
~~~
## 🔹Git

- brewでインストール
~~~~
    brew install git
~~~~
- 以下コマンドで「git version 2.39.5 (Apple Git-154)」と表示されるのは、初期インストールされているGitらしい
~~~~
    git --version
~~~~
- ホームディレクトリ（~）をlsで確認し、[.zshrc]がなければtouch
- Finderで[command]+[shift]+[.]で非表示のファイルが表示される
- [.zshrc]ダブルクリックして「export PATH=/usr/local/bin/git:$PATH」を貼り付けて保存
- ターミナルで[source ~/.zshrc]と[git --version]でバージョンに「(Apple Git-154)」なくなってればＯＫ
- GitHubの情報登録
~~~
   git config --global user.name "(githubのユーザー名)"
   git config --global user.email "(githubに登録したメールアドレス)"
~~~
- GitHub接続のSSHキー作成
~~~
    ssh-keygen -t ed25519 -C "GitHubに登録しているメールアドレス"
    -fで、SSHキーにファイル名をつけれる
~~~
- SSHエージェントを起動して鍵を追加する
~~~
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
~~~
- 作成したSSHキーの表示
~~~
    cat id_ed25519.pub
~~~
- Github Pageに作成したSSHキーを登録する
-- Github pageの右上のプロフィールアイコンをクリックして「Setting」を選択
-- SSH and GPG keysを選択
-- New SSH Key
-- key typeはAuthentication key
-- keyの部分に作成したSSHキーを貼り付ける
- GitHub接続テスト
~~~
    ssh -T git@github.com
~~~
- Githubに登録されているデータをクライアントにCloneさせる
~~~
    ~/Gitを作成して移動した
    
~~~


## 🔹Safariのデバッグ

- Safariのメニューバー「Safari」 - 「環境設定」を選択﻿
- 「詳細」 - 「Webデベロッパ用の機能を表示」にチェック
- 「開発」 - 「Webインスペクタを表示」

- 
