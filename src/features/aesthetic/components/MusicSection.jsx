import Input from "../../../components/ui/Input"
import Tag from "../../../components/ui/Tag"


export default function MusicSection({
    musicas,
    novaMusica,
    setNovaMusica,
    onAdd,
    onRemove
}) {
    return (
        <div className="aesthetic-card">
            <h3>Músicas</h3>

            <Input
                placeholder="Adicionar música"
                value={novaMusica}
                onChange={(e) => setNovaMusica(e.target.value)}
            />

            <button onClick={onAdd}>Adicionar</button>

            <div className="tags">
                {musicas.map((m, i) => (
                    <Tag
                         key={m + i}
                        onRemove={() => onRemove(i)}>
                            {m}
                    </Tag>

                ))}
            </div>
        </div>
    )
}
