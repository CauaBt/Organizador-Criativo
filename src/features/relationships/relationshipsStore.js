export function salvarRelacoes(projetoId, relacoes) {

  const projetos = JSON.parse(localStorage.getItem("projetos")) || []

  const atualizados = projetos.map(p => {
    if (p.id === projetoId) {
      return {
        ...p,
        relacoes,
        atualizadoEm: new Date().toISOString()
      }
    }
    return p
  })

  localStorage.setItem("projetos", JSON.stringify(atualizados))
}
