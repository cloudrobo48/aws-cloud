---
layout: default
---

# TerraformによるCI/CDパイプライン

[← 前のページに戻る](/docs/aws-hands-on.html)

## CI/CDパイプライン構成図

![CI/CDフロー]({{ site.baseurl }}/images/CICD-Terraform_SPA.jpg)

## CI/CDパイプライン概要説明（Terraform構成）

この構成では、GitHub Actionsを用いたCI/CDパイプラインを構築し、Terraformによるインフラ構成を自動的に検証・反映する仕組みを実装しています。  
個人開発環境での構築ですが、チーム開発を想定した設計と品質管理を意識しています。

### 主な構成要素

- **CI（継続的インテグレーション）**
  - Pull Request作成時にGitHub Actionsが起動
  - `terraform init` による初期化（Workspaceとstateの設定）
  - `terraform fmt -check -recursive` によるコード整形チェック
  - `terraform validate` による構文検証
  - `tflint` による静的解析
  - `terraform plan` による差分確認
  - `plan.txt` をPull Requestコメントに投稿し、レビュー担当者が差分を確認可能

- **CD（継続的デリバリー）**
  - Pull Requestを `main` ブランチにマージすると、GitHub Actionsが再度起動
  - `terraform apply -auto-approve` により構成を反映
  - Slack通知により、Apply結果をリアルタイムで共有

### フロー概要（図に基づく）

1. 開発者が `git add` → `git commit` → `git push` を実行し、Pull Requestを作成
2. GitHub上でPull Requestイベントが発生し、CI処理が開始
3. `.github/workflows/*.yml` に定義されたGitHub Actionsが起動し、Terraformの検証・Planを実行
4. Plan結果をPRコメントに投稿し、レビュー担当者が差分を確認
5. Pull Requestが `main` にマージされると、Apply処理が自動実行され、構成が反映される
6. Slack通知により、CI/CDの結果が開発者に共有される

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
