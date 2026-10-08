"use client";

import { use, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ItemChecklist from "@/components/ItemChecklist";
import { useVeiculos } from "@/context/VeiculosContext";

const secoes = [
  {
    titulo: "Documentação",
    descricao: "Documentos obrigatórios do veículo",
    ids: ["cnh", "crlv"],
  },
  {
    titulo: "Segurança",
    descricao: "Verificações de segurança",
    ids: ["freios", "pneus", "farois", "cinto", "extintor"],
  },
  {
    titulo: "Operacional",
    descricao: "Verificações do funcionamento",
    ids: ["oleo", "agua", "combustivel", "buzina", "limpador"],
  },
];

export default function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { veiculos, atualizarItem, salvarChecklist } = useVeiculos();
  const [observacoes, setObservacoes] = useState("");
  const veiculo = veiculos.find((item) => item.id === id);

  if (!veiculo) {
    return <main className="page-content empty-state">Veículo não encontrado.</main>;
  }

  const itensAprovados = veiculo.itens.filter((item) => item.aprovado).length;
  const status = veiculo.status;
  const reprovados = veiculo.itens
    .filter((item) => !item.aprovado)
    .map((item) => item.nome);

  const handleFinalizar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    salvarChecklist(veiculo.id, reprovados);
    alert("Checklist salvo!");
    router.push("/relatorios");
  };

  return (
    <main className="page-content checklist-page">
      <button type="button" className="back-button" onClick={() => router.back()}>
        ← Voltar para a garagem
      </button>

      <section className="checklist-header">
        <div>
          <p className="eyebrow">Revisão diária</p>
          <h1>{veiculo.placa}</h1>
          <p>{veiculo.modelo} · {veiculo.motorista}</p>
        </div>
        <div className={`status-banner status-${status.toLowerCase()}`}>
          <span>{status}</span>
          <small>{itensAprovados} de {veiculo.itens.length} itens aprovados</small>
        </div>
      </section>

      <form onSubmit={handleFinalizar} className="checklist-form">
        {secoes.map((secao) => (
          <section className="check-section" key={secao.titulo}>
            <div className="section-heading-checklist">
              <span className="section-number">{secoes.indexOf(secao) + 1}</span>
              <div>
                <h2>{secao.titulo}</h2>
                <p>{secao.descricao}</p>
              </div>
            </div>
            <div className="check-grid">
              {secao.ids.map((itemId) => {
                const item = veiculo.itens.find((entry) => entry.id === itemId);
                if (!item) return null;

                return (
                  <ItemChecklist
                    key={item.id}
                    label={item.nome}
                    categoria={item.categoria}
                    checked={item.aprovado}
                    onChange={(aprovado) => atualizarItem(veiculo.id, item.id, aprovado)}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <div className="form-field">
          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            placeholder="Descreva eventuais problemas ou avarias encontradas..."
            rows={4}
          />
        </div>

        <div className="form-field">
          <label htmlFor="foto">Foto do hodômetro</label>
          <input id="foto" type="file" accept="image/*" />
          <small>Este campo é visual. A imagem não será enviada.</small>
        </div>

        <button type="submit" className="primary-button finalize-button">
          Finalizar Revisão
        </button>
      </form>
    </main>
  );
}