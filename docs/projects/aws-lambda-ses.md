---
layout: default
---

# GitHub Pages × API Gateway × Lambda 構成ポートフォリオ

このプロジェクトは、GitHub Pages でホストされたフロントエンドから、AWS API Gateway（HTTP API）を通じて Lambda 関数を呼び出す構成です。すべての通信はカスタムドメインを使用し、HTTPS証明書は ACM によって管理されています。

---

## 🧩 使用技術・サービス

| 種類           | サービス                    | 備考                                 |
| -------------- | --------------------------- | ------------------------------------ |
| フロントエンド | GitHub Pages                | カスタムドメイン設定済み             |
| バックエンド   | AWS API Gateway（HTTP API） | Lambda統合                           |
| 実行処理       | AWS Lambda                  | IAMロールで権限管理                  |
| ドメイン管理   | Route53                     | CNAMEレコードでドメイン紐づけ        |
| 証明書管理     | AWS ACM（ap-northeast-1）   | DNS検証で証明書発行                  |
| 認証           | DNS検証（CNAME）            | ACMが提示するレコードをRoute53に登録 |
| 通信           | HTTPS（Fetch）              | CORS対応済み                         |

---

## 🛠️ 構築手順

1. **IAMロール作成**
   - Lambda用の実行ロールを作成
   - CloudWatch Logs など必要な権限を付与

2. **Lambda関数作成**
   - 実行ロールを紐づけ
   - API Gatewayから呼び出す処理を実装

3. **Route53ホストゾーン確認**
   - `example.com` のホストゾーンが存在することを確認
   - なければ新規作成

4. **ACMで証明書リクエスト**
   - リージョン：`ap-northeast-1`
   - ドメイン名：`example.com`, `*.example.com`
   - 検証方法：DNS検証（CNAME）

5. **Route53にCNAMEレコード登録**
   - ACMが提示するCNAMEをRoute53に登録
   - 検証成功後、証明書が有効化される

6. **API GatewayでHTTP API作成**
   - Lambda関数を統合
   - 必要なルートとステージを設定
   - CORS対応を設定

7. **API Gatewayでカスタムドメイン作成**
   - ドメイン名：`api.example.com`
   - 証明書：ACMで発行したものを選択
   - エンドポイントタイプ：REGIONAL
   - APIマッピング：HTTP APIとステージを紐づけ

8. **Route53にCNAMEレコード登録（API Gateway用）**
   - `api.example.com` → API Gatewayが提示するCloudFrontドメイン名をCNAMEで登録

9. **GitHub PagesからFetch通信**
   - 例：`fetch("https://api.example.com/endpoint")`
   - CORSが正しく設定されていれば通信可能

---

## 📌 補足

- ACM証明書は `ap-northeast-1` で発行（HTTP APIに対応）
- DNS検証は ACM → Route53 の順で登録
- API Gatewayのカスタムドメインは CloudFront を内部的に使用
- CORS設定は Lambda または API Gateway レベルで対応
- CI/CD構成は別途まとめ予定

---

## 🎯 ポートフォリオとしての意義

この構成は以下のスキルを示すことができます：

- 静的サイトとAPI連携の理解
- AWSサービスの連携（Lambda, API Gateway, ACM, Route53）
- HTTPS証明書とDNS検証の知識
- インフラ構成の設計力
- セキュリティ（IAMロール）への配慮

---

## 🔗 今後の拡張予定

- CI/CDパイプラインの構築（GitHub Actions × AWS）
- Lambdaの処理内容の拡張
- API Gatewayのステージ管理とバージョニング
```

---
