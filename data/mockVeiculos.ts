export type StatusVeiculo = "Apto" | "Inapto" | "Pendente";

export interface ItemChecklist {
  id: string;
  nome: string;
  categoria: "Documentação" | "Segurança" | "Operacional";
  aprovado: boolean;
}

export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  motorista: string;
  status: StatusVeiculo;
  ultimaRevisao: string;
  itens: ItemChecklist[];
}

export interface HistoricoRevisao {
  id: string;
  placa: string;
  motorista: string;
  horario: string;
  status: "Apto" | "Inapto";
  itensReprovados: string[];
}

const itensBase: ItemChecklist[] = [
  { id: "cnh", nome: "CNH em dia", categoria: "Documentação", aprovado: true },
  { id: "crlv", nome: "CRLV no veículo", categoria: "Documentação", aprovado: true },
  { id: "freios", nome: "Freios", categoria: "Segurança", aprovado: true },
  { id: "pneus", nome: "Pneus", categoria: "Segurança", aprovado: true },
  { id: "farois", nome: "Faróis", categoria: "Segurança", aprovado: true },
  { id: "cinto", nome: "Cinto de segurança", categoria: "Segurança", aprovado: true },
  { id: "extintor", nome: "Extintor", categoria: "Segurança", aprovado: true },
  { id: "oleo", nome: "Nível de óleo", categoria: "Operacional", aprovado: true },
  { id: "agua", nome: "Nível de água", categoria: "Operacional", aprovado: true },
  { id: "combustivel", nome: "Combustível", categoria: "Operacional", aprovado: true },
  { id: "buzina", nome: "Buzina", categoria: "Operacional", aprovado: true },
  { id: "limpador", nome: "Limpador do para-brisa", categoria: "Operacional", aprovado: true },
];

const cloneItens = () => itensBase.map((item) => ({ ...item }));

export const mockVeiculosInicial: Veiculo[] = [
  { id: "1", placa: "ABC-1234", modelo: "Volvo FH 540", motorista: "Carlos Silva", status: "Apto", ultimaRevisao: "06/10/2026 08:30", itens: cloneItens() },
  { id: "2", placa: "DEF-5678", modelo: "Scania R450", motorista: "Ana Souza", status: "Inapto", ultimaRevisao: "07/10/2026 07:15", itens: cloneItens().map((item, index) => index === 3 || index === 2 ? { ...item, aprovado: false } : item) },
  { id: "3", placa: "GHI-9012", modelo: "MB Actros", motorista: "João Pereira", status: "Pendente", ultimaRevisao: "05/10/2026 18:00", itens: cloneItens() },
  { id: "4", placa: "JKL-3456", modelo: "VW Constellation", motorista: "Marcos Lima", status: "Apto", ultimaRevisao: "07/10/2026 06:45", itens: cloneItens() },
  { id: "5", placa: "MNO-7890", modelo: "Iveco Hi-Way", motorista: "Fernanda Costa", status: "Pendente", ultimaRevisao: "04/10/2026 12:20", itens: cloneItens() },
  { id: "6", placa: "PQR-1122", modelo: "DAF XF", motorista: "Roberto Alves", status: "Apto", ultimaRevisao: "07/10/2026 09:10", itens: cloneItens() },
];

export const mockHistoricoInicial: HistoricoRevisao[] = [
  { id: "h1", placa: "DEF-5678", motorista: "Ana Souza", horario: "07:15", status: "Inapto", itensReprovados: ["Pneus", "Freios"] },
  { id: "h2", placa: "ABC-1234", motorista: "Carlos Silva", horario: "08:30", status: "Apto", itensReprovados: [] },
  { id: "h3", placa: "JKL-3456", motorista: "Marcos Lima", horario: "06:45", status: "Apto", itensReprovados: [] },
];