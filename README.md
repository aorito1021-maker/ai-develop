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

## テスト

```bash
pytest
```
