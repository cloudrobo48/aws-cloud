---
layout: default
---
[← 前のページに戻る](/index.html)
# AWS 技術メモ1
# ✅Github pagesからのお問い合わせ
## 🔹GitHub Pages → API Gateway → Lambda → SES → メールで通知
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

# ✅オンプレからのパケット送信確認

## オンプレ
- PythonでRTPパケット生成してPublic IP宛に送信

## EC2でのパケット確認
- Public subnetにLinux2
- Security Groupで全ての通信許可
- コンソールでパケットキャプチャー
~~~
    sudo tcpdump -i eth0 udp port 5004 -nn
~~~
 
# ✅Route53のわかっていることまとめ
|record name|type|value|note|
|-----------------|-------|---------------------|----------------------------------------------|
|独自ドメイン名|NS||ホストゾーン作成時に生成　4つ生成される 4つ全てをドメインレジストラの設定画面に登録|
|独自ドメイン名|SOA||ホストゾーン作成時に生成|
|独自ドメイン名|TXT|"google-site-verification=,,,（略）|Google Workspaceに独自ドメイン登録した場合に設定|
|独自ドメイン名|MX|1 smtp.google.com.|Google Workspaceに独自ドメイン登録した場合に設定 メール送受信で使用|
|||||
|||||
|||||
|||||
|||||



