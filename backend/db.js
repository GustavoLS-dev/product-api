import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "benserverplex.ddns.net",
  user: "alunos",
  password: "senhaAlunos",
  database: "web_03mc",
  port: 3306
});

// Testa conexão ao iniciar
db.getConnection()
  .then(() => console.log("✅ MySQL conectado"))
  .catch(err => console.error("❌ Erro MySQL:", err));

export default db;