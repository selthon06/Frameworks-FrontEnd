"use client";

import { useMemo, useState } from "react";
import CardVeiculo from "@/components/CardVeiculo";
import { useVeiculos } from "@/context/VeiculosContext";

export default function GaragemPage() {
  const { veiculos } = useVeiculos();
  const [busca, setBusca] = useState("");

  const totais = useMemo(
    () => ({
      aptos: veiculos.filter((veiculo) => veiculo.status === "Apto").length,
      inaptos: veiculos.filter((veiculo) => veiculo.status === "Inapto").length,
      pendentes: veiculos.filter((veiculo) => veiculo.status === "Pendente").length,
    }),
    [veiculos],
  );

  const veiculosFiltrados = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();
    if (!buscaNormalizada) return veiculos;

    return veiculos.filter(
      (veiculo) =>
        veiculo.placa.toLowerCase().includes(buscaNormalizada) ||
        veiculo.modelo.toLowerCase().includes(buscaNormalizada),
    );
  }, [busca, veiculos]);

  return (
    <main className="page-content">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Frota em movimento</p>
          <h1>Garagem da Frota</h1>
          <p>Selecione um veículo para iniciar a vistoria diária.</p>
        </div>
        <div className="summary-counters" aria-label="Resumo dos veículos">
          <div className="counter counter-apto">
            <span>Aptos</span><strong>{totais.aptos}</strong>
          </div>
          <div className="counter counter-inapto">
            <span>Inaptos</span><strong>{totais.inaptos}</strong>
          </div>
          <div className="counter counter-pendente">
            <span>Pendentes</span><strong>{totais.pendentes}</strong>
          </div>
        </div>
      </section>

      <label className="search-field">
        <span className="sr-only">Buscar veículo por placa ou modelo</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar por placa ou modelo..."
        />
      </label>

      <section aria-labelledby="garage-title">
        <div className="section-title-row">
          <h2 id="garage-title">Os seus veículos</h2>
          <span>{veiculosFiltrados.length} veículos encontrados</span>
        </div>
        <div className="vehicle-grid">
          {veiculosFiltrados.map((veiculo) => (
            <CardVeiculo key={veiculo.id} veiculo={veiculo} />
          ))}
        </div>
        {veiculosFiltrados.length === 0 && (
          <div className="empty-state">Nenhum veículo encontrado para a busca.</div>
        )}
      </section>
    </main>
  );
}