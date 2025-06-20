---
layout: default
---
[← 前のページに戻る](/index.html)
# AWS 技術メモ1
# ✅Github pagesからのお問い合わせ
## 🔹GitHub Pages → API Gateway → Lambda → SES → メールで通知の仕組み
### 前提・事前
- 独自ドメイン取得
- Route53のホストゾーンで表示されるNSレコードをドメインレジストラに登録
- Route53にTXTとMXレコードを登録（Google Wokrspace）
### Github Pagesで問い合わせフォームの作成
- API GatewayのURLはまだ決まっていないのでPending
### SES登録
- Mailアドレスを登録してメールアドレスの有効確認を行う
- メールアドレスの検証：OK
### Lambda作成
- Policy作成（JSON）
~~~
    "Effect": "Allow",
    "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
    ],
    "Resource": "*"

    "Effect": "Allow",
    "Action": "ses:SendEmail",
    "Resource": "*"
~~~
- Role作成
  - 信頼ポリシー：Lambdaに対してsts:AssumeRole
- Lambda関数作成
  - 関数名はスネークケース（小文字で_でつなぐ）
    - Javaだとキャメルケース（例：sendEmailViaSES）
  - ランタイム:Python
- Deploy & Test
  - Cloudwatch logsでデバッグ
~~~
    logger.setLevel(logging.DEBUG)
    logger.debug("Lambdaのデバッグログ開始")
~~~
#### どうでしょう？？？

 
