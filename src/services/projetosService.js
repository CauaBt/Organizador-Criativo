export function getProjetos() {
  return JSON.parse(localStorage.getItem("projetos")) || []
}

export function saveProjetos(projetos) {
  localStorage.setItem("projetos", JSON.stringify(projetos))
}
