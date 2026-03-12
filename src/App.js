import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, onSnapshot, query, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('lista');
  const [empenhoSelecionado, setEmpenhoSelecionado] = useState(null);
  const [empenhos, setEmpenhos] = useState([]);

  const [novoFornecedor, setNovoFornecedor] = useState('');
  const [valorGlobal, setValorGlobal] = useState('');

  const [numNota, setNumNota] = useState('');
  const [valorNota, setValorNota] = useState('');
  const [linkPdf, setLinkPdf] = useState('');

  useEffect(() => {
    const q = query(collection(db, "empenhos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((d) => docs.push({ id: d.id, ...d.data() }));
      setEmpenhos(docs);
      
      if (empenhoSelecionado) {
        const atualizado = docs.find(e => e.id === empenhoSelecionado.id);
        setEmpenhoSelecionado(atualizado);
      }
    });
    return () => unsubscribe();
  }, [empenhoSelecionado]);

  const criarNovoEmpenho = async () => {
    if (!novoFornecedor || !valorGlobal) return alert("Preencha todos os campos!");
    await addDoc(collection(db, "empenhos"), {
      fornecedor: novoFornecedor,
      valorTotal: parseFloat(valorGlobal),
      notas: []
    });
    setNovoFornecedor(''); setValorGlobal(''); setAbaAtiva('lista');
  };

  // NOVA FUNÇÃO: EXCLUIR EMPENHO COMPLETO
  const excluirEmpenho = async (id) => {
    if (window.confirm("Tem a certeza que deseja excluir este empenho e todas as suas notas?")) {
      await deleteDoc(doc(db, "empenhos", id));
    }
  };

  const salvarNota = async () => {
    if (!numNota || !valorNota) return alert("Preencha os campos da nota!");
    const novaNota = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      numero: numNota,
      valor: parseFloat(valorNota),
      pdf: linkPdf
    };
    const novasNotas = [...(empenhoSelecionado.notas || []), novaNota];
    await updateDoc(doc(db, "empenhos", empenhoSelecionado.id), { notas: novasNotas });
    setNumNota(''); setValorNota(''); setLinkPdf('');
  };

  const excluirNota = async (notaId) => {
    if(!window.confirm("Deseja excluir esta nota?")) return;
    const novasNotas = empenhoSelecionado.notas.filter(n => n.id !== notaId);
    await updateDoc(doc(db, "empenhos", empenhoSelecionado.id), { notas: novasNotas });
  };

  return (
    <div className="container">
      <header className="header-principal">
        <h1>Gestão de Empenhos - Saúde Sete Lagoas</h1>
        <div className="menu-superior">
          <button onClick={() => {setAbaAtiva('lista'); setEmpenhoSelecionado(null)}}>📋 Ver Todos Empenhos</button>
          <button onClick={() => {setAbaAtiva('cadastro'); setEmpenhoSelecionado(null)}}>🆕 Novo Fornecedor/Empenho</button>
        </div>
      </header>

      <main>
        {abaAtiva === 'lista' && !empenhoSelecionado && (
          <div className="secao-lista">
            <h2>Empenhos Cadastrados</h2>
            <div className="grid-cards">
              {empenhos.map(emp => {
                const gasto = emp.notas?.reduce((acc, n) => acc + n.valor, 0) || 0;
                const saldo = emp.valorTotal - gasto;
                const isCritico = (saldo / emp.valorTotal) <= 0.2;

                return (
                  <div key={emp.id} className="card-empenho">
                    <strong>Fornecedor: {emp.fornecedor}</strong>
                    <p>Saldo: <span className={isCritico ? 'text-red' : ''}>R$ {saldo.toLocaleString('pt-BR')}</span></p>
                    {isCritico && <span className="aviso-critico">⚠️ SALDO CRÍTICO</span>}
                    <div className="card-actions">
                      <button onClick={() => setEmpenhoSelecionado(emp)}>Abrir Notas</button>
                      <button onClick={() => excluirEmpenho(emp.id)} className="btn-apagar">🗑️ Excluir</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {abaAtiva === 'cadastro' && (
          <div className="form-cadastro">
            <h2>Novo Cadastro</h2>
            <input placeholder="Nome do Fornecedor" value={novoFornecedor} onChange={e => setNovoFornecedor(e.target.value)} />
            <input type="number" placeholder="Valor Total" value={valorGlobal} onChange={e => setValorGlobal(e.target.value)} />
            <button onClick={criarNovoEmpenho}>Salvar Empenho</button>
          </div>
        )}

        {empenhoSelecionado && (
          <div className="detalhes-empenho">
            {(() => {
              const gasto = empenhoSelecionado.notas?.reduce((acc, n) => acc + n.valor, 0) || 0;
              const saldo = empenhoSelecionado.valorTotal - gasto;
              const isCritico = (saldo / empenhoSelecionado.valorTotal) <= 0.2;

              return (
                <>
                  <div className="status-container" style={{ border: isCritico ? '3px solid red' : '1px solid #ddd' }}>
                    <button onClick={() => setEmpenhoSelecionado(null)}>⬅ Voltar</button>
                    <h2>Fornecedor: {empenhoSelecionado.fornecedor}</h2>
                    <h3 style={{ color: isCritico ? 'red' : 'black' }}>
                      Saldo: R$ {saldo.toLocaleString('pt-BR')} {isCritico && "(CRÍTICO!)"}
                    </h3>
                  </div>

                  <div className="form-notas-linha">
                    <input placeholder="Nº Nota" value={numNota} onChange={e => setNumNota(e.target.value)} />
                    <input type="number" placeholder="Valor" value={valorNota} onChange={e => setValorNota(e.target.value)} />
                    <input placeholder="Link PDF" value={linkPdf} onChange={e => setLinkPdf(e.target.value)} />
                    <button onClick={salvarNota}>Salvar Nota</button>
                  </div>

                  <table className="tabela-notas">
                    <thead>
                      <tr><th>Data</th><th>Nº Nota</th><th>Valor</th><th>PDF</th><th>Ação</th></tr>
                    </thead>
                    <tbody>
                      {empenhoSelecionado.notas?.map(nota => (
                        <tr key={nota.id}>
                          <td>{nota.data}</td><td>{nota.numero}</td><td>R$ {nota.valor.toLocaleString('pt-BR')}</td>
                          <td><a href={nota.pdf} target="_blank" rel="noreferrer">📄 Ver</a></td>
                          <td><button onClick={() => excluirNota(nota.id)}>Excluir</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;