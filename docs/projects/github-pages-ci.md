---
layout: default
---

# Github PagesへのCI/CDパイプライン

[← 前のページに戻る](/docs/projects/aws-hands-on.html)

## CI/CDパイプライン構成図

![CI/CDフロー]({{ site.baseurl }}/images/CICD-GithubPages.jpg)

## CI/CDパイプライン概要説明（GitHub Pages公開）

本研修では、GitHub Actionsを用いたCI/CDパイプラインを構築し、静的WebサイトをGitHub Pagesへ自動公開する仕組みを実装しました。  
個人開発環境での構築ですが、チーム開発を想定した設計を意識しています。

### 主な構成要素

- **CI（継続的インテグレーション）**
  - `eslint` によるコード品質チェック
  - `jest` によるユニットテスト（PR時に実行）
  - `Prettier` によるコード整形
  - `.husky` によるローカルフック（pre-commit / pre-push）

- **CD（継続的デリバリー）**
  - GitHub Actionsによる自動ビルド・デプロイ
  - GitHub Pagesへの公開処理

### フロー概要

1. 開発者が `commit` / `push` を実行
2. GitHub上でイベントが検知され、CI処理が開始
3. PR作成時にはレビューを想定したテスト実行
4. `main` ブランチへのマージで自動デプロイ
5. GitHub Pages上に最新の成果物が公開

### 補足

- 現在は個人開発環境のため、すべての操作は自身が担当
- 将来的なチーム開発も視野に入れ、レビューや責任分担を想定した設計を意識
- GitHub AppによるSlack通知を活用し、Issue・Pull Request・Releaseなどのイベントを即時共有できる構成とした
- CI/CDの進行状況や成果物の公開をリアルタイムで把握できるようにすることで、開発の透明性と反応速度を高める設計
- GitHub Actionsによるカスタム通知（例：CI失敗時のSlack通知）については、他CI/CDで実施

---

> CI/CDの基本設計から自動化までを一貫して構築し、実運用に近い形での公開までを実現しました。
