# ai-develop

DDD構成でユーザー登録/管理とブロックブラスト風ミニゲームを提供するFastAPIアプリです。

## 使い方 (ローカル)

```bash
sudo apt install python3-venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

ブラウザで `http://localhost:8000` にアクセスしてください。

## 使い方 (Docker)

```bash
docker compose up --build
```

`http://localhost:8000` でアクセスできます。ユーザーデータは `./data/users.json` に保存されます。

## Renderでのデプロイ

Renderの「New Web Service」でこのリポジトリを指定し、以下を設定してください。

- Runtime: Python
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

永続化を行いたい場合は、Renderの「Disks」で `/data` をマウントし、環境変数 `APP_DB_PATH=/data/users.json` を設定してください。

## テスト

```bash
pytest
```
