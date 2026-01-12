import { useCallback } from "react";
import styles from "./NavBar.module.css";

export default function NavBar({ tags, selectedTags, onFilterChange }) {
  const handleTagSelect = useCallback(
    (tag) => {
      if (tag === "Todos") {
        // Se clicar em Todos, limpa os outros e deixa apenas ele
        onFilterChange(["Todos"]);
        return;
      }

      let updatedTags;
      if (selectedTags.includes(tag)) {
        // Remove a tag se já estiver selecionada
        updatedTags = selectedTags.filter((t) => t !== tag);
      } else {
        // Adiciona a nova tag e remove o "Todos" se ele estiver lá
        updatedTags = [...selectedTags.filter((t) => t !== "Todos"), tag];
      }

      // Se não sobrar nada selecionado, volta para o "Todos"
      if (updatedTags.length === 0) {
        updatedTags = ["Todos"];
      }

      onFilterChange(updatedTags);
    },
    [selectedTags, onFilterChange]
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.scrollContainer}>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            // Mudamos para onClick para evitar seleção durante o drag
            onClick={() => handleTagSelect(tag)}
            className={`${styles.tagButton} ${
              selectedTags.includes(tag) ? styles.active : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </nav>
  );
}
