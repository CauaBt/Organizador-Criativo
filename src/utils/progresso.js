export function calcularProgresso(projeto) {

  let estetica = 0

  if (projeto.estetica?.cores?.length) estetica += 40
  if (projeto.estetica?.humor) estetica += 30
  if (projeto.estetica?.tags?.length) estetica += 30

  const personagens = projeto.personagens?.length || 0
  const cenas = projeto.capitulos?.length || 0
  const timeline = projeto.capitulos?.length || 0

  return {
    estetica,
    personagens,
    cenas,
    timeline
  }
}
