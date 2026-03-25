export function calcularProgresso(projeto) {

  let estetica = 0

  if (projeto.estetica?.cores?.length) estetica += 20
  if (projeto.estetica?.humores?.length) estetica += 40
  if (projeto.estetica?.tags?.length) estetica += 30
  if (projeto.estetica?.musicas?.length) estetica += 10

  const personagens = projeto.personagens?.length || 0
  const capitulos = projeto.capitulos?.length || 0
  const relacoes = projeto.relacoes?.length || 0

  return {
    estetica,
    personagens,
    capitulos, 
    relacoes   
  }
}
