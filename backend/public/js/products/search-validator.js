function validateSearch() {
    const searchInput = document.getElementById('search').value.trim();

    if (searchInput === '') {
      alert('Completa el campo de búsqueda');
      return false; // Evita que el formulario se envíe
    }

    return true; // Permite que el formulario se envíe
  }