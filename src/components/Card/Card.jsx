import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ projeto }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/detalhes/${projeto.id}`)}
    >
      <img
        src={projeto.imagemPrincipal}
        alt={projeto.nome}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.nome}>{projeto.nome}</h3>
        <p className={styles.tipo}>{projeto.tipo}</p>
        <p className={styles.descricao}>{projeto.descricao}</p>
      </div>
    </div>
  );
}
