import { Button } from './button';

export function HeroSection() {
    return (
        <section
            className="flex flex-col gap-6 items-start justify-end px-10 py-12 bg-cover bg-center text-white rounded-xl"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://cdn.usegalileo.ai/sdxl10/4afb16b7-25c3-4043-b0f8-8cb0bb353681.png')",
            }}
        >
            <h1 className="text-4xl font-black">NoteFlow: Gestión inteligente de ideas</h1>
            <h2 className="text-lg font-light">
                Visualiza relaciones entre notas y eventos en un canvas interactivo.
                Organiza tus ideas fácilmente y conecta la información con NexoMind,
                nuestra herramienta de inteligencia artificial.
            </h2>
            <Button text='Empezar ahora' varible='primary' />
        </section>
    )
}
