---
layout: default
---

# LambdaへのCI/CDパイプライン

[← 前のページに戻る](/docs/aws-hands-on.html)

## CI/CDパイプライン構成図

![CI/CDフロー]({{ site.baseurl }}/images/CICD-Lambda1.jpg)

## CI/CDパイプライン概要説明（AWS Lambda公開）

本構成では、GitHub Actionsを用いたCI/CDパイプラインを構築し、Pythonで記述したAWS Lambda関数を自動的にデプロイする仕組みを実装しています。  
個人開発環境での構築ですが、チーム開発を想定した設計と品質管理を意識しています。

### 主な構成要素

- **CI（継続的インテグレーション）**
  - `black`, `flake8`, `isort`, `mypy` による静的解析とコード整形（pre-commit hook）
  - `pytest` によるユニットテスト（Push/Pull Request時に実行）
  - GitHub Actionsによる自動テスト実行

- **CD（継続的デリバリー）**
  - `main`ブランチへのPushイベントをトリガーに、GitHub ActionsでLambdaへ自動デプロイ
  - デプロイにはGitHub Secretsを利用し、AWS認証情報を安全に管理

### フロー概要

1. 開発者が `git commit` を実行すると、`pre-commit` フックが起動し、コード品質チェックを実施
2. `git push` により GitHub 上で Push イベントが発生し、CI処理が開始
3. Pull Request 作成時にも GitHub Actions によるテストが実行される
4. PRを `main` ブランチにマージすると、再度 Push イベントが発生し、Lambda への自動デプロイが実行される
5. デプロイは GitHub Actions のワークフロー内で AWS Lambda に対して行われる

### 補足

- 現在は個人開発環境のため、すべての操作は自身が担当
- 将来的なチーム開発を想定し、レビュー者・責任者の役割も図に反映予定
- Secrets管理には GitHub の `Actions secrets` を使用し、AWSアクセスキー等の機密情報を安全に保持

### Slack通知による運用補助（カスタム通知）

GitHub Actionsのワークフロー内にSlack通知ステップを組み込み、CI/CDの実行結果をリアルタイムで受け取れるように設計しています。  
SlackのIncoming Webhookを利用し、GitHub SecretsにWebhook URLを安全に登録。デプロイ成功時やCI失敗時など、任意のタイミングで通知を送信可能です。

Slack通知は、開発者がGitHub上のアクション結果を即座に把握できるようにすることで、フィードバックループの高速化と運用効率の向上を実現しています。  
将来的には、通知チャンネルの分離や、Slack Botによる承認フロー連携なども視野に入れています。

---

> GitHub Actionsを活用したCI/CDの設計から、AWS Lambdaへの自動デプロイまでを一貫して構築。  
> 実運用に近い形での品質管理と公開フローを実現しています。
