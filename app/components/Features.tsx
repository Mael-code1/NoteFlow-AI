const features = [
    {
        title: "Gestión de ideas",
        description: "Crea y organiza tus ideas de forma sencilla.",
        image: "https://cdn.usegalileo.ai/sdxl10/6c8c3a8b-7cc3-4d20-b803-59b12bff169c.png",
    },
    {
        title: "Notas de eventos",
        description: "Lleva un registro de eventos y fechas importantes.",
        image: "https://cdn.usegalileo.ai/sdxl10/8681e45c-32f7-4863-a0cf-1d83d93c086a.png",
    },
    {
        title: "Mapas de relaciones",
        description: "Visualiza conexiones entre tus notas en un canvas interactivo.",
        image: "https://cdn.usegalileo.ai/sdxl10/5d17607e-1717-40f7-8dbc-a48f94bd197d.png",
    },
    {
        title: "Inteligencia Artificial",
        description: "Aprovecha NexoMind para encontrar patrones y organizar tus datos.",
        image: "https://cdn.usegalileo.ai/sdxl10/4afb16b7-25c3-4043-b0f8-8cb0bb353681.png",
    },
];

const Features = () => {
    return (
        <section>
            <h1 className="text-4xl font-bold mb-6">Características</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <div key={feature.title} className="flex flex-col gap-4">
                        <div
                            className="aspect-video bg-cover rounded-lg"
                            style={{ backgroundImage: `url(${feature.image})` }}
                        ></div>
                        <h2 className="text-lg font-medium">{feature.title}</h2>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
