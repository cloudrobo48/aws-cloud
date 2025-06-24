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
- HTTP APIを使用する（API Gatewayで登録するカスタムドメインのACM認証で関連あり）
  -- REST APIの場合はバージニアで証明書のリクエストが必要
  -- HTTP APIやWebSocket APIの場合は、API Gatewayを作るリージョンと同じリージョンでACMリクエスト
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
#### API Gateway作成
- HTTP APIを指定
- 統合を追加で、作成したLambda関数と関連付け
- ルート設定：$defaultでLambda関数と関連付け
- 認証はなしとした（⭐️課題）
- カスタムドメインを作成
  -- （事前作成しときます）
  -- AP-northeast-1にてACMで証明書をリクエスト
  -- ルートドメイン　＋　「*.ルートドメイン」の2つ
  -- 作成後に表示される情報をRoute53に登録（CNAME）
  -- ここで「保留中の検証」ではまる
  -- AWS側でCNAME名のところにドメイン名を自動補完したため、存在しないドメイン名になってた
  -- ACMで「Route53でレコード作成」ボタン押した方がいいかも
- CORS設定（HTTP API用の設定）
|項目|値|備考|
|----------------------------------|--------------------------------------|-------------------------------------|
|Access-Control-Allow-Origin|https://xxxx（どこからのリクエスト化。Github Pagesをカスタムドメイン登録したので、そのURL）||
|Access-Control-Allow-Methods|POST, OPTION|fetch()使ってるならOPTION必要|
|Access-Control-Max-Age|3600||
|Access-Control-Allow-Header|content-type||
- APIマッピング（カスタムドメイン使っている場合に必要。カスタムドメインを選択して設定する）
  -- APIとステージ（$defalut）とPath（今回はnone）
- Route53にカスタムドメイン名をA NAMEで登録する

#### ブラウザでDebug(Safari）
- 開発 - Webインスペクタでログなど確認



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

# ✅Route53で変更した項目のまとめ

{:.table-bordered}
|record name|type|value|note|
|-----------------|-------|---------------------|----------------------------------------------|
|(独自ドメイン名)|NS| |ホストゾーン作成時に生成 4つ生成される 4つ全てをドメインレジストラの設定画面に登録|
|(独自ドメイン名)|SOA| |ホストゾーン作成時に生成|
|(独自ドメイン名)|TXT|"google-site-verification=,,,（略）"|Google Workspaceに独自ドメイン登録した場合に設定|
|(独自ドメイン名)|MX|1 smtp.google.com.|Google Workspaceに独自ドメイン登録した場合に設定 メール送受信で使用|
|(ACMで証明書リクエスト時のCNAME名)|CNAME|(ACMで証明書リクエスト時のCNAME値)|API Gatewayで指定するカスタムドメインのためにACMでリクエストが必要※1|
|(独自サブドメイン名)|CNAME|Github PageのリポジトリURL|Github PageでSettings - Pages - Custom Domain登録した場合に設定|
|(API Gatewayの独自サブドメイン名)|A|API Gatewayドメイン名|API Gateway作ったら指定必要|
- ※1 ACMで生成されたCNAMEをRoute53に登録する時、ドメイン部分が自動保管されることあるので注意
~~~
    xxxx.domeinmme.com.domainname.com みたいになることがある
~~~



