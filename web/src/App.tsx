import "./styles/main.css";
import logo from "./assets/logo.svg";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Input from "./components/Form/Input";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3033/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div
      className="
        max-w-[1344px]
        mx-auto
        flex
        flex-col
        items-center
        my-20
      "
    >
      <img src={logo} alt="Logo NLW E-Sports" />
      <h1 className=" font-black text-white text-6xl m-20">
        Seu
        <span className="bg-gradient bg-clip-text text-transparent">
          {" "}
          {`${" duo "}`}
        </span>
        esta aqui!!
      </h1>

      {/* Carrossel dos jogos */}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-backgroundColorModal py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/30">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do jogo?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input id="discord" placeholder="Usuario#00000" type="text" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded bg-zinc-900">D</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">T</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900">S</button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
