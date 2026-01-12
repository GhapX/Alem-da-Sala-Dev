import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import CardCarousel from "../components/CardCarousel/CardCarousel";
import styles from "./Home.module.css";

const API_BASE = import.meta.env.VITE_API_BASE || "";
// não usar import estático de data.json — buscar da API em runtime

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Todos"]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tags = [
    "Todos",
    "Ciência da Computação",
    "Engenharia de Software",
    "Engenharia de Produção",
    "Engenharia Mecânica",
    "Engenharia Civil",
    "Cultural",
    "Evento",
    "Empresa Júnior",
    "Extensão",
    "Centro Acadêmico",
  ];

  const handleFilterChange = (updatedTags) => {
    setSelectedTags(updatedTags);
  };

  useEffect(() => {
    let filtered = allData;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const activeFilters = selectedTags.filter((t) => t !== "Todos");

    if (activeFilters.length > 0) {
      filtered = filtered.filter((p) =>
        activeFilters.every((tag) => {
          const cursos = Array.isArray(p.curso) ? p.curso : [p.curso];
          const tagsAtividade = Array.isArray(p.tags) ? p.tags : [];

          const campos = [p.tipo, ...cursos, ...tagsAtividade];

          return campos.some(
            (campo) =>
              typeof campo === "string" &&
              campo.toLowerCase().includes(tag.toLowerCase())
          );
        })
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedTags, allData]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const json = await res.json();
        const mapped = json.map((p) => ({
          ...p,
          imagemPrincipal:
            p.imagemPrincipal && p.imagemPrincipal.startsWith("/img") && API_BASE
              ? `${API_BASE}${p.imagemPrincipal}`
              : p.imagemPrincipal,
        }));
        if (mounted) setAllData(mapped);
      } catch (err) {
        console.error("Erro ao carregar projetos da API:", err.message);
        if (mounted) setError("API indisponível. Ative o backend para carregar os projetos.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, []);

  const categorias = [...new Set(filteredData.map((p) => p.tipo))];

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NavBar
        tags={tags}
        selectedTags={selectedTags}
        onFilterChange={handleFilterChange}
      />

      <main className={styles.home}>
        {loading && <p>Carregando projetos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && categorias.map((cat) => {
          const projetosCategoria = filteredData.filter((p) => p.tipo === cat);
          return (
            <CardCarousel key={cat} titulo={cat} projetos={projetosCategoria} />
          );
        })}
      </main>
    </>
  );
}
