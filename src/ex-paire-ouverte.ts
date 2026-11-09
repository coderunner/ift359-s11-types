import { Paire, paire, premier } from "./paire-ouverte.js";

const p1 = paire(1, 2);
const a1 = premier(p1);

const p2: Paire<number, number> = { _1: 1, _2: 2 };
const a2 = p2._2;
