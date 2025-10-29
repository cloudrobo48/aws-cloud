---
layout: default
---

# TerraformによるCI/CDパイプライン

[← 前のページに戻る](/docs/aws-hands-on.html)

## CI/CDパイプライン構成図

![CI/CDフロー]({{ site.baseurl }}/images/CICD-Terraform_SPA.jpg)

## CI/CDパイプライン概要説明（Terraform構成）

本構成では、GitHub Actionsを用いたCI/CDパイプラインを構築し、Terraformによるインフラ構成を自動的に検証・デプロイする仕組みを実装しています。  
個人開発環境での構築ですが、チーム開発を想定した設計と品質管理を意識しています。

### 主な構成要素

- **CI（継続的インテグレーション）**
  - `terraform fmt` によるコード整形チェック
  - `terraform validate` による構文検証
  - `tflint` による静的解析
  - `terraform plan` による差分確認（PRコメントに投稿）
  - GitHub Actionsによる自動検証処理

- **CD（継続的デリバリー）**
  - `main`ブランチへのマージイベントをトリガーに、GitHub Actionsで `terraform apply` を自動実行
  - デプロイにはGitHub Secretsを利用し、AWS認証情報を安全に管理

### フロー概要

1. 開発者が `git commit` を実行すると、Terraformコードの整形・検証・静的解析がCIで実行される
2. `git push` により GitHub 上で Pull Request が作成され、CI処理が開始
3. `terraform plan` の結果をPRコメントに投稿し、レビュー担当者が差分を確認可能
4. PRを `main` ブランチにマージすると、再度 GitHub Actions が起動し、 `terraform apply` による構成反映が実行される
5. デプロイ結果は Slack 通知によりリアルタイムで共有される

### 環境分離の仕組み

- Terraform Workspaceを使用して `dev` / `prod` 環境を分離
- `tfvars` ファイルと `tfstate` の `key` を環境ごとに切り替え
- 現在はPRベースで自動判定しているが、今後はラベル選択式に改善予定
- Applyは `main` ブランチへのマージ後に自動実行されるが、今後は `workflow_dispatch` による選択式に移行予定

### 補足

- 現在は個人開発環境のため、すべての操作は自身が担当
- 将来的なチーム開発を想定し、レビュー者・責任者の役割も図に反映予定
- Secrets管理には GitHub の `Actions secrets` を使用し、AWSアクセスキー等の機密情報を安全に保持

### Slack通知による運用補助（カスタム通知）

GitHub Actionsのワークフロー内にSlack通知ステップを組み込み、CI/CDの実行結果をリアルタイムで受け取れるように設計しています。  
SlackのIncoming Webhookを利用し、GitHub SecretsにWebhook URLを安全に登録。Plan結果やApply成功時など、任意のタイミングで通知を送信可能です。

Slack通知は、開発者がGitHub上のアクション結果を即座に把握できるようにすることで、フィードバックループの高速化と運用効率の向上を実現しています。  
将来的には、通知チャンネルの分離や、Slack Botによる承認フロー連携なども視野に入れています。

---

> GitHub Actionsを活用したCI/CDの設計から、Terraformによるインフラ構成の自動反映までを一貫して構築。  
> 実運用に近い形での品質管理と公開フローを実現しています。
