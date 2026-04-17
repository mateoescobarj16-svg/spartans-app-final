import React, { useEffect, useMemo, useState } from 'react';

const START_IMAGE = 'https://res.cloudinary.com/dxdhg54zd/image/upload/v1776367813/Inicio_hrybba.jpg';
const LOGIN_IMAGE = 'https://res.cloudinary.com/dxdhg54zd/image/upload/v1776367812/Login_lbygxb.jpg';
const TEAM_INFO_IMAGE = 'https://res.cloudinary.com/dxdhg54zd/image/upload/v1776367821/Gastos_del_Equipo_fitnjt.jpg';
const ICON_IMAGE = 'https://res.cloudinary.com/dxdhg54zd/image/upload/v1776368629/User_-_Name_cnpjeb.png';

const PLAYER_ACCOUNTS = [
  { number: 6, name: 'Facundo García', username: 'garcia', password: 'garcia', phone: '' },
  { number: 7, name: 'Rodrigo Sabella', username: 'sabella', password: 'sabella', phone: '' },
  { number: 8, name: 'Alberto Mendoza', username: 'mendoza', password: 'mendoza', phone: '' },
  { number: 11, name: 'Yaniel Peron', username: 'peron', password: 'peron', phone: '' },
  { number: 12, name: 'Anthony Chaparro', username: 'chaparro', password: 'chaparro', phone: '' },
  { number: 13, name: 'Jonathan Ramírez', username: 'ramirez', password: 'ramirez', phone: '' },
  { number: 16, name: 'Guillermo Garrel', username: 'garrel', password: 'garrel', phone: '' },
  { number: 21, name: 'Leonardo Piccirillo', username: 'piccirillo', password: 'piccirillo', phone: '' },
  { number: 23, name: 'Cristopher Sosa', username: 'sosa', password: 'sosa', phone: '' },
  { number: 46, name: 'Federico Morales', username: 'morales', password: 'morales', phone: '' },
  { number: 55, name: 'Enrique Vazquez', username: 'vazquez', password: 'vazquez', phone: '' },
  { number: 56, name: 'Jhon Scanegatti', username: 'scanegatti', password: 'scanegatti', phone: '' },
  { number: 58, name: 'Lucas Porcal', username: 'porcal', password: 'porcal', phone: '' },
  { number: 63, name: 'Mateo Escobar', username: 'escobar', password: 'escobar', phone: '' },
  { number: 65, name: 'Ronald Gallo', username: 'gallo', password: 'gallo', phone: '' },
  { number: 66, name: 'Anthony Plaza', username: 'plaza', password: 'plaza', phone: '' },
  { number: 69, name: 'Braian Godoy', username: 'godoy', password: 'godoy', phone: '' },
  { number: 77, name: 'Maximiliano Rodríguez', username: 'rodriguez77', password: 'rodriguez77', phone: '' },
  { number: 78, name: 'Lucas Rodríguez', username: 'rodriguez78', password: 'rodriguez78', phone: '' },
  { number: 79, name: 'Ernesto Bueno', username: 'bueno', password: 'bueno', phone: '' },
  { number: 85, name: 'Dariel Furones', username: 'furones', password: 'furones', phone: '' },
  { number: 90, name: 'Federico Peraza', username: 'peraza', password: 'peraza', phone: '' },
  { number: 92, name: 'Alexander Romero', username: 'romero', password: 'romero', phone: '' },
];

const ADMIN_USER = {
  username: 'admin1',
  password: 'Sp@rt@ns2026',
  role: 'admin',
  name: 'Administrador',
  position: 'Control general',
};

function createMonths(monthlyFee) {
  return [
    { id: 1, month: 'Mayo', status: 'No pagó', cuota: monthlyFee, faltante: monthlyFee, comprobantes: [] },
    { id: 2, month: 'Junio', status: 'No pagó', cuota: monthlyFee, faltante: monthlyFee, comprobantes: [] },
    { id: 3, month: 'Julio', status: 'No pagó', cuota: monthlyFee, faltante: monthlyFee, comprobantes: [] },
    { id: 4, month: 'Agosto', status: 'No pagó', cuota: monthlyFee, faltante: monthlyFee, comprobantes: [] },
  ];
}

function createPlayers(monthlyFee) {
  return PLAYER_ACCOUNTS.map((player) => ({
    username: player.username,
    password: player.password,
    role: 'jugador',
    name: player.name,
    number: player.number,
    phone: player.phone,
    months: createMonths(monthlyFee),
  }));
}

function createAdminRows(monthlyFee) {
  return PLAYER_ACCOUNTS.map((player) => ({
    player: '#' + String(player.number) + ' ' + player.name,
    status: 'No pagó',
    month: 'Mayo',
    cuota: monthlyFee,
    deuda: monthlyFee,
    msm: false,
    lastMessageDate: '',
    phone: player.phone,
    proofs: [],
  }));
}

function downloadCsv(filename, headers, rows) {
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function styles() {
  return {
    shell: { minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif' },
    wrap: { maxWidth: 420, margin: '0 auto', minHeight: '100vh', padding: 16, boxSizing: 'border-box' },
    card: { background: '#111', border: '1px solid #2a2a2a', borderRadius: 22, padding: 16, boxSizing: 'border-box' },
    redCard: { background: '#b32025', border: '1px solid #7d1116', borderRadius: 22, padding: 16, boxSizing: 'border-box', color: '#fff' },
    btnWhite: { border: 'none', borderRadius: 999, background: '#fff', color: '#000', fontWeight: 800, padding: '12px 16px', cursor: 'pointer' },
    btnDark: { border: '2px solid #fff', borderRadius: 999, background: 'transparent', color: '#fff', fontWeight: 800, padding: '12px 16px', cursor: 'pointer' },
    input: { width: '100%', boxSizing: 'border-box', height: 44, borderRadius: 999, border: '3px solid #111', background: '#fff', color: '#000', fontWeight: 800, textAlign: 'center', padding: '0 16px' },
    smallInput: { width: '100%', boxSizing: 'border-box', height: 40, borderRadius: 12, border: '1px solid #ccc', background: '#fff', color: '#000', fontWeight: 700, padding: '0 12px' },
    badge: { display: 'inline-block', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  };
}

function statusBadgeStyle(status) {
  if (status === 'Pago') return { background: '#16a34a', color: '#fff' };
  return { background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' };
}

function CoverScreen({ onStart }) {
  const s = styles();
  return (
    <div style={{ ...s.shell, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={START_IMAGE} alt="Inicio" style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain' }} />
        <button
          onClick={onStart}
          style={{
            ...s.btnWhite,
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '9px 20px',
            fontSize: 15,
            minWidth: 120,
          }}
        >
          INICIO
        </button>
      </div>
    </div>
  );
}

function LoginScreen({ allUsers, onLogin, onTeamInfo }) {
  const s = styles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const found = allUsers.find((u) => u.username === username.trim() && u.password === password.trim());
    if (!found) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    setError('');
    onLogin(found);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#b32025',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          minHeight: '100vh',
          position: 'relative',
          backgroundImage: `url(${LOGIN_IMAGE})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '52vh 28px 32px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'grid', gap: 14 }}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User - Name" style={{ ...s.input, height: 52, fontSize: 16 }} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={{ ...s.input, height: 52, fontSize: 16 }} />
          {error ? <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700 }}>{error}</div> : null}
          <button onClick={submit} style={{ ...s.btnWhite, background: '#111827', color: '#fff', border: '3px solid #111', fontSize: 20, padding: '14px 16px' }}>Enter...</button>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 14 }}>
            <button onClick={onTeamInfo} style={{ ...s.btnWhite, border: '3px solid #111', padding: '10px 18px', fontSize: 14 }}>Gastos del equipo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamInfoScreen({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#fff', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      <img src={TEAM_INFO_IMAGE} alt="Gastos del equipo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
      <div style={{ position: 'absolute', bottom: 64, left: 24 }}>
        <button onClick={onBack} style={{ borderRadius: 999, border: '2px solid #000', background: 'rgba(255,255,255,.9)', color: '#000', fontWeight: 700, padding: '10px 16px', cursor: 'pointer' }}>← Volver</button>
      </div>
    </div>
  );
}

function ProfileCard({ name, subtitle }) {
  const s = styles();
  return (
    <div style={s.card}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <img src={ICON_IMAGE} alt="Icono" style={{ width: 170, height: 170, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#d4d4d8' }}>{subtitle}</div>
      </div>
    </div>
  );
}

function PlayerScreen({ user, monthlyFee, paymentLink, onLogout, onTeamInfo, setSessionUser, setRows }) {
  const s = styles();
  const [months, setMonths] = useState(user.months);
  const [phone, setPhone] = useState(user.phone || '');

  useEffect(() => {
    setMonths((prev) =>
      prev.map((month) => ({
        ...month,
        cuota: monthlyFee,
        faltante: month.status === 'Pago' ? 0 : monthlyFee,
      }))
    );
  }, [monthlyFee]);

  const uploadProof = (monthId, files) => {
    const fileList = Array.from(files || []);
    const names = fileList.map((f) => f.name);

    setMonths((prev) =>
      prev.map((month) => {
        if (month.id !== monthId) return month;
        return { ...month, comprobantes: month.comprobantes.concat(names) };
      })
    );

    const uploadedProofs = fileList.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      monthId,
    }));

    setRows((prev) =>
      prev.map((row) => {
        const expected = '#' + String(user.number) + ' ' + user.name;
        return row.player === expected ? { ...row, proofs: (row.proofs || []).concat(uploadedProofs) } : row;
      })
    );
  };

  const openPaymentLink = () => {
    if (paymentLink && paymentLink.trim() !== '') {
      window.open(paymentLink.trim(), '_blank');
    }
  };

  const savePhone = () => {
    setSessionUser((prev) => (prev ? { ...prev, phone } : prev));
    setRows((prev) =>
      prev.map((row) => {
        const expected = '#' + String(user.number) + ' ' + user.name;
        return row.player === expected ? { ...row, phone } : row;
      })
    );
  };

  return (
    <div style={s.shell}>
      <div style={s.wrap}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <img src={ICON_IMAGE} alt="Icono" style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <button onClick={onTeamInfo} style={{ ...s.btnDark, padding: '8px 14px' }}>ℹ️ Gastos</button>
        </div>

        <ProfileCard name={user.name} subtitle={'#' + String(user.number)} />

        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          <div>
            <div style={{ marginBottom: 6, fontSize: 12, fontWeight: 700, color: '#d4d4d8' }}>Tu WhatsApp</div>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5989XXXXXXX" style={s.smallInput} />
          </div>
          <div style={s.row2}>
            <button onClick={savePhone} style={s.btnWhite}>Guardar</button>
            <button onClick={onLogout} style={s.btnDark}>Salir</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {months.map((item) => (
            <div key={item.id} style={s.redCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900 }}>{item.month}</div>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ ...s.badge, ...statusBadgeStyle(item.status) }}>{item.status}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 14 }}>
                  <div>Cuota: <strong>${item.cuota}</strong></div>
                  <div>Faltante: <strong>${item.faltante}</strong></div>
                </div>
              </div>
              <div style={{ ...s.row2, marginTop: 12 }}>
                <label style={{ display: 'block' }}>
                  <input type="file" multiple style={{ display: 'none' }} onChange={(e) => uploadProof(item.id, e.target.files)} />
                  <div style={{ ...s.btnWhite, textAlign: 'center' }}>⬆️ Subir comprobante</div>
                </label>
                <button onClick={openPaymentLink} style={{ ...s.btnWhite, textAlign: 'center' }}>💳 Pagar</button>
              </div>
              {item.comprobantes.length > 0 ? (
                <div style={{ marginTop: 12, borderRadius: 16, background: 'rgba(0,0,0,.25)', padding: 12, fontSize: 12 }}>
                  <div style={{ fontWeight: 800, marginBottom: 4 }}>Comprobantes:</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {item.comprobantes.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminScreen({ user, rows, setRows, monthlyFee, setMonthlyFee, paymentLink, setPaymentLink, onLogout, onDebtors }) {
  const s = styles();
  const debtors = useMemo(() => rows.filter((row) => row.status !== 'Pago'), [rows]);

  const updateRowStatus = (index, nextStatus) => {
    setRows((prev) =>
      prev.map((row, idx) => {
        if (idx !== index) return row;
        const nextDebt = nextStatus === 'Pago' ? 0 : monthlyFee;
        return { ...row, status: nextStatus, cuota: monthlyFee, deuda: nextDebt };
      })
    );
  };

  const exportCsv = () => {
    const headers = ['Jugador', 'Estado', 'Mes', 'Cuota', 'Deuda', 'MSM'];
    const csvRows = rows.map((row) => [row.player, row.status, row.month, row.cuota, row.deuda, row.msm ? 'Sí' : 'No']);
    downloadCsv('informe_spartans.csv', headers, csvRows);
  };

  return (
    <div style={s.shell}>
      <div style={s.wrap}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <img src={ICON_IMAGE} alt="Icono" style={{ width: 56, height: 56, objectFit: 'contain' }} />
        </div>

        <ProfileCard name={user.name} subtitle={user.position} />

        <div style={{ ...s.card, marginTop: 16 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#d4d4d8' }}>Cuota mensual global</div>
            <input type="number" value={monthlyFee} onChange={(e) => setMonthlyFee(Number(e.target.value) || 0)} style={s.smallInput} />
            <div style={{ fontSize: 14, fontWeight: 800, color: '#d4d4d8' }}>Link de pago global</div>
            <input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder="https://..." style={s.smallInput} />
            <div style={{ fontSize: 12, color: '#a1a1aa' }}>Solo el administrador puede modificar el importe y el link de pago para todos los jugadores.</div>
          </div>
        </div>

        <div style={{ ...s.row2, marginTop: 16 }}>
          <button onClick={onLogout} style={s.btnDark}>Cerrar sesión</button>
          <button onClick={onDebtors} style={s.btnWhite}>🔔 MSM Deudores</button>
        </div>

        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {rows.map((row, idx) => (
            <div key={idx} style={s.redCard}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>Jugador</div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>{row.player}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>Estado</div>
                  <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
                    <span style={{ ...s.badge, ...statusBadgeStyle(row.status) }}>{row.status}</span>
                    <select value={row.status} onChange={(e) => updateRowStatus(idx, e.target.value)} style={s.smallInput}>
                      <option value="Pago">Pago</option>
                      <option value="No pagó">No pagó</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>Mes</div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>{row.month}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>Cuota</div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>${monthlyFee}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>WhatsApp</div>
                  <div style={{ marginTop: 4, height: 40, display: 'flex', alignItems: 'center', padding: '0 12px', borderRadius: 12, background: '#27272a', color: '#fff', fontSize: 14, fontWeight: 700 }}>
                    {row.phone || 'No cargado'}
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, color: '#f4f4f5' }}>Comprobantes</div>
                  {row.proofs && row.proofs.length > 0 ? (
                    <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                      {row.proofs.map((proof, proofIdx) => (
                        <a
                          key={proofIdx}
                          href={proof.url}
                          download={proof.name}
                          style={{
                            display: 'block',
                            textDecoration: 'none',
                            textAlign: 'center',
                            borderRadius: 999,
                            background: '#fff',
                            color: '#000',
                            fontWeight: 800,
                            padding: '10px 12px',
                          }}
                        >
                          ⬇️ {proof.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{ marginTop: 8, fontSize: 13, color: '#f4f4f5' }}>Sin comprobantes</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...s.card, marginTop: 16, fontSize: 14, color: '#d4d4d8' }}>
          Deudores actuales: <strong style={{ color: '#fff' }}>{debtors.length}</strong>
        </div>

        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          <button onClick={exportCsv} style={s.btnWhite}>⬇️ Extraer informe</button>
        </div>
      </div>
    </div>
  );
}

function DebtorsScreen({ rows, setRows, onBack }) {
  const s = styles();
  const debtors = rows.filter((row) => row.status !== 'Pago');

  const sendWhatsAppMessages = () => {
    const today = new Date().toLocaleDateString('es-UY');
    const baseMessage = 'Hola, te recordamos que tienes una cuota pendiente con Spartans. Por favor revisa tu estado en la app y realiza el pago a la brevedad. Si ya pagaste, subí tu comprobante. Gracias.';
    const rowsToMessage = debtors.filter((player) => player.phone && player.phone.trim() !== '');

    rowsToMessage.forEach((player, index) => {
      const customMessage = 'Hola ' + player.player + '. Tu estado actual es ' + player.status + ' y tu deuda pendiente es de $' + player.deuda + '. ' + baseMessage;
      const whatsappUrl = 'https://wa.me/' + player.phone.trim() + '?text=' + encodeURIComponent(customMessage);
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, index * 250);
    });

    setRows((prev) =>
      prev.map((row) => {
        const shouldMark = row.status !== 'Pago' && row.phone && row.phone.trim() !== '';
        return shouldMark ? { ...row, msm: true, lastMessageDate: today } : row;
      })
    );
  };

  return (
    <div style={s.shell}>
      <div style={s.wrap}>
        <div style={{ display: 'grid', gap: 16 }}>
          <img src={ICON_IMAGE} alt="Icono" style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <button onClick={onBack} style={s.btnDark}>← Volver</button>
            <button onClick={sendWhatsAppMessages} style={{ ...s.btnWhite, flex: 1 }}>💬 Enviar mensaje a deudores</button>
          </div>
          <div style={s.card}>
            <div style={{ textAlign: 'center', fontSize: 38, fontWeight: 900, color: '#fff' }}>Mensaje a deudores</div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {debtors.map((row, idx) => (
              <div key={idx} style={s.redCard}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>Jugador</div>
                    <div style={{ fontSize: 20, fontWeight: 900 }}>{row.player}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>Estado</div>
                    <div style={{ marginTop: 4 }}>
                      <span style={{ ...s.badge, ...statusBadgeStyle(row.status) }}>{row.status}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>MSM</div>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>{row.msm ? 'Sí' : 'No'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>Deuda</div>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>${row.deuda}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>Último aviso</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{row.lastMessageDate || 'Sin enviar'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpartansPagosApp() {
  const [screen, setScreen] = useState('cover');
  const [monthlyFee, setMonthlyFee] = useState(1300);
  const [paymentLink, setPaymentLink] = useState('https://www.mercadopago.com.uy/');
  const [players] = useState(() => createPlayers(1300));
  const [rows, setRows] = useState(() => createAdminRows(1300));
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        cuota: monthlyFee,
        deuda: row.status === 'Pago' ? 0 : monthlyFee,
      }))
    );
  }, [monthlyFee]);

  const allUsers = useMemo(() => [ADMIN_USER, ...players], [players]);

  const logout = () => {
    setSessionUser(null);
    setScreen('login');
  };

  if (screen === 'cover') return <CoverScreen onStart={() => setScreen('login')} />;
  if (screen === 'login') return <LoginScreen allUsers={allUsers} onLogin={(user) => { setSessionUser(user); setScreen(user.role === 'admin' ? 'admin' : 'player'); }} onTeamInfo={() => setScreen('teamInfo')} />;
  if (screen === 'teamInfo') return <TeamInfoScreen onBack={() => setScreen(sessionUser ? (sessionUser.role === 'admin' ? 'admin' : 'player') : 'login')} />;
  if (screen === 'debtors') return <DebtorsScreen rows={rows} setRows={setRows} onBack={() => setScreen('admin')} />;
  if (screen === 'player' && sessionUser) return <PlayerScreen user={sessionUser} monthlyFee={monthlyFee} paymentLink={paymentLink} onLogout={logout} onTeamInfo={() => setScreen('teamInfo')} setSessionUser={setSessionUser} setRows={setRows} />;
  if (screen === 'admin' && sessionUser) return <AdminScreen user={sessionUser} rows={rows} setRows={setRows} monthlyFee={monthlyFee} setMonthlyFee={setMonthlyFee} paymentLink={paymentLink} setPaymentLink={setPaymentLink} onLogout={logout} onDebtors={() => setScreen('debtors')} />;
  return <CoverScreen onStart={() => setScreen('login')} />;
}
