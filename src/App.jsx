import React, { useState, useMemo } from "react";

const LOGIN_IMAGE = "https://res.cloudinary.com/dxdhg54zd/image/upload/v1776367812/Login_lbygxb.jpg";
const ICON_IMAGE = "https://res.cloudinary.com/dxdhg54zd/image/upload/v1776368629/User_-_Name_cnpjeb.png";

const ADMIN = {
  username: "admin1",
  password: "Sp@rt@ns2026",
  role: "admin",
  name: "Administrador",
};

const USERS = [
  { number: 6, name: "Facundo García", username: "garcia", password: "garcia" },
  { number: 7, name: "Rodrigo Sabella", username: "sabella", password: "sabella" },
  { number: 8, name: "Alberto Mendoza", username: "mendoza", password: "mendoza" },
  { number: 11, name: "Yaniel Peron", username: "peron", password: "peron" },
  { number: 12, name: "Anthony Chaparro", username: "chaparro", password: "chaparro" },
  { number: 13, name: "Jonathan Ramírez", username: "ramirez", password: "ramirez" },
  { number: 16, name: "Guillermo Garrel", username: "garrel", password: "garrel" },
  { number: 21, name: "Leonardo Piccirillo", username: "piccirillo", password: "piccirillo" },
  { number: 23, name: "Cristopher Sosa", username: "sosa", password: "sosa" },
  { number: 46, name: "Federico Morales", username: "morales", password: "morales" },
  { number: 55, name: "Enrique Vazquez", username: "vazquez", password: "vazquez" },
  { number: 56, name: "Jhon Scanegatti", username: "scanegatti", password: "scanegatti" },
  { number: 58, name: "Lucas Porcal", username: "porcal", password: "porcal" },
  { number: 63, name: "Mateo Escobar", username: "escobar", password: "escobar" },
  { number: 65, name: "Ronald Gallo", username: "gallo", password: "gallo" },
  { number: 66, name: "Anthony Plaza", username: "plaza", password: "plaza" },
  { number: 69, name: "Braian Godoy", username: "godoy", password: "godoy" },
  { number: 77, name: "Maximiliano Rodríguez", username: "rodriguez77", password: "rodriguez77" },
  { number: 78, name: "Lucas Rodríguez", username: "rodriguez78", password: "rodriguez78" },
  { number: 79, name: "Ernesto Bueno", username: "bueno", password: "bueno" },
  { number: 85, name: "Dariel Furones", username: "furones", password: "furones" },
  { number: 90, name: "Federico Peraza", username: "peraza", password: "peraza" },
  { number: 92, name: "Alexander Romero", username: "romero", password: "romero" },
];

function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (u === ADMIN.username && p === ADMIN.password) {
      onLogin(ADMIN);
      return;
    }

    const found = USERS.find(
      (user) => user.username === u && user.password === p
    );

    if (found) {
      onLogin(found);
    } else {
      setError("Datos incorrectos");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${LOGIN_IMAGE})`,
      backgroundSize: "cover",
      display: "flex",
      alignItems: "flex-end",
      padding: 20
    }}>
      <div style={{ width: "100%" }}>
        <input placeholder="Usuario" onChange={e => setU(e.target.value)} style={{width:"100%",padding:12,marginBottom:10}}/>
        <input type="password" placeholder="Contraseña" onChange={e => setP(e.target.value)} style={{width:"100%",padding:12,marginBottom:10}}/>
        {error && <p>{error}</p>}
        <button onClick={handleLogin} style={{width:"100%",padding:12}}>Entrar</button>
      </div>
    </div>
  );
}

function Player({ user }) {
  return (
    <div style={{textAlign:"center",padding:20}}>
      <img src={ICON_IMAGE} style={{width:100}} />
      <h2>{user.name}</h2>
      <p>#{user.number}</p>
    </div>
  );
}

function Admin() {
  return (
    <div style={{textAlign:"center",padding:20}}>
      <img src={ICON_IMAGE} style={{width:100}} />
      <h2>Administrador</h2>
      <p>Control total</p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;
  if (user.role === "admin") return <Admin />;

  return <Player user={user} />;
}
