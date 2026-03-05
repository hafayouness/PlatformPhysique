import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Resource from "../models/Resource.js";
import NationalExam from "../models/Nationalexamen.js";

const run = async () => {
  try {
    console.log("\n🌱 Démarrage du seeding...");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    await sequelize.sync({ force: true });
    console.log("✅ Base de données réinitialisée\n");

    // ══════════════════════════════════════════════════════════════
    // 1. USERS
    // ══════════════════════════════════════════════════════════════
    const adminPass = await bcrypt.hash("admin123", 10);
    const studentPass = await bcrypt.hash("student123", 10);

    await User.bulkCreate([
      {
        name: "Admin Physique",
        email: "admin@physiquebac.ma",
        mot_de_passe: adminPass,
        role: "admin",
      },
      {
        name: "Ahmed Benali",
        email: "ahmed@physiquebac.ma",
        mot_de_passe: studentPass,
        role: "student",
      },
      {
        name: "Sara Idrissi",
        email: "sara@physiquebac.ma",
        mot_de_passe: studentPass,
        role: "student",
      },
      {
        name: "Youssef El Fassi",
        email: "youssef@physiquebac.ma",
        mot_de_passe: studentPass,
        role: "student",
      },
    ]);
    console.log("👤 [1/4] Users créés : 1 admin + 3 étudiants");

    // ══════════════════════════════════════════════════════════════
    // 2. COURS
    // ══════════════════════════════════════════════════════════════

    // ── 1BAC — Commun toutes filières ─────────────────────────────
    const c1bac = await Course.bulkCreate([
      {
        title: "Mécanique — Les mouvements",
        description: "Types de mouvements et caractéristiques cinématiques.",
        level: "1bac",
        chapter: "Chapitre 1",
        filiere: "ALL",
      },
      {
        title: "Mécanique — Les forces",
        description: "Poids, réaction, tension, frottement et leurs effets.",
        level: "1bac",
        chapter: "Chapitre 2",
        filiere: "ALL",
      },
      {
        title: "Mécanique — Équilibre des solides",
        description:
          "Conditions d'équilibre d'un solide soumis à plusieurs forces.",
        level: "1bac",
        chapter: "Chapitre 3",
        filiere: "ALL",
      },
      {
        title: "Électricité — Circuit courant continu",
        description:
          "Loi d'Ohm, Kirchhoff, résistances en série et en parallèle.",
        level: "1bac",
        chapter: "Chapitre 4",
        filiere: "ALL",
      },
      {
        title: "Électricité — Énergie électrique",
        description: "Puissance, énergie électrique, effet Joule et rendement.",
        level: "1bac",
        chapter: "Chapitre 5",
        filiere: "ALL",
      },
      {
        title: "Optique — Propagation de la lumière",
        description:
          "Propagation rectiligne, réflexion, réfraction, loi Snell-Descartes.",
        level: "1bac",
        chapter: "Chapitre 6",
        filiere: "ALL",
      },
      {
        title: "Chimie — La matière",
        description:
          "Corps purs, mélanges, transformations physiques et chimiques.",
        level: "1bac",
        chapter: "Chapitre 7",
        filiere: "ALL",
      },
      {
        title: "Chimie — Les solutions aqueuses",
        description:
          "Dissolution, concentration massique et molaire, dilution.",
        level: "1bac",
        chapter: "Chapitre 8",
        filiere: "ALL",
      },
    ]);

    // ── 2BAC Sciences Physiques (SP) ───────────────────────────────
    const cSP = await Course.bulkCreate([
      {
        title: "Mécanique — Dynamique du point matériel",
        description:
          "Les trois lois de Newton, principe fondamental de la dynamique.",
        level: "2bac",
        chapter: "Chapitre 1",
        filiere: "SP",
      },
      {
        title: "Mécanique — Travail et énergie",
        description:
          "Travail d'une force, théorème énergie cinétique, énergie mécanique.",
        level: "2bac",
        chapter: "Chapitre 2",
        filiere: "SP",
      },
      {
        title: "Mécanique — Chute libre et projectile",
        description:
          "Équations horaires, portée et hauteur maximale d'un projectile.",
        level: "2bac",
        chapter: "Chapitre 3",
        filiere: "SP",
      },
      {
        title: "Mécanique — Oscillations mécaniques libres",
        description:
          "Pendule simple, ressort-masse, équation différentielle, période propre.",
        level: "2bac",
        chapter: "Chapitre 4",
        filiere: "SP",
      },
      {
        title: "Mécanique — Oscillations forcées et résonance",
        description: "Oscillateur forcé, phénomène de résonance en amplitude.",
        level: "2bac",
        chapter: "Chapitre 5",
        filiere: "SP",
      },
      {
        title: "Électricité — Circuit RC : charge et décharge",
        description:
          "Charge et décharge d'un condensateur, constante de temps τ = RC.",
        level: "2bac",
        chapter: "Chapitre 6",
        filiere: "SP",
      },
      {
        title: "Électricité — Circuit RL",
        description:
          "Établissement et rupture du courant, énergie stockée dans une bobine.",
        level: "2bac",
        chapter: "Chapitre 7",
        filiere: "SP",
      },
      {
        title: "Électricité — Circuit RLC oscillations libres",
        description:
          "Oscillations électriques libres, charge et énergie dans un circuit RLC.",
        level: "2bac",
        chapter: "Chapitre 8",
        filiere: "SP",
      },
      {
        title: "Électricité — RLC en régime sinusoïdal forcé",
        description: "Impédance, résonance d'intensité, facteur de puissance.",
        level: "2bac",
        chapter: "Chapitre 9",
        filiere: "SP",
      },
      {
        title: "Optique — Diffraction et interférences",
        description:
          "Diffraction par une fente, interférences lumineuses, longueur d'onde.",
        level: "2bac",
        chapter: "Chapitre 10",
        filiere: "SP",
      },
      {
        title: "Chimie — Cinétique chimique",
        description:
          "Vitesse de réaction, facteurs : concentration, température, catalyseur.",
        level: "2bac",
        chapter: "Chapitre 11",
        filiere: "SP",
      },
      {
        title: "Chimie — Transformations acido-basiques",
        description:
          "Acides et bases Brønsted, pH, Ka et pKa, titrages acido-basiques.",
        level: "2bac",
        chapter: "Chapitre 12",
        filiere: "SP",
      },
      {
        title: "Chimie — Réactions d'oxydoréduction",
        description:
          "Oxydants, réducteurs, couples redox, piles électrochimiques.",
        level: "2bac",
        chapter: "Chapitre 13",
        filiere: "SP",
      },
      {
        title: "Chimie — Chimie organique",
        description:
          "Alcools, aldéhydes, cétones, acides carboxyliques, estérification.",
        level: "2bac",
        chapter: "Chapitre 14",
        filiere: "SP",
      },
    ]);

    // ── 2BAC SVT ───────────────────────────────────────────────────
    const cSVT = await Course.bulkCreate([
      {
        title: "Mécanique — Dynamique du point",
        description:
          "Lois de Newton appliquées aux contextes biologiques et environnementaux.",
        level: "2bac",
        chapter: "Chapitre 1",
        filiere: "SVT",
      },
      {
        title: "Mécanique — Travail et énergie",
        description: "Travail des forces et énergie mécanique en contexte SVT.",
        level: "2bac",
        chapter: "Chapitre 2",
        filiere: "SVT",
      },
      {
        title: "Électricité — Circuit RC",
        description:
          "Charge et décharge du condensateur, lien avec membranes cellulaires.",
        level: "2bac",
        chapter: "Chapitre 3",
        filiere: "SVT",
      },
      {
        title: "Chimie — Réactions acido-basiques",
        description:
          "pH sanguin, acides, bases, titrages — applications biologiques.",
        level: "2bac",
        chapter: "Chapitre 4",
        filiere: "SVT",
      },
      {
        title: "Chimie — Réactions d'oxydoréduction",
        description:
          "Oxydants, réducteurs, piles — lien avec la respiration cellulaire.",
        level: "2bac",
        chapter: "Chapitre 5",
        filiere: "SVT",
      },
      {
        title: "Chimie — Chimie organique",
        description:
          "Molécules organiques biologiques : alcools, acides, esters.",
        level: "2bac",
        chapter: "Chapitre 6",
        filiere: "SVT",
      },
    ]);

    // ── 2BAC Sciences Mathématiques A (SMA) ────────────────────────
    const cSMA = await Course.bulkCreate([
      {
        title: "Mécanique — Dynamique newtonienne",
        description:
          "Lois de Newton, application à des systèmes mécaniques complexes.",
        level: "2bac",
        chapter: "Chapitre 1",
        filiere: "SMA",
      },
      {
        title: "Mécanique — Oscillateurs mécaniques",
        description:
          "Pendule simple et ressort-masse, résolution des équations diff.",
        level: "2bac",
        chapter: "Chapitre 2",
        filiere: "SMA",
      },
      {
        title: "Mécanique — Chute libre et plan incliné",
        description:
          "Équations horaires, vecteur accélération et trajectoires.",
        level: "2bac",
        chapter: "Chapitre 3",
        filiere: "SMA",
      },
      {
        title: "Électricité — Circuit RC et RL",
        description:
          "Équations différentielles circuits RC et RL, régime transitoire.",
        level: "2bac",
        chapter: "Chapitre 4",
        filiere: "SMA",
      },
      {
        title: "Électricité — Circuit RLC",
        description: "Oscillations électriques, résonance et amortissement.",
        level: "2bac",
        chapter: "Chapitre 5",
        filiere: "SMA",
      },
      {
        title: "Chimie — Cinétique et acido-basique",
        description: "Vitesse de réaction, pH, Ka, titrages.",
        level: "2bac",
        chapter: "Chapitre 6",
        filiere: "SMA",
      },
      {
        title: "Chimie — Oxydoréduction et organique",
        description:
          "Piles, couples redox, réactions organiques fondamentales.",
        level: "2bac",
        chapter: "Chapitre 7",
        filiere: "SMA",
      },
    ]);

    // ── 2BAC Sciences Mathématiques B (SMB) ────────────────────────
    const cSMB = await Course.bulkCreate([
      {
        title: "Mécanique — Dynamique du point",
        description:
          "Lois de Newton, applications dans des systèmes mécaniques variés.",
        level: "2bac",
        chapter: "Chapitre 1",
        filiere: "SMB",
      },
      {
        title: "Mécanique — Travail, puissance et énergie",
        description:
          "Théorème énergie cinétique, conservation de l'énergie mécanique.",
        level: "2bac",
        chapter: "Chapitre 2",
        filiere: "SMB",
      },
      {
        title: "Mécanique — Oscillateurs mécaniques",
        description: "Pendule et ressort-masse, période et fréquence propre.",
        level: "2bac",
        chapter: "Chapitre 3",
        filiere: "SMB",
      },
      {
        title: "Électricité — Condensateur et bobine",
        description:
          "Charge/décharge RC, établissement courant RL, énergie stockée.",
        level: "2bac",
        chapter: "Chapitre 4",
        filiere: "SMB",
      },
      {
        title: "Électricité — Circuit RLC",
        description: "Oscillations électriques libres et amorties, résonance.",
        level: "2bac",
        chapter: "Chapitre 5",
        filiere: "SMB",
      },
      {
        title: "Chimie — Acido-basique et oxydoréduction",
        description:
          "pH, titrages acido-basiques et redox, piles électrochimiques.",
        level: "2bac",
        chapter: "Chapitre 6",
        filiere: "SMB",
      },
    ]);

    const totalCours =
      c1bac.length + cSP.length + cSVT.length + cSMA.length + cSMB.length;
    console.log(
      `📚 [2/4] Cours créés : 1BAC(${c1bac.length}) + SP(${cSP.length}) + SVT(${cSVT.length}) + SMA(${cSMA.length}) + SMB(${cSMB.length}) = ${totalCours} cours`,
    );

    // ══════════════════════════════════════════════════════════════
    // 3. RESSOURCES
    // ══════════════════════════════════════════════════════════════

    // Helper : ajouter ressources à un cours et retourner les créées
    const addResources = async (course, list) => {
      const result = [];
      for (let i = 0; i < list.length; i++) {
        const r = await Resource.create({
          ...list[i],
          courseId: course.id,
          order: i + 1,
        });
        result.push(r);
      }
      return result;
    };

    // ── 1BAC Ch1 : Mouvements ──────────────────────────────────────
    const [, , ex1_1b, ex2_1b] = await addResources(c1bac[0], [
      {
        title: "Cours PDF — Les mouvements",
        type: "pdf",
        fileUrl: "/uploads/pdf/1bac-ch1-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Les mouvements",
        type: "resume",
        fileUrl: "/uploads/resume/1bac-ch1-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Mouvement rectiligne uniforme",
        type: "exercise",
        fileUrl: "/uploads/exercise/1bac-ch1-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Mouvement uniformément varié",
        type: "exercise",
        fileUrl: "/uploads/exercise/1bac-ch1-ex2.pdf",
        isFree: true,
      },
      {
        title: "Exercice 3 — Graphes cinématiques",
        type: "exercise",
        fileUrl: "/uploads/exercise/1bac-ch1-ex3.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Les types de mouvements",
        type: "video",
        fileUrl: "/uploads/video/1bac-ch1-video.mp4",
        isFree: true,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Exercice 1 — MRU",
        type: "solution",
        fileUrl: "/uploads/solution/1bac-ch1-sol1.pdf",
        courseId: c1bac[0].id,
        linkedResourceId: ex1_1b.id,
        order: 7,
        isFree: true,
      },
      {
        title: "Correction Exercice 2 — MRUV",
        type: "solution",
        fileUrl: "/uploads/solution/1bac-ch1-sol2.pdf",
        courseId: c1bac[0].id,
        linkedResourceId: ex2_1b.id,
        order: 8,
        isFree: true,
      },
    ]);

    // ── 1BAC Ch4 : Circuit courant continu ────────────────────────
    const [, , ex1_1b4, ex2_1b4] = await addResources(c1bac[3], [
      {
        title: "Cours PDF — Circuit courant continu",
        type: "pdf",
        fileUrl: "/uploads/pdf/1bac-ch4-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Loi Ohm et Kirchhoff",
        type: "resume",
        fileUrl: "/uploads/resume/1bac-ch4-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Résistances en série",
        type: "exercise",
        fileUrl: "/uploads/exercise/1bac-ch4-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Résistances en parallèle",
        type: "exercise",
        fileUrl: "/uploads/exercise/1bac-ch4-ex2.pdf",
        isFree: true,
      },
      {
        title: "Vidéo — Lois de Kirchhoff expliquées",
        type: "video",
        fileUrl: "/uploads/video/1bac-ch4-video.mp4",
        isFree: true,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Exercice 1",
        type: "solution",
        fileUrl: "/uploads/solution/1bac-ch4-sol1.pdf",
        courseId: c1bac[3].id,
        linkedResourceId: ex1_1b4.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Exercice 2",
        type: "solution",
        fileUrl: "/uploads/solution/1bac-ch4-sol2.pdf",
        courseId: c1bac[3].id,
        linkedResourceId: ex2_1b4.id,
        order: 7,
        isFree: true,
      },
    ]);

    // ── SP Ch1 : Dynamique ─────────────────────────────────────────
    const [, , , ex1_sp1, ex2_sp1, ex3_sp1] = await addResources(cSP[0], [
      {
        title: "Cours PDF — Dynamique du point matériel",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch1-cours.pdf",
        isFree: true,
      },
      {
        title: "Vidéo — Explication des lois de Newton",
        type: "video",
        fileUrl: "/uploads/video/sp-ch1-video.mp4",
        isFree: true,
      },
      {
        title: "Résumé — Dynamique et lois de Newton",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch1-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Plan incliné sans frottement",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch1-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Chute libre verticale",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch1-ex2.pdf",
        isFree: true,
      },
      {
        title: "Exercice 3 — Système de deux masses reliées",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch1-ex3.pdf",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — Plan incliné",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch1-sol1.pdf",
        courseId: cSP[0].id,
        linkedResourceId: ex1_sp1.id,
        order: 7,
        isFree: true,
      },
      {
        title: "Correction vidéo Ex2 — Chute libre",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch1-sol2.mp4",
        courseId: cSP[0].id,
        linkedResourceId: ex2_sp1.id,
        order: 8,
        isFree: true,
      },
      {
        title: "Correction Ex3 — Deux masses",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch1-sol3.pdf",
        courseId: cSP[0].id,
        linkedResourceId: ex3_sp1.id,
        order: 9,
        isFree: false,
      },
    ]);

    // ── SP Ch4 : Oscillations mécaniques libres ───────────────────
    const [, , ex1_sp4, ex2_sp4, ex3_sp4] = await addResources(cSP[3], [
      {
        title: "Cours PDF — Oscillations mécaniques libres",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch4-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Pendule et ressort-masse",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch4-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Pendule simple, période propre",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch4-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Ressort-masse horizontal",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch4-ex2.pdf",
        isFree: true,
      },
      {
        title: "Exercice 3 — Énergie de l'oscillateur",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch4-ex3.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Pendule et ressort démo complète",
        type: "video",
        fileUrl: "/uploads/video/sp-ch4-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — Pendule",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch4-sol1.pdf",
        courseId: cSP[3].id,
        linkedResourceId: ex1_sp4.id,
        order: 7,
        isFree: true,
      },
      {
        title: "Correction Ex2 — Ressort-masse",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch4-sol2.pdf",
        courseId: cSP[3].id,
        linkedResourceId: ex2_sp4.id,
        order: 8,
        isFree: true,
      },
      {
        title: "Correction Ex3 — Énergie",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch4-sol3.pdf",
        courseId: cSP[3].id,
        linkedResourceId: ex3_sp4.id,
        order: 9,
        isFree: false,
      },
    ]);

    // ── SP Ch6 : Circuit RC ───────────────────────────────────────
    const [, , ex1_sp6, ex2_sp6, ex3_sp6] = await addResources(cSP[5], [
      {
        title: "Cours PDF — Circuit RC : charge et décharge",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch6-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Condensateur et τ = RC",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch6-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Charge d'un condensateur",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch6-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Décharge et constante de temps",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch6-ex2.pdf",
        isFree: true,
      },
      {
        title: "Exercice 3 — Énergie stockée dans le condo.",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch6-ex3.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Circuit RC explication complète",
        type: "video",
        fileUrl: "/uploads/video/sp-ch6-video.mp4",
        isFree: true,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — Charge RC",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch6-sol1.pdf",
        courseId: cSP[5].id,
        linkedResourceId: ex1_sp6.id,
        order: 7,
        isFree: true,
      },
      {
        title: "Correction Ex2 — Décharge RC",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch6-sol2.pdf",
        courseId: cSP[5].id,
        linkedResourceId: ex2_sp6.id,
        order: 8,
        isFree: true,
      },
      {
        title: "Correction vidéo Ex3 — Énergie",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch6-sol3.mp4",
        courseId: cSP[5].id,
        linkedResourceId: ex3_sp6.id,
        order: 9,
        isFree: false,
      },
    ]);

    // ── SP Ch8 : Circuit RLC ──────────────────────────────────────
    const [, , ex1_sp8, ex2_sp8] = await addResources(cSP[7], [
      {
        title: "Cours PDF — Oscillations électriques libres RLC",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch8-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — RLC et analogie mécanique",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch8-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Oscillations libres non amorties",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch8-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Oscillations amorties",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch8-ex2.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Circuit RLC, oscillations et amortissement",
        type: "video",
        fileUrl: "/uploads/video/sp-ch8-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — Oscillations libres",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch8-sol1.pdf",
        courseId: cSP[7].id,
        linkedResourceId: ex1_sp8.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2 — Amorties",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch8-sol2.pdf",
        courseId: cSP[7].id,
        linkedResourceId: ex2_sp8.id,
        order: 7,
        isFree: false,
      },
    ]);

    // ── SP Ch12 : Acido-basique ───────────────────────────────────
    const [, , ex1_sp12, ex2_sp12, ex3_sp12] = await addResources(cSP[11], [
      {
        title: "Cours PDF — Transformations acido-basiques",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch12-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — pH, Ka, pKa et titrages",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch12-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Calcul du pH d'une solution",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch12-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Titrage acide fort / base forte",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch12-ex2.pdf",
        isFree: true,
      },
      {
        title: "Exercice 3 — Acide faible et Ka",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch12-ex3.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Titrage acido-basique et courbe equiv.",
        type: "video",
        fileUrl: "/uploads/video/sp-ch12-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — pH",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch12-sol1.pdf",
        courseId: cSP[11].id,
        linkedResourceId: ex1_sp12.id,
        order: 7,
        isFree: true,
      },
      {
        title: "Correction Ex2 — Titrage",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch12-sol2.pdf",
        courseId: cSP[11].id,
        linkedResourceId: ex2_sp12.id,
        order: 8,
        isFree: true,
      },
      {
        title: "Correction vidéo Ex3 — Ka",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch12-sol3.mp4",
        courseId: cSP[11].id,
        linkedResourceId: ex3_sp12.id,
        order: 9,
        isFree: false,
      },
    ]);

    // ── SP Ch13 : Oxydoréduction ──────────────────────────────────
    const [, , ex1_sp13, ex2_sp13] = await addResources(cSP[12], [
      {
        title: "Cours PDF — Réactions d'oxydoréduction",
        type: "pdf",
        fileUrl: "/uploads/pdf/sp-ch13-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Oxydants, réducteurs et piles",
        type: "resume",
        fileUrl: "/uploads/resume/sp-ch13-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Identification redox",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch13-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Pile électrochimique",
        type: "exercise",
        fileUrl: "/uploads/exercise/sp-ch13-ex2.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Piles et couples redox",
        type: "video",
        fileUrl: "/uploads/video/sp-ch13-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1 — Redox",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch13-sol1.pdf",
        courseId: cSP[12].id,
        linkedResourceId: ex1_sp13.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2 — Pile",
        type: "solution",
        fileUrl: "/uploads/solution/sp-ch13-sol2.pdf",
        courseId: cSP[12].id,
        linkedResourceId: ex2_sp13.id,
        order: 7,
        isFree: false,
      },
    ]);

    // ── SVT Ch1 : Dynamique ────────────────────────────────────────
    const [, , ex1_svt1, ex2_svt1] = await addResources(cSVT[0], [
      {
        title: "Cours PDF — Dynamique du point (SVT)",
        type: "pdf",
        fileUrl: "/uploads/pdf/svt-ch1-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Newton appliqué aux SVT",
        type: "resume",
        fileUrl: "/uploads/resume/svt-ch1-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Mouvement d'un organe",
        type: "exercise",
        fileUrl: "/uploads/exercise/svt-ch1-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Plan incliné biologique",
        type: "exercise",
        fileUrl: "/uploads/exercise/svt-ch1-ex2.pdf",
        isFree: true,
      },
      {
        title: "Vidéo — Dynamique en contexte SVT",
        type: "video",
        fileUrl: "/uploads/video/svt-ch1-video.mp4",
        isFree: true,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1",
        type: "solution",
        fileUrl: "/uploads/solution/svt-ch1-sol1.pdf",
        courseId: cSVT[0].id,
        linkedResourceId: ex1_svt1.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2",
        type: "solution",
        fileUrl: "/uploads/solution/svt-ch1-sol2.pdf",
        courseId: cSVT[0].id,
        linkedResourceId: ex2_svt1.id,
        order: 7,
        isFree: true,
      },
    ]);

    // ── SVT Ch4 : Acido-basique ────────────────────────────────────
    const [, , ex1_svt4, ex2_svt4] = await addResources(cSVT[3], [
      {
        title: "Cours PDF — Réactions acido-basiques (SVT)",
        type: "pdf",
        fileUrl: "/uploads/pdf/svt-ch4-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — pH sanguin et solutions tampons",
        type: "resume",
        fileUrl: "/uploads/resume/svt-ch4-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — pH d'une solution biologique",
        type: "exercise",
        fileUrl: "/uploads/exercise/svt-ch4-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Titrage acido-basique SVT",
        type: "exercise",
        fileUrl: "/uploads/exercise/svt-ch4-ex2.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — pH sanguin et tampons expliqués",
        type: "video",
        fileUrl: "/uploads/video/svt-ch4-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1",
        type: "solution",
        fileUrl: "/uploads/solution/svt-ch4-sol1.pdf",
        courseId: cSVT[3].id,
        linkedResourceId: ex1_svt4.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2",
        type: "solution",
        fileUrl: "/uploads/solution/svt-ch4-sol2.pdf",
        courseId: cSVT[3].id,
        linkedResourceId: ex2_svt4.id,
        order: 7,
        isFree: false,
      },
    ]);

    // ── SMA Ch1 : Dynamique ────────────────────────────────────────
    const [, , ex1_sma1, ex2_sma1] = await addResources(cSMA[0], [
      {
        title: "Cours PDF — Dynamique newtonienne (SMA)",
        type: "pdf",
        fileUrl: "/uploads/pdf/sma-ch1-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Lois de Newton SMA",
        type: "resume",
        fileUrl: "/uploads/resume/sma-ch1-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Système mécanique complexe",
        type: "exercise",
        fileUrl: "/uploads/exercise/sma-ch1-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Application forces multiples",
        type: "exercise",
        fileUrl: "/uploads/exercise/sma-ch1-ex2.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Dynamique SMA approfondie",
        type: "video",
        fileUrl: "/uploads/video/sma-ch1-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1",
        type: "solution",
        fileUrl: "/uploads/solution/sma-ch1-sol1.pdf",
        courseId: cSMA[0].id,
        linkedResourceId: ex1_sma1.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2",
        type: "solution",
        fileUrl: "/uploads/solution/sma-ch1-sol2.pdf",
        courseId: cSMA[0].id,
        linkedResourceId: ex2_sma1.id,
        order: 7,
        isFree: false,
      },
    ]);

    // ── SMB Ch1 : Dynamique ────────────────────────────────────────
    const [, , ex1_smb1, ex2_smb1] = await addResources(cSMB[0], [
      {
        title: "Cours PDF — Dynamique du point (SMB)",
        type: "pdf",
        fileUrl: "/uploads/pdf/smb-ch1-cours.pdf",
        isFree: true,
      },
      {
        title: "Résumé — Newton SMB",
        type: "resume",
        fileUrl: "/uploads/resume/smb-ch1-resume.pdf",
        isFree: true,
      },
      {
        title: "Exercice 1 — Plan incliné",
        type: "exercise",
        fileUrl: "/uploads/exercise/smb-ch1-ex1.pdf",
        isFree: true,
      },
      {
        title: "Exercice 2 — Système avec poulie",
        type: "exercise",
        fileUrl: "/uploads/exercise/smb-ch1-ex2.pdf",
        isFree: false,
      },
      {
        title: "Vidéo — Dynamique SMB",
        type: "video",
        fileUrl: "/uploads/video/smb-ch1-video.mp4",
        isFree: false,
      },
    ]);
    await Resource.bulkCreate([
      {
        title: "Correction Ex1",
        type: "solution",
        fileUrl: "/uploads/solution/smb-ch1-sol1.pdf",
        courseId: cSMB[0].id,
        linkedResourceId: ex1_smb1.id,
        order: 6,
        isFree: true,
      },
      {
        title: "Correction Ex2",
        type: "solution",
        fileUrl: "/uploads/solution/smb-ch1-sol2.pdf",
        courseId: cSMB[0].id,
        linkedResourceId: ex2_smb1.id,
        order: 7,
        isFree: false,
      },
    ]);

    console.log(
      "📎 [3/4] Ressources créées : cours PDF, résumés, vidéos, exercices + corrections",
    );

    // ══════════════════════════════════════════════════════════════
    // 4. EXAMENS NATIONAUX (2015 → 2024)
    // ══════════════════════════════════════════════════════════════
    const sub = (f, y, r = false) =>
      `/uploads/subjectPdf/exam-${f.toLowerCase()}-${y}${r ? "-rattrapage" : ""}.pdf`;
    const sol = (f, y, r = false) =>
      `/uploads/solutionPdf/sol-${f.toLowerCase()}-${y}${r ? "-rattrapage" : ""}.pdf`;
    const vid = (f, y) =>
      `/uploads/solutionVideo/vid-${f.toLowerCase()}-${y}.mp4`;

    const exams = [];

    for (const filiere of ["SP", "SVT", "SMA", "SMB"]) {
      for (let year = 2015; year <= 2024; year++) {
        const isFree = year >= 2022;
        const hasVideo = year >= 2020;

        // Session normale
        exams.push({
          title: `Examen National ${year} — ${filiere}`,
          year,
          filiere,
          session: "normale",
          subjectPdfUrl: sub(filiere, year),
          solutionPdfUrl: sol(filiere, year),
          solutionVideoUrl: hasVideo ? vid(filiere, year) : null,
          isFree,
        });

        // Session rattrapage (sauf 2024 pas encore publié)
        if (year < 2024) {
          exams.push({
            title: `Rattrapage ${year} — ${filiere}`,
            year,
            filiere,
            session: "rattrapage",
            subjectPdfUrl: sub(filiere, year, true),
            solutionPdfUrl: year >= 2018 ? sol(filiere, year, true) : null,
            solutionVideoUrl: null,
            isFree,
          });
        }
      }
    }

    await NationalExam.bulkCreate(exams);
    console.log(
      `📋 [4/4] Examens nationaux créés : ${exams.length} examens (SP + SVT + SMA + SMB — 2015 à 2024)`,
    );

    // ══════════════════════════════════════════════════════════════
    // FIN
    // ══════════════════════════════════════════════════════════════
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 Seeding terminé avec succès !\n");
    console.log("  👤 Admin    →  admin@physiquebac.ma   /  admin123");
    console.log("  👤 Étudiant →  ahmed@physiquebac.ma   /  student123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Erreur pendant le seeding :", err.message);
    console.error(err);
    process.exit(1);
  }
};

run();
