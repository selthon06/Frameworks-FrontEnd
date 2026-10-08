"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  mockHistoricoInicial,
  mockVeiculosInicial,
  type HistoricoRevisao,
  type StatusVeiculo,
  type Veiculo,
} from "@/data/mockVeiculos";

interface VeiculosContextType {
  veiculos: Veiculo[];
  historico: HistoricoRevisao[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  atualizarItem: (veiculoId: string, itemId: string, aprovado: boolean) => void;
  salvarChecklist: (veiculoId: string, reprovados: string[]) => void;
}

const VeiculosContext = createContext<VeiculosContextType | undefined>(undefined);

export function VeiculosProvider({ children }: { children: ReactNode }) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(mockVeiculosInicial);
  const [historico, setHistorico] = useState<HistoricoRevisao[]>(mockHistoricoInicial);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("frota-check-dark-mode");
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((atual) => {
      const proximo = !atual;
      window.localStorage.setItem("frota-check-dark-mode", String(proximo));
      return proximo;
    });
  };

  const atualizarItem = (veiculoId: string, itemId: string, aprovado: boolean) => {
    setVeiculos((atualizados) =>
      atualizados.map((veiculo) => {
        if (veiculo.id !== veiculoId) return veiculo;

        const itens = veiculo.itens.map((item) =>
          item.id === itemId ? { ...item, aprovado } : item,
        );
        const status: StatusVeiculo = itens.every((item) => item.aprovado)
          ? "Apto"
          : "Inapto";

        return { ...veiculo, itens, status };
      }),
    );
  };

  const salvarChecklist = (veiculoId: string, reprovados: string[]) => {
    const veiculo = veiculos.find((item) => item.id === veiculoId);
    if (!veiculo) return;

    const status: StatusVeiculo = reprovados.length === 0 ? "Apto" : "Inapto";
    const agora = new Date();
    const horario = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dataHora = `${agora.toLocaleDateString("pt-BR")} ${horario}`;

    setVeiculos((atualizados) =>
      atualizados.map((item) =>
        item.id === veiculoId
          ? { ...item, status, ultimaRevisao: dataHora }
          : item,
      ),
    );

    setHistorico((atualizado) => [
      {
        id: `${Date.now()}-${veiculoId}`,
        placa: veiculo.placa,
        motorista: veiculo.motorista,
        horario,
        status,
        itensReprovados: reprovados,
      },
      ...atualizado,
    ]);
  };

  return (
    <VeiculosContext.Provider
      value={{ veiculos, historico, darkMode, toggleDarkMode, atualizarItem, salvarChecklist }}
    >
      <div className={darkMode ? "app-shell dark" : "app-shell"}>
        {children}
      </div>
    </VeiculosContext.Provider>
  );
}

export function useVeiculos() {
  const context = useContext(VeiculosContext);
  if (!context) throw new Error("useVeiculos deve ser usado dentro de VeiculosProvider");
  return context;
}