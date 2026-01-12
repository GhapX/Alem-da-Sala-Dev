import { FaSearch } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header({ searchTerm, setSearchTerm }) {
  const location = useLocation();

  const isDetalhesPage = location.pathname.startsWith("/detalhes");

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" aria-label="Voltar para a página inicial">
          <img src={logo} alt="Logo Além da Sala" className={styles.logo} />
        </Link>
      </div>

      {!isDetalhesPage && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar projeto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      )}
    </header>
  );
}
