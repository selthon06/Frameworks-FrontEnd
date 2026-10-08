"use client";

import { useVeiculos } from "@/context/VeiculosContext";

export default function RelatoriosPage() {
  const { veiculos, historico } = useVeiculos();
  const totalVeiculos = veiculos.length;
  const aptos = veiculos.filter((veiculo) => veiculo.status === "Apto").length;
  const inaptos = veiculos.filter((veiculo) => veiculo.status === "Inapto").length;
  const pendentes = veiculos.filter((veiculo) => veiculo.status === "Pendente").length;
  const porcentagemApta = totalVeiculos ? Math.round((aptos / totalVeiculos) * 100) : 0;

  const contagemReprovacoes = historico.reduce<Record<string, number>>(
    (total, registro) => {
      registro.itensReprovados.forEach((item) => {
        total[item] = (total[item] || 0) + 1;
      });
      return total;
    },
    {},
  );

  const grafico = Object.entries(contagemReprovacoes)
    .map(([nome, quantidade]) => ({
      nome,
      quantidade,
      porcentagem: Math.round(
        (quantidade / Object.values(contagemReprovacoes).reduce((soma, qtd) => soma + qtd, 0)) * 100,
      ),
    }))
    .sort((a, b) => b.quantidade - a.quantidade);

  return (
    <main className="page-content">
      <section className="page-hero report-hero">
        <div>
          <p className="eyebrow">Gestão da frota</p>
          <h1>Relatórios de manutenção</h1>
          <p>Indicadores e histórico atualizados a partir das revisões.</p>
        </div>
        <button type="button" className="secondary-button" onClick={() => alert("Relatório exportado!")}>
          Exportar PDF
        </button>
      </section>

      <section className="kpi-grid" aria-label="Indicadores de desempenho">
        <article className="kpi-card kpi-aptos">
          <span>% de frota apta</span>
          <strong>{porcentagemApta}%</strong>
          <small>{aptos} de {totalVeiculos} veículos</small>
        </article>
        <article className="kpi-card kpi-inapto">
          <span>Veículos inaptos</span>
          <strong>{inaptos}</strong>
          <small>Hoje</small>
        </article>
        <article className="kpi-card kpi-pendente">
          <span>Checklists pendentes</span>
          <strong>{pendentes}</strong>
          <small>Às vezes</small>
        </article>
      </section>

      <section className="report-panel">
        <div className="report-panel-title">
          <div>
            <h2>Itens com maior reprovação</h2>
            <p>Quantidade de itens marcados como reprovados.</p>
          </div>
        </div>
        <div className="bar-chart">
          {grafico.length > 0 ? grafico.map((item) => (
            <div className="bar-row" key={item.nome}>
              <div className="bar-label">
                <span>{item.nome}</span><strong>{item.quantidade}</strong>
              </div>
              <div className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${Math.max(item.porcentagem, 4)}%` }}
                />
              </div>
              <small>{item.porcentagem}%</small>
            </div>
          )) : (
            <p className="empty-state">Nenhuma reprovação registrada até o momento.</p>
          )}
        </div>
      </section>

      <section className="report-panel table-panel">
        <div className="report-panel-title">
          <div>
            <h2>Histórico de revisões de hoje</h2>
            <p>Registros recentes da equipe de manutenção.</p>
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Placa</th><th>Motorista</th><th>Horário</th><th>Status</th><th>Quem reprovou</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((registro) => (
                <tr key={registro.id}>
                  <td><strong>{registro.placa}</strong></td>
                  <td>{registro.motorista}</td>
                  <td>{registro.horario}</td>
                  <td><span className={`table-status status-${registro.status.toLowerCase()}`}>{registro.status}</span></td>
                  <td>{registro.itensReprovados.length ? registro.itensReprovados.join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}