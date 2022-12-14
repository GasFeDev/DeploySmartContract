import Head from "next/head";
import HomePage from "../src/components/HomePage";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import logo from "../assets/logo.svg";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Set Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoPrincipal}>
          <Image src={logo} alt="Logo" width="350px" />
        </div>

        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className={styles.bottomwallet}
                        style={{position:"relative", alignItems: "center", width: 160, borderColor:"#fdc716"}}
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className={styles.bottomwalletwrong}
                        style={{ position:"relative", alignItems: "center", width: 160, borderColor:"red"}}
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 20 }}>
                      <button
                        className={styles.bottomwallet}
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center"}}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 26,
                              height: 26,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 24, height: 24 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button
                        onClick={openAccountModal}
                        type="button"
                        className={styles.bottomwallet}
                        style={{position:"relative", alignItems: "center", width: 160, borderColor:"#fdc716"}}
                        
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>

        <HomePage />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          View 
        </a>
      </footer> */}
    </div>
  );
}
