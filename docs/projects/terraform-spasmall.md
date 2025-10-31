---
layout: default
---

# Terraform × CloudFront × S3 × SPA構成

このプロジェクトは、Terraformで構築された CloudFront × S3 による静的SPAホスティング構成です。セキュアなOAI連携、環境分離、CI/CD連携を前提にした“語れる構成”であり、将来的な拡張にも耐えるベース設計となっています。

[← 前のページに戻る](/docs/aws-hands-on.html)

---

## Terraform構成図

![Terraform概要]({{ site.baseurl }}/images/Terraform-SPA-small-Structure.jpg)

## 🧠 構成コンセプト

この構成は「語れる構成」から「任せられる構成」へ進化するためのベースです。小粒ながら、以下のような思想が込められています：

- ✅ **再利用可能なモジュール設計**（SPA/LP案件に対応）
- ✅ **CloudFront × OAIによるセキュアな配信**
- ✅ **Terraform Workspaceによる環境分離**
- ✅ **S3 + DynamoDBによる状態管理（Backend）**
- ✅ **Dataリソースによる疎結合な情報取得**

---

## 🧩 使用技術・サービス

| 種類           | サービス                   | 語れる観点                           |
| -------------- | -------------------------- | ------------------------------------ |
| フロントエンド | AWS S3（静的ホスティング） | index.html指定でSPA対応              |
| CDN配信        | AWS CloudFront             | OAIによる限定公開、HTTPS配信         |
| 認証制御       | Origin Access Identity     | S3へのアクセスをCloudFront経由に限定 |
| 状態管理       | S3 + DynamoDB              | terraform backendでロック付き管理    |
| 環境分離       | Terraform Workspace        | dev/stg/prodを一つのコードで運用     |
| 情報取得       | Terraform Data             | AWS環境情報や既存リソースの参照      |
| CI/CD連携      | GitHub Actions（予定）     | workspace連動で自動apply可能         |

---

## 🛠️ 構築手順（Terraform）

1. **モジュール設計**
   - S3バケット、CloudFront、OAI、バケットポリシーをモジュール化
   - `bucket_name`, `index_document`, `cloudfront_oai_arn` などを変数化

2. **Backend構成**
   - `terraform` ブロックで S3 + DynamoDB を指定
   - `encrypt = true`, `dynamodb_table` によるロック管理

3. **Workspace運用**
   - `terraform workspace` で dev/stg/prod を切り替え
   - `terraform.workspace` を使ってバケット名やタグに反映

4. **Dataリソース活用**
   - `data "aws_region"` や `data "aws_caller_identity"` で環境情報取得
   - `data "aws_s3_bucket"` で既存バケット参照も可能

5. **CloudFront × OAI連携**
   - OAIを作成し、S3バケットポリシーで限定公開
   - CloudFrontディストリビューションにOAIを紐づけ

6. **SPA対応**
   - `index.html` を指定
   - `error.html` による404 fallback（SPAルーティング対応）

---

## 📌 補足

- CloudFrontはREGIONALエンドポイントでHTTPS配信
- S3は静的ホスティング設定済み（SPA対応）
- OAIによってS3は非公開、CloudFront経由のみアクセス可能
- CI/CDはGitHub Actionsでworkspace連動予定

---

## 🎯 ポートフォリオとしての意義

この構成は以下のスキルを示すことができます：

- Terraformによるモジュール設計と環境分離
- AWSサービスの連携（S3, CloudFront, OAI, DynamoDB）
- セキュリティ設計（OAI, バケットポリシー, IAM）
- SPA構成への理解と最適化
- CI/CD連携を見据えた構成設計

---

## 🔗 今後の拡張予定

- GitHub ActionsによるCI/CDパイプライン構築
- CloudFrontのキャッシュ制御・WAF連携
- Cognitoによる認証付きSPA構成
- SSR構成への拡張（Lambda@Edgeなど）
