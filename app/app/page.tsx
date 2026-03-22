"use client";
import { useWalletConnection } from "@solana/react-hooks";

export default function Home() {
  const { connectors, connect, disconnect, wallet, status } =
    useWalletConnection();

  const address = wallet?.account.address.toString();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg1 text-foreground">
      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-6 pb-48 pt-32">
        <header className="space-y-3">
          <p className="text-sm uppercase font-bold tracking-[0.18em] text-muted">
            VALKIRIA PROTOCOL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Blockchain Event Logger
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Registro inmutable de eventos críticos para sistemas mecatrónicos y robótica. 
            Asegurando la integridad de los datos en la red de Solana.
          </p>
        </header>

        <section className="mt-12 rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-medium">Wallet Connection</h2>
          <p className="mb-6 text-sm text-muted">
            Conecta tu wallet para interactuar con el contrato inteligente de Valkiria.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {connectors.map((connector) => (
              <button
                key={connector.name}
                onClick={() => connect(connector)}
                className="flex items-center justify-between rounded-lg border border-border bg-bg2 px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="font-medium">{connector.name}</span>
                <span className="text-xs text-muted">
                  {status === "connected" && wallet?.connector.name === connector.name ? "Active" : "Tap to connect"}
                </span>
              </button>
            ))}
          </div>

          {status === "connected" && (
            <div className="mt-8 flex flex-col items-start gap-4 border-t border-border pt-6">
              <div className="rounded-md bg-muted px-3 py-2 text-xs font-mono break-all">
                {address}
              </div>
              <button
                onClick={() => disconnect()}
                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90"
              >
                Disconnect
              </button>
            </div>
          )}
        </section>

        <footer className="mt-auto pt-20 text-center text-sm text-muted">
          <p>© 2026 Valkiria Protocol - Solana LATAM Hackathon</p>
        </footer>
      </main>
    </div>
  );
}
