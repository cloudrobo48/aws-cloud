---
layout: default
---

# TerraformによるCI/CDパイプライン構築例

[← 前のページに戻る](/docs/aws-hands-on.html)

## 概要

このページでは、TerraformとGitHub Actionsを用いたCI/CDパイプラインの構築例を紹介します。  
個人開発環境での実装ですが、**チーム開発・現場運用を前提とした設計・再現性・通知設計**までを意識して構成しています。  
「この構成を導入すれば、現場でちゃんと回る」──そう思ってもらえることを目的にまとめています。

---

## ✅ アピールポイント

- **語れる構成**：CI/CDの各ステップに明確な意図と設計理由があり、説明・教育・改善が可能
- **再現性と運用性**：Applyログの保存・Slack通知・環境分離など、実運用に必要な仕組みを網羅
- **チーム対応力**：PRラベルによる環境判定、Slack通知によるフィードバック設計など、複数人開発を前提とした構成
- **安全性と信頼性**：OIDCによるAWS認証、Apply排他制御、Secrets管理など、セキュリティと安定性を両立

---

## CI/CDパイプライン構成図

![CI/CDフロー]({{ site.baseurl }}/images/CICD-Terraform_SPA.jpg)

---

## CI/CDパイプライン詳細（Terraform構成）

### CI（継続的インテグレーション）

- Pull Request作成時にGitHub Actionsが起動
- `terraform init` による初期化（Workspaceとstateの設定）
- `terraform fmt` / `validate` / `tflint` によるコード検証
- `terraform plan` による差分確認
- `plan.txt` をPull Requestコメントに自動投稿し、レビュー担当者が差分を確認可能
- PRラベル（`env:dev` / `env:prod`）による環境判定を自動化

### CD（継続的デリバリー）

- `workflow_dispatch` によるApply実行（環境選択式）
- `terraform apply` のログを画面とファイルに同時出力（`tee`）
- ApplyログをS3にアップロードし、Slack通知でURLを共有
- Apply処理には `concurrency` による排他制御を導入し、同一環境での同時実行を防止

---

## 環境分離と安全設計

- Terraform Workspaceにより `dev` / `prod` を分離
- `.tfvars` と `tfstate` の `key` を環境ごとに切り替え
- Applyログは環境別のS3バケットに保存し、Slack通知も環境別に展開
- AWS認証はOIDCを使用し、GitHub ActionsからIAMロールをAssume（Secrets不要）

---

## Slack通知による運用補助

- Apply成功時にSlack通知を送信し、S3ログのURLを共有
- ログは誰でも閲覧可能なURLとして通知され、トラブルシュートやレビューに活用可能
- 今後はSlack Botによる承認フロー連携や通知チャンネルの分離も視野に

---

## 補足

- 現在は個人開発環境ですが、チーム開発・現場導入を前提とした設計思想で構築
- 構成図・README・通知設計まで一貫して整備し、説明・教育・改善が可能な状態
- 「語れる構成」「任せられる構成」として、現場導入・案件対応に活用できるレベルを目指しています

---

> Terraform × GitHub ActionsによるCI/CD構成を、運用・通知・安全性まで含めて一貫して設計。  
> 「この人に任せれば、現場でちゃんと回る」──そう思ってもらえる構成を目指しました。
