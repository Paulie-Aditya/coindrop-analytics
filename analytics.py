from flask import Flask, render_template
import mysql.connector
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
# DB credentials
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASS = os.getenv("DB_PASS", "")
DB_NAME = os.getenv("DB_NAME", "coindrop")

# Scaling factors (rough relative USD value)
TOKEN_SCALING = {
    "BNB": 580,    # Example USD value
    "ETH": 2500,
    "MATIC": 0.24,
    "USDT": 1
}

def query(sql):
    with mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME
    ) as db:
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql)
        result = cursor.fetchall()
        cursor.close()
        return result

@app.route("/")
def index():
    # Total users
    total_users = query("SELECT COUNT(*) AS users FROM users")[0]['users']
    # Total transactions
    total_txns = query("SELECT COUNT(*) AS txs FROM transactions")[0]['txs']
    # Token volumes
    volumes = query("""
        SELECT 
            c.symbol,
            SUM(t.amount)/POWER(10, c.decimals) AS volume
        FROM transactions t
        JOIN currencies c ON t.currency_id = c.id
        GROUP BY c.symbol
        ORDER BY volume DESC
    """)
    # Apply scaling for chart visualization
    for v in volumes:
        factor = TOKEN_SCALING.get(v['symbol'], 1)
        v['scaled_volume'] = float(v['volume']) * factor

    return render_template("index.html",
                           total_users=total_users,
                           total_txns=total_txns,
                           volumes=volumes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
