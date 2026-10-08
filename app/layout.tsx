import "./globals.css";
import "./styles.css";
import Header from "@/components/Header";
import { VeiculosProvider } from "@/context/VeiculosContext";

export const metadata = {
  title: "Checklist Veicular",
  description: "Controle de frota simplificado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <VeiculosProvider>
          <Header />
          {children}
        </VeiculosProvider>
      </body>
    </html>
  );
}