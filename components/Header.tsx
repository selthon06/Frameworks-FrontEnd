"use client";

import Link from "next/link";
import { useVeiculos } from "@/context/VeiculosContext";

export default function Header() {
  const { darkMode, toggleDarkMode } = useVeiculos();

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="FrotaCheck, página inicial">
        <span aria-hidden="true">🚛</span> FrotaCheck
      </Link>
      <nav className="header-nav" aria-label="Navegação principal">
        <Link href="/">Garagem</Link>
        <Link href="/relatorios">Relatórios</Link>
        <button
          type="button"
          className="theme-button"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button>
      </nav>
    </header>
  );
}