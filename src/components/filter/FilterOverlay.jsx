import styles from './FilterOverlay.module.css';

import Filter from './Filter'

function FilterOverlay({ isOpen, onClose, filters, setFilters }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <Filter filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

export default FilterOverlay