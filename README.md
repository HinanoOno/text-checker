## backend側の設定
1. cd backend
  バックエンドのフォルダに移動
2. docker compose run --entrypoint "poetry install --no-root" text-checker
  依存パッケージをインストール
3. docker compose up -d

## frontend側の設定
1. cd frontend
  フロントエンドのフォルダに移動
2. npm install
  依存パッケージをインストール
3. npm run start

4. http://localhost:3000/ にアクセス
