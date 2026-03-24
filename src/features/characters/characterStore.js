export function salvarPersonagens(projetoId, personagens) {

  const projetos = JSON.parse(localStorage.getItem("projetos")) || []

  const atualizados = projetos.map(p => {
    if (p.id === projetoId) {
      return {
        ...p,
        personagens,
        atualizadoEm: new Date().toISOString()
      }
    }
    return p
  })

  localStorage.setItem("projetos", JSON.stringify(atualizados))
}
