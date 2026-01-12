import { useParams, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE || "";
import { useState, useEffect } from "react";
import styles from "./Detalhes.module.css";
import {
  FaInstagram,
  FaGlobe,
  FaLinkedin,
  FaYoutube,
  FaChevronLeft,
} from "react-icons/fa";
import Header from "../components/Header/Header";

export default function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchProjeto = async () => {
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/projects/${id}`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const json = await res.json();
        const img = json.imagemPrincipal;
        json.imagemPrincipal = img && img.startsWith("/img") && API_BASE ? `${API_BASE}${img}` : img;
        if (mounted) setProjeto(json);
      } catch (err) {
        console.error("Erro ao carregar projeto da API:", err.message);
        if (mounted) setError("API indisponível. Ative o backend para ver os detalhes deste projeto.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProjeto();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!projeto) return <p>Projeto não encontrado.</p>;

  const { nome, descricao, coordenadores, imagemPrincipal, links } = projeto;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <button className={styles.voltar} onClick={() => navigate(-1)}>
          <FaChevronLeft size={15} /> Voltar
        </button>

        <div className={styles.banner}>
          <img src={imagemPrincipal} alt={nome} className={styles.image} />
        </div>

        <h1 className={styles.titulo}>{nome}</h1>

        <section className={styles.descricao}>
          <h2>Descrição</h2>
          <p>{descricao}</p>
        </section>

        {coordenadores && coordenadores.length > 0 && (
          <section className={styles.coordenadorcon}>
            <h2>Coordenadores</h2>
            <section className={styles.coordenador}>
              {coordenadores.map((c, index) => (
                <div className={styles.perfil} key={index}>
                  {c.foto ? (
                    <img src={c.foto} alt={c.nome} className={styles.avatar} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <span>👤</span>
                    </div>
                  )}
                  <div>
                    <p>
                      <b>{c.categoria}</b>
                    </p>
                    <p>{c.nome}</p>
                  </div>
                </div>
              ))}
            </section>
          </section>
        )}

        {links && Object.keys(links).length > 0 && (
          <section className={styles.contatos}>
            <h2>Contatos</h2>
            <div className={styles.botoes}>
              {links.instagram && (
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.instagram}
                >
                  <FaInstagram /> Instagram
                </a>
              )}
              {links.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.website}
                >
                  <FaGlobe /> Website
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedin}
                >
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {links.youtube && (
                <a
                  href={links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.youtube}
                >
                  <FaYoutube /> YouTube
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
