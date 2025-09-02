---
layout: default
---

# Github PagesへのCI/CDパイプライン

[← 前のページに戻る](/index.html)

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
- 将来的なチーム開発を想定し、レビュー者・責任者の役割も図に反映予定

---

> CI/CDの基本設計から自動化までを一貫して構築し、実運用に近い形での公開までを実現しました。
