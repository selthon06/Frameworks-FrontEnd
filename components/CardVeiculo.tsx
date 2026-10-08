import Link from "next/link";
import type { Veiculo } from "@/data/mockVeiculos";

interface CardVeiculoProps {
  veiculo: Veiculo;
}

const statusStyle = {
  Apto: "status-badge status-apto",
  Inapto: "status-badge status-inapto",
  Pendente: "status-badge status-pendente",
};

export default function CardVeiculo({ veiculo }: CardVeiculoProps) {
  const aprovados = veiculo.itens.filter((item) => item.aprovado).length;
  const total = veiculo.itens.length;

  return (
    <article className="vehicle-card">
      <div className="card-topline">
        <span className={statusStyle[veiculo.status]}>{veiculo.status}</span>
        <span className="last-review">{veiculo.ultimaRevisao}</span>
      </div>
      <div className="vehicle-heading">
        <div>
          <h2>{veiculo.modelo}</h2>
          <p className="plate">{veiculo.placa}</p>
        </div>
        <div className="driver-avatar" aria-label={`Motorista: ${veiculo.motorista}`}>
          {veiculo.motorista.split(" ").map((nome) => nome[0]).join("")}
        </div>
      </div>
      <p className="driver-name">Motorista: {veiculo.motorista}</p>
      <div className="card-progress" aria-label={`${aprovados} de ${total} itens aprovados`}>
        <div className="progress-label">
          <span>Progresso da revisão</span>
          <strong>{aprovados}/{total}</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${(aprovados / total) * 100}%` }} />
        </div>
      </div>
      <Link href={`/checklist/${veiculo.id}`} className="primary-button card-button">
        Iniciar Checklist
      </Link>
    </article>
  );
}