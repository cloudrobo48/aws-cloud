---
layout: default
---
# MBA M1を使った環境構築
## ツール準備
### Homeblewのインストール
- https://brew.sh/にアクセス
- インストールのコマンドをコピーしてターミナルに貼り付けて実行
- /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- しばらく待つ
- インストール後の画面で「Next Step」と書かれた3行をターミナルに張り付けてそれぞれ実行
- 環境変数の設定みたい
- brew --versionと打ってバージョンが表示されればOK  
### Gitのインストール
- brewでインストール
- brew install git
- git --versionで「git version 2.39.5 (Apple Git-154)」と表示されるのは、初期インストールされているGitらしい
- ホームディレクトリ（~）をlsで確認し、[.zshrc]がなければtouch
- Finderで[command]+[shift]+[.]で非表示のファイルが表示される
- [.zshrc]ダブルクリックして「export PATH=/usr/local/bin/git:$PATH」を貼り付けて保存
- ターミナルで[source ~/.zshrc]と[git --version]でバージョンに「(Apple Git-154)」なくなってればＯＫ
- 
